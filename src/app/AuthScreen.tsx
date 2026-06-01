import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../utils/supabaseClient";
import type { AppLanguage } from "../utils/i18n";
import SwappingFlowerStrip from "./components/SwappingFlowerStrip";

type AuthMode = "login" | "signup";

const AUTH_COPY = {
  zh: {
    title: "情緒碎紙機",
    tagline: "喀擦，讓每一種情緒都變成花圃裡的一朵花",
    password: "密碼",
    newPassword: "新密碼",
    missing: "請輸入 Email 和密碼",
    missingPassword: "請輸入密碼",
    resetMissing: "請先輸入 Email，我們會寄送重設密碼連結",
    confirmEmail: "請先到信箱確認，再回來登入",
    resetSent: "重設密碼連結已寄出，請到信箱查看",
    resetTitle: "設定新密碼",
    resetTagline: "輸入新的密碼後，就可以繼續使用情緒碎紙機",
    resetSuccess: "密碼已更新",
    loading: "處理中...",
    login: "登入",
    signup: "註冊",
    updatePassword: "更新密碼",
    forgotPassword: "忘記密碼？",
    google: "Google 快速註冊/登入",
    switchToLogin: "已有帳號，登入",
    switchToSignup: "沒有帳號，註冊",
    guest: "不登入也能體驗，先逛逛",
    showPassword: "顯示密碼",
    hidePassword: "隱藏密碼",
  },
  en: {
    title: "Emotion Shredder",
    tagline: "Snap each feeling into a flower in your garden.",
    password: "Password",
    newPassword: "New password",
    missing: "Please enter your email and password",
    missingPassword: "Please enter a password",
    resetMissing: "Enter your email first and we will send a reset link",
    confirmEmail: "Check your inbox first, then come back to sign in",
    resetSent: "Password reset link sent. Check your inbox.",
    resetTitle: "Set a new password",
    resetTagline: "Enter a new password to keep using Emotion Shredder.",
    resetSuccess: "Password updated",
    loading: "Working...",
    login: "Log in",
    signup: "Sign up",
    updatePassword: "Update password",
    forgotPassword: "Forgot password?",
    google: "Continue with Google",
    switchToLogin: "Already have an account? Log in",
    switchToSignup: "No account yet? Sign up",
    guest: "Try it without logging in",
    showPassword: "Show password",
    hidePassword: "Hide password",
  },
} satisfies Record<AppLanguage, Record<string, string>>;

function getAuthRedirectUrl() {
  return new URL(import.meta.env.BASE_URL || "/", window.location.origin).toString();
}

function AuthFlowerStrip() {
  return <SwappingFlowerStrip className="absolute bottom-[104px] left-1/2 h-[84px] w-[342px] -translate-x-1/2" />;
}

