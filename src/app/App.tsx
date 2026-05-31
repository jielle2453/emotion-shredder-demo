import { useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import Home from "../imports/首頁/首頁";
import Garden from "../imports/花圃/花圃";
import Calendar from "../imports/日歷/日歷.long-grid";
import Collection from "../imports/收藏/收藏";
import Settings from "../imports/設定/設定";
import AuthScreen from "./AuthScreen";
import AiAnalysis from "../imports/Ai情緒分析-1/Ai情緒分析";
import Daily from "../imports/每日/每日";
import FlowerDetail from "../imports/花詳細/花詳細";
import { analyzeEmotion, type EmotionRecord } from "../utils/backend";
import { clampFlowerIndex } from "../utils/flowers";
import { keywordsToText, normalizeKeywords, pickRandomKeywords } from "../utils/keywords";
import { deleteAllEmotionRecords, getEmotionRecords, localDateKey, saveEmotionRecord } from "../utils/records";
import { supabase } from "../utils/supabaseClient";
import type { AppLanguage } from "../utils/i18n";
import shredderVideo from "../imports/_____.mp4";
import backgroundMusic from "../assets/audio/First_Light_on_the_Leaves.mp3";
import paperCrunch from "../assets/audio/paper_Crunch_1.mp3";

type View =
  | "garden"
  | "calendar"
  | "home"
  | "collection"
  | "settings"
  | "ai"
  | "daily"
  | "flowerDetail";

const TABS: View[] = ["garden", "calendar", "home", "collection", "settings"];
const DEMO_PHONE_WIDTH = 402;
const DEMO_PHONE_HEIGHT = 874;

type DemoFrame = {
  height: number;
  offsetX: number;
  offsetY: number;
  scale: number;
  width: number;
};

const FALLBACK_ANALYSIS_ZH = {
  keyword: "釋放",
  keywords: ["釋放"],
  emotionLabel: "釋放",
  summary: "已經幫你把壞情緒通通碎掉了！",
  flowerIndex: -1,
};

const FALLBACK_ANALYSIS_EN = {
  keyword: "release",
  keywords: ["release"],
  emotionLabel: "Release",
  summary: "I have helped you shred that heavy feeling.",
  flowerIndex: -1,
};

function isMostlyEnglish(text: string) {
  const latinCount = (text.match(/[A-Za-z]/g) ?? []).length;
  const cjkCount = (text.match(/[\u3400-\u9fff]/g) ?? []).length;
  return latinCount > cjkCount;
}

function fallbackAnalysisForText(text: string) {
  return isMostlyEnglish(text) ? FALLBACK_ANALYSIS_EN : FALLBACK_ANALYSIS_ZH;
}

export default function App() {
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedBackgroundAudioRef = useRef(false);
  const lastSproutNotificationRef = useRef("");
  const [demoFrame, setDemoFrame] = useState<DemoFrame>({
    height: DEMO_PHONE_HEIGHT,
    offsetX: 0,
    offsetY: 0,
    scale: 1,
    width: DEMO_PHONE_WIDTH,
  });
  const [view, setView] = useState<View>("home");
  const [history, setHistory] = useState<View[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [analysisData, setAnalysisData] = useState<EmotionRecord | { flowerIndex: number } | null>(null);
  const [activeDate, setActiveDate] = useState<string>("");
  const [session, setSession] = useState<Session | null>(null);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [language, setLanguage] = useState<AppLanguage>("zh");

  useEffect(() => {
    const updateDemoFrame = () => {
      const viewport = window.visualViewport;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      const isSmallViewport = width < 720;

      if (isSmallViewport) {
        const scale = Math.max(width / DEMO_PHONE_WIDTH, height / DEMO_PHONE_HEIGHT);
        const scaledWidth = DEMO_PHONE_WIDTH * scale;
        const scaledHeight = DEMO_PHONE_HEIGHT * scale;

        setDemoFrame({
          height,
          offsetX: (width - scaledWidth) / 2,
          offsetY: (height - scaledHeight) / 2,
          scale: Number(scale.toFixed(4)),
          width,
        });
        return;
      }

      const margin = 32;
      const scale = Math.min(
        1.04,
        Math.max(
          0.48,
          Math.min(
            Math.max(1, width - margin * 2) / DEMO_PHONE_WIDTH,
            Math.max(1, height - margin * 2) / DEMO_PHONE_HEIGHT,
          ),
        ),
      );

      setDemoFrame({
        height: DEMO_PHONE_HEIGHT * scale,
        offsetX: 0,
        offsetY: 0,
        scale: Number(scale.toFixed(4)),
        width: DEMO_PHONE_WIDTH * scale,
      });
    };

    updateDemoFrame();
    window.addEventListener("resize", updateDemoFrame);
    window.visualViewport?.addEventListener("resize", updateDemoFrame);
    window.visualViewport?.addEventListener("scroll", updateDemoFrame);

    return () => {
      window.removeEventListener("resize", updateDemoFrame);
      window.visualViewport?.removeEventListener("resize", updateDemoFrame);
      window.visualViewport?.removeEventListener("scroll", updateDemoFrame);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      setSession(data.session);
      setIsAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsAuthLoading(false);
      if (nextSession) setIsGuestMode(false);
      if (!nextSession) {
        setView("home");
        setHistory([]);
        setAnalysisData(null);
        setActiveDate("");
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAuthLoading) return undefined;

    const audio = backgroundAudioRef.current;
    if (!audio) return undefined;

    audio.volume = 0.0528;
    audio.loop = true;

    if (!isSoundEnabled) {
      audio.pause();
      return undefined;
    }

    const removeStartListeners = () => {
      window.removeEventListener("pointerdown", startBackgroundMusic);
      window.removeEventListener("keydown", startBackgroundMusic);
    };

    const startBackgroundMusic = () => {
      if (!isSoundEnabled || (hasStartedBackgroundAudioRef.current && !audio.paused)) return;

      audio.play()
        .then(() => {
          hasStartedBackgroundAudioRef.current = true;
          removeStartListeners();
        })
        .catch(() => {
          hasStartedBackgroundAudioRef.current = false;
        });
    };

    window.addEventListener("pointerdown", startBackgroundMusic);
    window.addEventListener("keydown", startBackgroundMusic);
    if (hasStartedBackgroundAudioRef.current) startBackgroundMusic();

    return removeStartListeners;
  }, [isAuthLoading, isSoundEnabled]);

  useEffect(() => {
    if (!isNotificationEnabled || !session || isAuthLoading || typeof Notification === "undefined" || Notification.permission !== "granted") {
      return undefined;
    }

    const notifyBloomedSprout = async () => {
      try {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        const yesterdayKey = localDateKey(date.toISOString());
        const notificationKey = `${session.user.id}-${yesterdayKey}`;

        if (lastSproutNotificationRef.current === notificationKey) return;

        const records = await getEmotionRecords();
        const hasYesterdaySprout = records.some((record) => localDateKey(record.date) === yesterdayKey);
        if (!hasYesterdaySprout) return;

        lastSproutNotificationRef.current = notificationKey;
        new Notification(language === "en" ? "Your sprout has bloomed" : "小綠芽長成花了", {
          body: language === "en"
            ? "Yesterday's little sprout is now a flower. Open the garden to see it."
            : "昨天的小綠芽已經開成花了，去花圃看看吧。",
        });
      } catch (err) {
        console.warn("Failed to send sprout notification:", err);
      }
    };

    void notifyBloomedSprout();

    const nextMorning = new Date();
    nextMorning.setDate(nextMorning.getDate() + 1);
    nextMorning.setHours(9, 0, 0, 0);
    const timeout = window.setTimeout(() => {
      void notifyBloomedSprout();
    }, Math.max(1000, nextMorning.getTime() - Date.now()));

    return () => window.clearTimeout(timeout);
  }, [isAuthLoading, isNotificationEnabled, language, session]);

  const handleNotificationEnabledChange = async (enabled: boolean) => {
    if (!enabled) {
      setIsNotificationEnabled(false);
      return;
    }

    if (typeof Notification === "undefined") {
      setIsNotificationEnabled(false);
      return;
    }

    const permission = Notification.permission === "default"
      ? await Notification.requestPermission()
      : Notification.permission;

    setIsNotificationEnabled(permission === "granted");
  };

  const navigateTo = (newView: View) => {
    if (TABS.includes(newView)) {
      setHistory([]); // clear history when switching main tabs
    } else {
      setHistory((prev) => [...prev, view]); // push current view to history
    }
    setView(newView);
  };

  const goBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const prevView = newHistory.pop()!;
      setHistory(newHistory);
      setView(prevView);
    } else {
      setView("home");
    }
  };

  const handleShred = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;
    const fallbackAnalysis = fallbackAnalysisForText(trimmedText);
    
    setIsVideoPlaying(true);
    const recordId = crypto.randomUUID();
    const pendingRecord: EmotionRecord = {
      id: recordId,
      text: trimmedText,
      date: new Date().toISOString(),
      keyword: language === "en" ? "Analyzing" : "分析中",
      keywords: [language === "en" ? "Analyzing" : "分析中"],
      emotionLabel: language === "en" ? "Analyzing" : "分析中",
      summary: language === "en" ? "Sorting this feeling..." : "正在替你整理情緒...",
      flowerIndex: -1,
    };

    setAnalysisData(pendingRecord);

    if (!session) {
      setAnalysisData({
        ...pendingRecord,
        ...fallbackAnalysis,
      });
      return;
    }

    try {
      const [existingRecords, currentAnalysis] = await Promise.all([
        getEmotionRecords(),
        analyzeEmotion(trimmedText),
      ]);
      const recordDateKey = localDateKey(pendingRecord.date);
      const sameDayRecords = existingRecords
        .filter((record) => localDateKey(record.date) === recordDateKey)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const sameDayTexts = sameDayRecords.map((record) => record.text);
      const combinedText = [...sameDayTexts, trimmedText].join("\n");
      const flowerAnalysis = sameDayRecords.length > 0
        ? await analyzeEmotion(combinedText)
        : currentAnalysis;
      const flowerIndex = clampFlowerIndex(flowerAnalysis.flowerIndex);
      const previousKeywords = sameDayRecords.flatMap((record) =>
        normalizeKeywords(record, record.keyword ? [record.keyword] : []),
      );
      const analysisKeywords = normalizeKeywords(currentAnalysis, fallbackAnalysis.keywords);
      const keywords = pickRandomKeywords([...previousKeywords, ...analysisKeywords]);
      const record: EmotionRecord = {
        ...pendingRecord,
        keyword: keywordsToText(keywords) || fallbackAnalysis.keyword,
        keywords,
        emotionLabel: currentAnalysis.emotionLabel || fallbackAnalysis.emotionLabel,
        summary: currentAnalysis.summary || fallbackAnalysis.summary,
        flowerIndex,
      };

      setAnalysisData(record);
      if (session) await saveEmotionRecord(record);
    } catch (err) {
      console.warn("Backend analysis failed; using fallback result:", err);
      const record: EmotionRecord = {
        ...pendingRecord,
        ...fallbackAnalysis,
        error: err instanceof Error ? err.message : "Unknown backend error",
      };

      setAnalysisData(record);
      if (session) {
        saveEmotionRecord(record).catch((saveErr) => {
          console.warn("Failed to save fallback record:", saveErr);
        });
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleDeleteAllRecords = async () => {
    await deleteAllEmotionRecords();
    setAnalysisData(null);
    setActiveDate("");
  };

  const userMetadata = session?.user.user_metadata as Record<string, unknown> | undefined;
  const avatarUrl = typeof userMetadata?.avatar_url === "string" ? userMetadata.avatar_url : "";
  const accountName =
    (typeof userMetadata?.full_name === "string" && userMetadata.full_name) ||
    (typeof userMetadata?.name === "string" && userMetadata.name) ||
    session?.user.email?.split("@")[0] ||
    "User";

  const exitGuestMode = () => {
    setIsGuestMode(false);
    setView("home");
    setHistory([]);
    setAnalysisData(null);
    setActiveDate("");
  };

  return (
    <div className="demo-page">
      <div
        className="demo-phone-shell"
        style={{
          width: demoFrame.width,
          height: demoFrame.height,
        }}
      >
        <div
          className="demo-phone-device"
          style={{
            left: demoFrame.offsetX,
            top: demoFrame.offsetY,
            width: DEMO_PHONE_WIDTH,
            height: DEMO_PHONE_HEIGHT,
            transform: `scale(${demoFrame.scale})`,
          }}
        >
        {isAuthLoading && (
          <div className="bg-white relative rounded-[40px] size-full">
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-chenyuluoyan-thin text-[#958475] text-[34px] tracking-[0.12em] whitespace-nowrap">
              {language === "en" ? "Loading" : "載入中"}
            </p>
          </div>
        )}
        {!isAuthLoading && !session && !isGuestMode && <AuthScreen language={language} onGuest={() => setIsGuestMode(true)} />}
        {!isAuthLoading && (session || isGuestMode) && (
          <>
        {view === "home" && (
          <Home
            onShred={handleShred}
            isVideoPlaying={isVideoPlaying}
            videoSrc={shredderVideo}
            crunchAudioSrc={isSoundEnabled ? paperCrunch : undefined}
            language={language}
            onVideoEnded={() => {
              setIsVideoPlaying(false);
              navigateTo("ai");
            }}
          />
        )}
        {view === "calendar" && (
          <Calendar onPickDay={(y, m, d) => {
            setActiveDate(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
            navigateTo("daily");
          }} language={language} />
        )}
        {view === "collection" && (
          <Collection onPickFlower={(index) => {
            setAnalysisData({ flowerIndex: index });
            navigateTo("flowerDetail");
          }} language={language} />
        )}
        {view === "settings" && (
          <Settings
            accountName={session ? accountName : "User"}
            avatarUrl={session ? avatarUrl : ""}
            userEmail={session?.user.email ?? ""}
            language={language}
            onLanguageChange={setLanguage}
            soundEnabled={isSoundEnabled}
            onSoundEnabledChange={setIsSoundEnabled}
            notificationEnabled={isNotificationEnabled}
            onNotificationEnabledChange={handleNotificationEnabledChange}
            onDeleteAllRecords={session ? handleDeleteAllRecords : undefined}
            onSignOut={session ? handleSignOut : exitGuestMode}
            signOutLabel={session ? (language === "en" ? "Sign out" : "登出") : (language === "en" ? "Exit" : "離開")}
          />
        )}
        {view === "garden" && <Garden />}
        {view === "ai" && <AiAnalysis data={analysisData} language={language} />}
        {view === "daily" && <Daily activeDate={activeDate} language={language} onChangeDate={setActiveDate} />}
        {view === "flowerDetail" && <FlowerDetail flowerIndex={analysisData?.flowerIndex} language={language} />}

        <div className="absolute left-0 right-0 bottom-0 flex justify-center gap-[40px] px-[32px] py-[20px] z-50 pointer-events-none">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => navigateTo(t)}
              className="size-[36px] bg-transparent cursor-pointer pointer-events-auto"
              aria-label={t}
            />
          ))}
        </div>

        {(view === "ai" || view === "daily" || view === "flowerDetail") && (
          <button
            onClick={goBack}
            className="absolute left-[36px] top-[36px] size-[48px] rounded-full bg-transparent cursor-pointer z-50"
            aria-label="close"
          />
        )}
          </>
        )}
        </div>
      </div>
      <audio ref={backgroundAudioRef} src={backgroundMusic} preload="auto" loop className="hidden" />
    </div>
  );
}
