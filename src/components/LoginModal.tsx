import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Eye, EyeOff, AlertCircle, Loader2, X } from "lucide-react";

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSwitchToRegister?: () => void;
}

export default function LoginModal({
  isOpen = true,
  onClose,
  onSwitchToRegister,
}: LoginModalProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose?.();
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError("");
      await signInWithPopup(auth, googleProvider);
      onClose?.();
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Google sign-in failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        .lm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 14, 26, 0.72);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
          animation: lm-fade-in 0.3s ease;
          overflow-y: auto;
        }

        @keyframes lm-fade-in { from { opacity: 0; } to { opacity: 1; } }

        .lm-card {
          font-family: 'Sora', sans-serif;
          background: #ffffff;
          border-radius: 24px;
          width: 100%;
          max-width: 420px;
          max-height: calc(100vh - 32px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: lm-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        @keyframes lm-slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .lm-top-bar {
          height: 6px;
          flex-shrink: 0;
          background: linear-gradient(90deg, #22c55e 0%, #84cc16 100%);
        }

        .lm-body { 
          padding: 32px; 
          overflow-y: auto;
          flex: 1;
        }

        .lm-close {
          position: absolute;
          top: 16px;
          right: 16px;
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
          z-index: 10;
        }

        .lm-close:hover { background: #e2e8f0; color: #0f172a; }

        .lm-title { font-size: 26px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; margin-bottom: 8px; margin-top: 8px; }
        .lm-subtitle { font-size: 14px; color: #64748b; margin-bottom: 28px; }

        .lm-field { margin-bottom: 18px; }
        .lm-label-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .lm-label { font-size: 13px; font-weight: 600; color: #334155; }
        
        .lm-forgot { 
          font-size: 12px; color: #22c55e; font-weight: 600; cursor: pointer; 
          background: none; border: none; padding: 0; font-family: inherit;
        }

        .lm-input-container { position: relative; display: flex; align-items: center; }
        
        .lm-input {
          width: 100%;
          padding: 12px 16px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          font-family: inherit;
          transition: all 0.2s;
          outline: none;
        }

        .lm-input:focus { border-color: #22c55e; background: #fff; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1); }
        .lm-input-error { border-color: #ef4444 !important; background: #fffcfc; }

        .lm-toggle-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }

        .lm-toggle-btn:hover { color: #22c55e; }

        .lm-error-msg {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #ef4444;
          font-size: 12px;
          font-weight: 500;
          margin-top: 8px;
        }

        .lm-btn-primary {
          width: 100%;
          padding: 14px;
          background: #22c55e;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .lm-btn-primary:hover:not(:disabled) { background: #16a34a; transform: translateY(-1px); }
        .lm-btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

        .lm-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
        .lm-line { flex: 1; height: 1px; background: #e2e8f0; }
        .lm-divider-text { font-size: 12px; color: #94a3b8; font-weight: 500; }

        .lm-btn-google {
          width: 100%;
          padding: 12px;
          background: white;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s;
        }

        .lm-btn-google:hover { background: #f8fafc; border-color: #cbd5e1; }

        .lm-footer {
          background: #f8fafc;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
          flex-shrink: 0;
        }

        .lm-link { color: #22c55e; font-weight: 600; background: none; border: none; cursor: pointer; padding: 0 4px; }
        .lm-link:hover { text-decoration: underline; }

        @media (max-width: 480px) {
          .lm-overlay { padding: 12px; }
          .lm-body { padding: 24px; }
          .lm-title { font-size: 24px; }
          .lm-card { border-radius: 20px; }
        }
      `}</style>

      <div className="lm-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
        <div className="lm-card">
          <div className="lm-top-bar" />
          
          <div className="lm-body">
            {onClose && (
              <button className="lm-close" onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            )}

            <h1 className="lm-title">Welcome back</h1>
            <p className="lm-subtitle">Please enter your details to sign in.</p>

            <form onSubmit={handleSubmit}>
              <div className="lm-field">
                <div className="lm-label-row">
                  <label className="lm-label">Email Address</label>
                </div>
                <input
                  type="email"
                  className={`lm-input ${error ? "lm-input-error" : ""}`}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  required
                />
              </div>

              <div className="lm-field">
                <div className="lm-label-row">
                  <label className="lm-label">Password</label>
                  <button type="button" className="lm-forgot">Forgot password?</button>
                </div>
                <div className="lm-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`lm-input ${error ? "lm-input-error" : ""}`}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    required
                  />
                  <button
                    type="button"
                    className="lm-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {error && (
                  <div className="lm-error-msg">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}
              </div>

              <button type="submit" className="lm-btn-primary" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : "Sign in"}
              </button>
            </form>

            <div className="lm-divider">
              <div className="lm-line" />
              <span className="lm-divider-text">OR</span>
              <div className="lm-line" />
            </div>

            <button className="lm-btn-google" onClick={handleGoogleLogin} type="button" disabled={isLoading}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </div>

          <div className="lm-footer">
            New to TrendFusion? 
            <button className="lm-link" onClick={onSwitchToRegister}>Create an account</button>
          </div>
        </div>
      </div>
    </>
  );
}