export default function AuthScreen({
  isPasswordRecovery = false,
  language = "zh",
  onGuest,
  onPasswordRecoveryComplete,
}: {
  isPasswordRecovery?: boolean;
  language?: AppLanguage;
  onGuest?: () => void;
  onPasswordRecoveryComplete?: () => void;
}) {
  const copy = AUTH_COPY[language];
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isSignup = mode === "signup";
  const title = isPasswordRecovery ? copy.resetTitle : copy.title;
  const tagline = isPasswordRecovery ? copy.resetTagline : copy.tagline;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (isPasswordRecovery) {
      if (!password) {
        setMessage(copy.missingPassword);
        return;
      }

      setIsLoading(true);
      setMessage("");

      const { error } = await supabase.auth.updateUser({ password });
      setIsLoading(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      setPassword("");
      setMessage(copy.resetSuccess);
      window.setTimeout(() => onPasswordRecoveryComplete?.(), 700);
      return;
    }

    if (!normalizedEmail || !password) {
      setMessage(copy.missing);
      return;
    }

    setIsLoading(true);
    setMessage("");

    const result = isSignup
      ? await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            emailRedirectTo: getAuthRedirectUrl(),
          },
        })
      : await supabase.auth.signInWithPassword({ email: normalizedEmail, password });

    setIsLoading(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (isSignup && !result.data.session) {
      setMessage(copy.confirmEmail);
    }
  };

  const sendPasswordReset = async () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setMessage(copy.resetMissing);
      return;
    }

    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: getAuthRedirectUrl(),
    });

    setIsLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(copy.resetSent);
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getAuthRedirectUrl(),
      },
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white overflow-hidden relative rounded-[40px] size-full">
      <div className="absolute inset-x-[42px] top-[142px]">
        <p className="font-chenyuluoyan-thin text-[#958475] text-[42px] tracking-[0.12em] leading-none">
          {title}
        </p>
        <p className="mt-4 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#9c9490] text-[15px] leading-[1.55]">
          {tagline}
        </p>
      </div>

      <form onSubmit={submit} className="absolute left-[42px] right-[42px] top-[274px] flex flex-col gap-3">
        {!isPasswordRecovery && (
          <label className="flex flex-col gap-2">
            <span className="font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#958475] text-[14px]">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-[48px] rounded-[14px] border border-[#e5ded8] bg-[#fbfaf8] px-4 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#767676] text-[16px] outline-none focus:border-[#b9aa9b]"
            />
          </label>
        )}

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#958475] text-[14px]">
              {isPasswordRecovery ? copy.newPassword : copy.password}
            </span>
            {!isSignup && !isPasswordRecovery && (
              <button
                type="button"
                onClick={sendPasswordReset}
                disabled={isLoading}
                className="bg-transparent p-0 font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#b18478] text-[13px] disabled:opacity-60"
              >
                {copy.forgotPassword}
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              autoComplete={isSignup || isPasswordRecovery ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-[48px] w-full rounded-[14px] border border-[#e5ded8] bg-[#fbfaf8] px-4 pr-[48px] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#767676] text-[16px] outline-none focus:border-[#b9aa9b]"
            />
            <button
              type="button"
              aria-label={isPasswordVisible ? copy.hidePassword : copy.showPassword}
              onClick={() => setIsPasswordVisible((visible) => !visible)}
              className="absolute right-[13px] top-1/2 flex size-[24px] -translate-y-1/2 items-center justify-center bg-transparent p-0 text-[#958475]"
            >
              {isPasswordVisible ? <EyeOff size={20} strokeWidth={1.8} /> : <Eye size={20} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 h-[48px] rounded-[16px] bg-[#958475] font-['Fredoka:SemiBold','Noto_Sans_JP:Regular',sans-serif] text-white text-[16px] disabled:opacity-60"
        >
          {isLoading ? copy.loading : isPasswordRecovery ? copy.updatePassword : isSignup ? copy.signup : copy.login}
        </button>

        {!isPasswordRecovery && (
          <>
            <button
              type="button"
              onClick={signInWithGoogle}
              disabled={isLoading}
              className="h-[46px] rounded-[16px] border border-[#e5ded8] bg-white font-['Fredoka:SemiBold','Noto_Sans_JP:Regular',sans-serif] text-[#767676] text-[15px] disabled:opacity-60"
            >
              <span className="mr-2 inline-flex size-[22px] items-center justify-center rounded-full border border-[#e5ded8] text-[15px] text-[#958475]">
                G
              </span>
              {copy.google}
            </button>

            <button
              type="button"
              onClick={() => {
                setMode(isSignup ? "login" : "signup");
                setMessage("");
              }}
              className="h-[38px] bg-transparent font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#958475] text-[15px]"
            >
              {isSignup ? copy.switchToLogin : copy.switchToSignup}
            </button>
          </>
        )}

        {message && (
          <p className="min-h-[24px] font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#b18478] text-[14px] leading-[1.5] text-center">
            {message}
          </p>
        )}
      </form>

      <AuthFlowerStrip />
      {!isPasswordRecovery && (
        <button
          type="button"
          onClick={onGuest}
          className="absolute bottom-[42px] left-1/2 h-[28px] -translate-x-1/2 whitespace-nowrap bg-transparent font-['Fredoka:Regular','Noto_Sans_JP:Regular',sans-serif] text-[#958475] text-[15px]"
        >
          {copy.guest}
        </button>
      )}
    </div>
  );
}
