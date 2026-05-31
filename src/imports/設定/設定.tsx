import { useState } from "react";
import svgPaths from "./svg-f6ric2bb1d";
import type { AppLanguage } from "../../utils/i18n";
import { LANGUAGE_LABELS } from "../../utils/i18n";
import SwappingFlowerStrip from "../../app/components/SwappingFlowerStrip";

type SettingRow =
  | { type: "select"; label: string; key: string; options: string[] }
  | { type: "toggle"; label: string; key: string }
  | { type: "action"; label: string; key: string; value: string; tone?: "danger" }
  | { type: "info"; label: string; key: string; value: string };

type SettingsProps = {
  accountName?: string;
  avatarUrl?: string;
  userEmail?: string;
  language?: AppLanguage;
  onLanguageChange?: (language: AppLanguage) => void;
  soundEnabled?: boolean;
  onSoundEnabledChange?: (enabled: boolean) => void;
  notificationEnabled?: boolean;
  onNotificationEnabledChange?: (enabled: boolean) => void | Promise<void>;
  onDeleteAllRecords?: () => Promise<void>;
  onSignOut?: () => void;
  signOutLabel?: string;
};

type SettingsModalKind = "delete" | "privacy" | "guestDelete" | "deleted" | "deleteError" | null;

const APP_VERSION = "0.0.1";

const SETTINGS_COPY = {
  zh: {
    language: "語言",
    sound: "音效",
    notification: "通知",
    deleteRecords: "刪除所有紀錄",
    delete: "刪除",
    privacyAi: "隱私/AI 使用說明",
    view: "查看",
    appVersion: "App 版本",
    account: "帳號/登出",
    cancel: "取消",
    close: "知道了",
    deleting: "刪除中",
    deleteModalTitle: "刪除所有紀錄",
    deleteModalBody: "會刪除目前帳號裡的花圃、日曆、收藏和每日紀錄。刪除後不能復原。",
    privacyTitle: "隱私/AI 使用說明",
    privacyBody: "你送出的文字會傳到 AI 產生花朵、關鍵字和摘要。登入後，紀錄會存在你的 Supabase 帳號資料中，其他帳號不能讀取。",
    guestDeleteTitle: "沒有雲端紀錄",
    guestDeleteBody: "訪客模式只用來體驗畫面，不會把紀錄存到雲端。",
    deletedTitle: "已刪除",
    deletedBody: "所有雲端紀錄都已清空。",
    deleteErrorTitle: "刪除失敗",
    deleteErrorBody: "目前無法刪除紀錄，請稍後再試一次。",
  },
  en: {
    language: "Language",
    sound: "Sound",
    notification: "Notifications",
    deleteRecords: "Delete all records",
    delete: "Delete",
    privacyAi: "Privacy / AI use",
    view: "View",
    appVersion: "App version",
    account: "Account / Sign out",
    cancel: "Cancel",
    close: "Got it",
    deleting: "Deleting",
    deleteModalTitle: "Delete all records",
    deleteModalBody: "This will remove your garden, calendar, collection, and daily records for this account. This cannot be undone.",
    privacyTitle: "Privacy / AI use",
    privacyBody: "Your text is sent to AI to generate flowers, keywords, and summaries. When signed in, records are saved to your Supabase account and cannot be read by other accounts.",
    guestDeleteTitle: "No cloud records",
    guestDeleteBody: "Guest mode is only for trying the app and does not save records to the cloud.",
    deletedTitle: "Deleted",
    deletedBody: "All cloud records have been cleared.",
    deleteErrorTitle: "Delete failed",
    deleteErrorBody: "Records cannot be deleted right now. Please try again later.",
  },
} satisfies Record<AppLanguage, Record<string, string>>;

function createSettingRows(signOutLabel: string, language: AppLanguage): SettingRow[] {
  const copy = SETTINGS_COPY[language];
  return [
    { type: "select", label: copy.language, key: "lang", options: [LANGUAGE_LABELS.zh, LANGUAGE_LABELS.en] },
    { type: "toggle", label: copy.sound, key: "sound" },
    { type: "toggle", label: copy.notification, key: "notification" },
    { type: "action", label: copy.deleteRecords, key: "deleteRecords", value: copy.delete, tone: "danger" },
    { type: "action", label: copy.privacyAi, key: "privacyAi", value: copy.view },
    { type: "info", label: copy.appVersion, key: "version", value: APP_VERSION },
    { type: "action", label: copy.account, key: "account", value: signOutLabel, tone: "danger" },
  ];
}

