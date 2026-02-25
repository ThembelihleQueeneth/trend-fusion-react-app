import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

const googleProvider = new GoogleAuthProvider();

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({
  isOpen = true,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose?.();
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      setError("");
      await signInWithPopup(auth, googleProvider);
      onClose?.();
    } catch (err: any) {
      console.error(err);
      setError("Google sign-up failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .rm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 14, 26, 0.72);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: rm-fade-in 0.3s ease;
        }

        @keyframes rm-fade-in { from { opacity: 0; } to { opacity: 1; } }

        .rm-card {
          font-family: 'Sora', sans-serif;
          background: #ffffff;
          border-radius: 24px;
          width: 100%;
          max-width: 440px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: rm-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        @keyframes rm-slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .rm-top-bar {
          height: 6px;
          background: linear-gradient(90deg, #2aba40 0%, #2cd23f 100%);
        }

        .rm-body { padding: 40px; }

        .rm-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 32px;
          height: 32px;
          border: none;
          background: #f1f5f9;
          border-radius: 50%;
          cursor: pointer;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .rm-close:hover { background: #e2e8f0; color: #0f172a; }

        .rm-title { font-size: 26px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 6px; }
        .rm-subtitle { font-size: 14px; color: #94a3b8; margin-bottom: 24px; }

        .rm-field { margin-bottom: 18px; }
        .rm-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 8px; }

        .rm-input-wrap { position: relative; display: flex; align-items: center; }

        .rm-input {
          width: 100%;
          padding: 12px 14px;
          padding-right: 44px;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14.5px;
          font-family: inherit;
          color: #0f172a;
          background: #f8fafc;
          transition: all 0.2s;
          outline: none;
        }

        .rm-input:focus {
          border-color: #2aba40;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(42, 186, 64, 0.1);
        }

        .rm-input-error { border-color: #ef4444 !important; }

        .rm-toggle-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          padding: 4px;
          transition: color 0.2s;
        }

        .rm-toggle-btn:hover { color: #2aba40; }

        .rm-error-box {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #ef4444;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .rm-btn-primary {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #2aba40 0%, #2cd23f 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 20px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(42, 186, 64, 0.3);
        }

        .rm-btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(42, 186, 64, 0.4); }
        .rm-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

        .rm-divider { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .rm-line { flex: 1; height: 1px; background: #e9eef5; }
        .rm-divider-text { font-size: 12px; color: #b0bac6; font-weight: 500; }

        .rm-btn-google {
          width: 100%;
          padding: 12px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
        }

        .rm-btn-google:hover { background: #f8fafc; border-color: #c7d4e4; }

        .rm-footer {
          background: #f8fafc;
          padding: 20px;
          text-align: center;
          border-top: 1px solid #eef1f6;
          font-size: 14px;
          color: #6b7280;
        }

        .rm-login-link { color: #2aba40; font-weight: 600; background: none; border: none; cursor: pointer; padding-left: 5px; }
        .rm-login-link:hover { text-decoration: underline; }
      `}</style>

      <div className="rm-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
        <div className="rm-card">
          <div className="rm-top-bar" />
          <div className="rm-body">
            {onClose && (
              <button className="rm-close" onClick={onClose}>×</button>
            )}
            
            <h1 className="rm-title">Create account</h1>
            <p className="rm-subtitle">Join TrendFusion today — it's free</p>

            {error && (
              <div className="rm-error-box">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="rm-field">
                <label className="rm-label">Email Address</label>
                <div className="rm-input-wrap">
                  <input
                    type="email"
                    className="rm-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="rm-field">
                <label className="rm-label">Password</label>
                <div className="rm-input-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="rm-input"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="rm-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="rm-field">
                <label className="rm-label">Confirm Password</label>
                <div className="rm-input-wrap">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`rm-input ${error === "Passwords do not match" ? "rm-input-error" : ""}`}
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="rm-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="rm-btn-primary" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="animate-spin" size={18} /> Creating account...</>
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            <div className="rm-divider">
              <div className="rm-line" />
              <span className="rm-divider-text">OR CONTINUE WITH</span>
              <div className="rm-line" />
            </div>

            <button className="rm-btn-google" onClick={handleGoogleSignUp} type="button">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className="rm-footer">
            Already have an account?
            <button className="rm-login-link" onClick={onSwitchToLogin}>Log in</button>
          </div>
        </div>
      </div>
    </>
  );
}