function SettingItem({
  row,
  value,
  onAction,
  onChange,
}: {
  row: SettingRow;
  value?: boolean | string;
  onAction: (key: string) => void;
  onChange: (v: boolean | string) => void;
}) {
  const actionColor = row.type === "action" && row.tone === "danger" ? "text-[#b18478]" : "text-[#767676]";

  return (
    <div className="bg-white h-[51px] relative rounded-[20px] shrink-0 w-[296px]" data-name="設�?">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute left-[24px] top-1/2 -translate-y-1/2 flex items-center justify-between w-[248px]">
          <p className="[word-break:break-word] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal text-black text-[16px] leading-[normal]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {row.label}
          </p>
          {row.type === "toggle" ? (
            <button
              onClick={() => onChange(!(value as boolean))}
              className={`relative w-[40px] h-[22px] rounded-full transition-colors cursor-pointer ${value ? "bg-[#958475]" : "bg-[#e0d8d0]"}`}
              aria-label={row.label}
            >
              <span className={`absolute top-[2px] size-[18px] rounded-full bg-white shadow transition-all ${value ? "left-[20px]" : "left-[2px]"}`} />
            </button>
          ) : row.type === "select" ? (
            <button
              onClick={() => {
                const idx = row.options.indexOf(value as string);
                onChange(row.options[(idx + 1) % row.options.length]);
              }}
              className="font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal text-[#767676] text-[16px] cursor-pointer"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {value as string}
            </button>
          ) : row.type === "action" ? (
            <button
              onClick={() => onAction(row.key)}
              className={`font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal ${actionColor} text-[16px] cursor-pointer`}
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              {row.value}
            </button>
          ) : (
            <p className="font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal text-[#767676] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
              {row.value}
            </p>
          )}
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.2)]" />
    </div>
  );
}

function Group() {
  return (
    <div className="[word-break:break-word] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[16px] whitespace-nowrap">
      <p className="col-1 leading-[normal] ml-0 mt-0 relative row-1 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        語�?
      </p>
      <p className="col-1 leading-[normal] ml-[216px] mt-0 relative row-1 text-[#767676] text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        中�?
      </p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] top-[16px]">
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="[word-break:break-word] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[16px] whitespace-nowrap">
      <p className="col-1 leading-[normal] ml-0 mt-0 relative row-1 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��?
      </p>
      <p className="col-1 leading-[normal] ml-[223px] mt-0 relative row-1 text-[#767676] text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        ?��?
      </p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] top-[16px]">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="[word-break:break-word] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[16px] whitespace-nowrap">
      <p className="col-1 leading-[normal] ml-0 mt-0 relative row-1 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        語�?
      </p>
      <p className="col-1 leading-[normal] ml-[216px] mt-0 relative row-1 text-[#767676] text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        中�?
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] top-[16px]">
      <Group2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="[word-break:break-word] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[16px] whitespace-nowrap">
      <p className="col-1 leading-[normal] ml-0 mt-0 relative row-1 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        語�?
      </p>
      <p className="col-1 leading-[normal] ml-[216px] mt-0 relative row-1 text-[#767676] text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        中�?
      </p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] top-[16px]">
      <Group3 />
    </div>
  );
}

function Group4() {
  return (
    <div className="[word-break:break-word] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[16px] whitespace-nowrap">
      <p className="col-1 leading-[normal] ml-0 mt-0 relative row-1 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        語�?
      </p>
      <p className="col-1 leading-[normal] ml-[216px] mt-0 relative row-1 text-[#767676] text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        中�?
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] top-[16px]">
      <Group4 />
    </div>
  );
}

function Group5() {
  return (
    <div className="[word-break:break-word] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[16px] whitespace-nowrap">
      <p className="col-1 leading-[normal] ml-0 mt-0 relative row-1 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        語�?
      </p>
      <p className="col-1 leading-[normal] ml-[216px] mt-0 relative row-1 text-[#767676] text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        中�?
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] top-[16px]">
      <Group5 />
    </div>
  );
}

function Group6() {
  return (
    <div className="[word-break:break-word] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-[16px] whitespace-nowrap">
      <p className="col-1 leading-[normal] ml-0 mt-0 relative row-1 text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
        語�?
      </p>
      <p className="col-1 leading-[normal] ml-[216px] mt-0 relative row-1 text-[#767676] text-right" style={{ fontVariationSettings: "'wdth' 100" }}>
        中�?
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[24px] top-[16px]">
      <Group6 />
    </div>
  );
}

function Frame({
  hasDeleteAllRecords,
  language,
  soundEnabled,
  notificationEnabled,
  onOpenModal,
  onLanguageChange,
  onSoundEnabledChange,
  onNotificationEnabledChange,
  onSignOut,
  signOutLabel,
}: {
  hasDeleteAllRecords: boolean;
  language: AppLanguage;
  soundEnabled: boolean;
  notificationEnabled: boolean;
  onOpenModal: (kind: Exclude<SettingsModalKind, null>) => void;
  onLanguageChange: (language: AppLanguage) => void;
  onSoundEnabledChange: (enabled: boolean) => void;
  onNotificationEnabledChange: (enabled: boolean) => void | Promise<void>;
  onSignOut?: () => void;
  signOutLabel: string;
}) {
  const [state, setState] = useState<Record<string, boolean | string>>({
  });
  const settingRows = createSettingRows(signOutLabel, language);

  const handleAction = async (key: string) => {
    if (key === "account") {
      onSignOut?.();
      return;
    }

    if (key === "privacyAi") {
      onOpenModal("privacy");
      return;
    }

    if (key === "deleteRecords") {
      if (!hasDeleteAllRecords) {
        onOpenModal("guestDelete");
        return;
      }

      onOpenModal("delete");
    }
  };

  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[19px] items-start left-1/2 top-[208px] w-[296px]">
      {settingRows.map((row) => (
        <SettingItem
          key={row.key}
          row={row}
          value={row.key === "lang" ? LANGUAGE_LABELS[language] : row.key === "sound" ? soundEnabled : row.key === "notification" ? notificationEnabled : state[row.key]}
          onAction={handleAction}
          onChange={(v) => {
            if (row.key === "lang") {
              onLanguageChange(v === LANGUAGE_LABELS.en ? "en" : "zh");
              return;
            }

            if (row.key === "sound") {
              onSoundEnabledChange(Boolean(v));
              return;
            }

            if (row.key === "notification") {
              void onNotificationEnabledChange(Boolean(v));
              return;
            }

            setState({ ...state, [row.key]: v });
          }}
        />
      ))}
      {/* ?��??�本?��??�卡??(保�?組件編譯，�? display none) */}
      <div className="hidden">
      <div className="bg-white h-[51px] relative rounded-[20px] shrink-0 w-[296px]" data-name="設�?">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Frame1 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.2)]" />
      </div>
      <div className="bg-white h-[51px] relative rounded-[20px] shrink-0 w-[296px]" data-name="設�?">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Frame2 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.2)]" />
      </div>
      <div className="bg-white h-[51px] relative rounded-[20px] shrink-0 w-[296px]" data-name="設�?">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Frame3 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.2)]" />
      </div>
      <div className="bg-white h-[51px] relative rounded-[20px] shrink-0 w-[296px]" data-name="設�?">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Frame4 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.2)]" />
      </div>
      <div className="bg-white h-[51px] relative rounded-[20px] shrink-0 w-[296px]" data-name="設�?">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Frame5 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.2)]" />
      </div>
      <div className="bg-white h-[51px] relative rounded-[20px] shrink-0 w-[296px]" data-name="設�?">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Frame6 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.2)]" />
      </div>
      <div className="bg-white h-[51px] relative rounded-[20px] shrink-0 w-[296px]" data-name="設�?">
        <div className="overflow-clip relative rounded-[inherit] size-full">
          <Frame7 />
        </div>
        <div aria-hidden="true" className="absolute border border-[#f3f3f3] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.2)]" />
      </div>
      </div>
    </div>
  );
}

function DefaultAvatar() {
  return (
    <svg className="absolute left-[15px] top-[13px] h-[46px] w-[42px]" fill="none" viewBox="0 0 42 46">
      <circle cx="21" cy="13" r="11" fill="#b8b1ac" />
      <path d="M4 43C6.6 31.5 14 26 21 26C28 26 35.4 31.5 38 43" fill="#b8b1ac" />
    </svg>
  );
}

function SettingsModal({
  kind,
  language,
  isDeleting,
  onClose,
  onConfirmDelete,
}: {
  kind: Exclude<SettingsModalKind, null>;
  language: AppLanguage;
  isDeleting: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}) {
  const copy = SETTINGS_COPY[language];
  const content = {
    delete: {
      title: copy.deleteModalTitle,
      body: copy.deleteModalBody,
    },
    privacy: {
      title: copy.privacyTitle,
      body: copy.privacyBody,
    },
    guestDelete: {
      title: copy.guestDeleteTitle,
      body: copy.guestDeleteBody,
    },
    deleted: {
      title: copy.deletedTitle,
      body: copy.deletedBody,
    },
    deleteError: {
      title: copy.deleteErrorTitle,
      body: copy.deleteErrorBody,
    },
  }[kind];

  return (
    <div className="absolute inset-0 z-[80] flex items-center justify-center bg-white/60 px-[40px] backdrop-blur-[1px]">
      <div className="relative w-[300px] rounded-[22px] border border-[#f3f3f3] bg-white px-[24px] py-[26px] shadow-[4px_4px_20px_5px_rgba(219,219,219,0.28)]">
        <p className="font-['Fredoka:SemiBold','Noto_Sans_JP:Regular',sans-serif] text-[#767676] text-[20px] leading-[1.3]">
          {content.title}
        </p>
        <p className="mt-[16px] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#958475] text-[15px] leading-[1.7]">
          {content.body}
        </p>
        {kind === "delete" ? (
          <div className="mt-[24px] flex justify-end gap-[12px]">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="h-[36px] rounded-[14px] bg-[#f2eeea] px-[18px] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#958475] text-[14px] disabled:opacity-60"
            >
              {copy.cancel}
            </button>
            <button
              type="button"
              onClick={onConfirmDelete}
              disabled={isDeleting}
              className="h-[36px] rounded-[14px] bg-[#b18478] px-[18px] font-['Fredoka:SemiBold','Noto_Sans_JP:Regular',sans-serif] text-white text-[14px] disabled:opacity-60"
            >
              {isDeleting ? copy.deleting : copy.delete}
            </button>
          </div>
        ) : (
          <div className="mt-[24px] flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-[36px] rounded-[14px] bg-[#958475] px-[22px] font-['Fredoka:SemiBold','Noto_Sans_JP:Regular',sans-serif] text-white text-[14px]"
            >
              {copy.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Flower() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="flower">
          <path d={svgPaths.p37336300} fill="var(--fill-0, #F2EEEA)" id="Vector" />
          <path d={svgPaths.p2016c800} id="Vector_2" stroke="var(--stroke-0, #F2EEEA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Calender() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="calender">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="calender">
          <path d={svgPaths.p17502100} fill="var(--fill-0, #F2EEEA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Home() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="home">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="home">
          <path d={svgPaths.p2c30b280} fill="var(--fill-0, #F2EEEA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Collection() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="collection">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="collection">
          <path d={svgPaths.pf609f00} fill="var(--fill-0, #F2EEEA)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Setting() {
  return (
    <div className="relative shrink-0 size-[36px]" data-name="setting">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 36">
        <g id="setting">
          <path d={svgPaths.p8073b80} fill="var(--fill-0, #958475)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Flower1() {
  return (
    <div className="absolute h-[57.203px] left-[10px] top-[11px] w-[37.744px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.7441 57.2027">
        <g id="flower">
          <path d={svgPaths.p221a3b60} fill="var(--fill-0, #FABBA9)" id="Vector 4" />
          <path d={svgPaths.p2af97d00} fill="var(--fill-0, #B2A8A7)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Flower2() {
  return (
    <div className="absolute h-[54.18px] left-[15px] top-[11px] w-[30.37px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.3701 54.1807">
        <g id="flower">
          <path d={svgPaths.p1240000} fill="var(--fill-0, #F9A092)" id="Vector 13" />
          <path d={svgPaths.pb12ce70} fill="var(--fill-0, #BACAC0)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Flower3() {
  return (
    <div className="absolute h-[59.065px] left-[9px] top-[15px] w-[41.006px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 41.0063 59.065">
        <g id="flower">
          <path d={svgPaths.p187dca00} fill="var(--fill-0, #F5CF88)" id="Vector 3" />
          <path clipRule="evenodd" d={svgPaths.p3a46ff00} fill="var(--fill-0, #C4C4C4)" fillRule="evenodd" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Flower4() {
  return (
    <div className="absolute h-[50.162px] left-[11px] top-[15px] w-[37.087px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.0868 50.1617">
        <g id="flower">
          <path d={svgPaths.p3b5e3080} fill="var(--fill-0, #E9D4DD)" id="Vector 18" />
          <path d={svgPaths.p3691f860} fill="var(--fill-0, #B6DBE4)" id="Vector 19" />
        </g>
      </svg>
    </div>
  );
}

function Flower5() {
  return (
    <div className="absolute h-[69.255px] left-[13px] top-[11px] w-[29.081px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.0809 69.255">
        <g id="flower">
          <path d={svgPaths.p371635f0} fill="var(--fill-0, #C2A8C1)" id="Vector 8" />
          <path d={svgPaths.p2771c100} fill="var(--fill-0, #B9C9BF)" id="Subtract" />
        </g>
      </svg>
    </div>
  );
}

function Flower6() {
  return (
    <div className="absolute h-[53.903px] left-[8px] top-[15px] w-[45.852px]" data-name="flower">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.8521 53.9028">
        <g id="flower">
          <path d={svgPaths.p16074900} fill="var(--fill-0, #EFB2C2)" id="Vector 1" />
          <path d={svgPaths.p318d270} fill="var(--fill-0, #B5DAE2)" id="Vector 2" />
        </g>
      </svg>
    </div>
  );
}

export default function Component({
  accountName,
  avatarUrl,
  userEmail = "",
  language = "zh",
  onLanguageChange,
  soundEnabled = true,
  onSoundEnabledChange,
  notificationEnabled = false,
  onNotificationEnabledChange,
  onDeleteAllRecords,
  onSignOut,
  signOutLabel = "登出",
}: SettingsProps = {}) {
  const displayName = accountName || (userEmail ? userEmail.split("@")[0] : "User");
  const [modal, setModal] = useState<SettingsModalKind>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDeleteAllRecords = async () => {
    if (!onDeleteAllRecords) {
      setModal("guestDelete");
      return;
    }

    try {
      setIsDeleting(true);
      await onDeleteAllRecords();
      setModal("deleted");
    } catch (err) {
      console.warn("Failed to delete records:", err);
      setModal("deleteError");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white overflow-clip relative rounded-[40px] size-full" data-name="設�?">
      <div className="-translate-x-1/2 absolute left-1/2 size-[72px] top-[60px] overflow-hidden rounded-full bg-[#f2eeea]">
        {avatarUrl ? (
          <img alt="" className="absolute block inset-0 size-full object-cover" src={avatarUrl} />
        ) : (
          <DefaultAvatar />
        )}
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-1/2 max-w-[250px] not-italic overflow-hidden text-[#767676] text-[20px] text-center top-[148px] truncate whitespace-nowrap">
        {displayName}
      </p>
      <div className="-translate-x-1/2 absolute left-1/2 top-[174px] flex w-[296px] items-center justify-center">
        <p className="font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] min-w-0 max-w-[250px] overflow-hidden text-[#9c9490] text-[13px] text-center truncate">
          {userEmail}
        </p>
      </div>
      <Frame
        hasDeleteAllRecords={Boolean(onDeleteAllRecords)}
        language={language}
        soundEnabled={soundEnabled}
        notificationEnabled={notificationEnabled}
        onOpenModal={setModal}
        onLanguageChange={onLanguageChange ?? (() => undefined)}
        onSoundEnabledChange={onSoundEnabledChange ?? (() => undefined)}
        onNotificationEnabledChange={onNotificationEnabledChange ?? (() => undefined)}
        onSignOut={onSignOut}
        signOutLabel={signOutLabel}
      />
      <div className="absolute bg-[#dfd4ca] content-stretch flex gap-[40px] items-center justify-center left-[-1px] px-[32px] py-[20px] top-[798px]" data-name="navigation bar">
        <Flower />
        <Calender />
        <Home />
        <Collection />
        <Setting />
      </div>
      <SwappingFlowerStrip className="-translate-x-1/2 absolute h-[80px] left-1/2 top-[718px] w-[360px]" />
      {modal && (
        <SettingsModal
          kind={modal}
          language={language}
          isDeleting={isDeleting}
          onClose={() => setModal(null)}
          onConfirmDelete={confirmDeleteAllRecords}
        />
      )}
    </div>
  );
}
