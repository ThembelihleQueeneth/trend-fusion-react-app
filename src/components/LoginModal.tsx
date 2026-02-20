import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSwitchToRegister?: () => void;
}

// Demo credentials
const DEMO_EMAIL = "demo@gmail.com";
const DEMO_PASSWORD = "12345678";

export default function LoginModal({
  isOpen = true,
  onClose,
  onSwitchToRegister,
}: LoginModalProps) {
  // ✅ All hooks must be at the top — before any early returns
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Early return AFTER hooks
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((res) => setTimeout(res, 800));

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setIsLoading(false);
      onClose?.();
      navigate("/dashboard");
    } else {
      setIsLoading(false);
      setError("Invalid demo credentials. Use demo@gmail.com / 12345678");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 14, 26, 0.72);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: lm-fade-in 0.25s ease;
        }

        @keyframes lm-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lm-slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .lm-card {
          font-family: 'Sora', sans-serif;
          background: #ffffff;
          border-radius: 20px;
          width: 100%;
          max-width: 440px;
          margin: 16px;
          overflow: hidden;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.04),
            0 20px 60px rgba(0,0,0,0.14),
            0 0 0 1px rgba(0,0,0,0.06);
          animation: lm-slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .lm-top-bar {
          height: 5px;
          background: linear-gradient(90deg, #1a6ed8 0%, #2d9cff 100%);
        }

        .lm-body {
          padding: 40px 40px 36px;
        }

        .lm-close {
          position: absolute;
          top: 14px;
          right: 16px;
          width: 32px;
          height: 32px;
          border: none;
          background: rgba(0,0,0,0.05);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 18px;
          line-height: 1;
          transition: background 0.15s, color 0.15s;
        }

        .lm-close:hover { background: rgba(0,0,0,0.1); color: #111; }

        .lm-card-inner { position: relative; }

        .lm-title {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .lm-subtitle {
          font-size: 13.5px;
          color: #94a3b8;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .lm-demo-hint {
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 24px;
          font-size: 12.5px;
          color: #0369a1;
          font-family: 'Sora', sans-serif;
          line-height: 1.6;
        }

        .lm-demo-hint strong {
          font-weight: 600;
        }

        .lm-field {
          margin-bottom: 20px;
        }

        .lm-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 7px;
        }

        .lm-label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          letter-spacing: 0.01em;
        }

        .lm-forgot {
          font-size: 12.5px;
          color: #1a6ed8;
          font-weight: 500;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'Sora', sans-serif;
          padding: 0;
          transition: color 0.15s;
        }

        .lm-forgot:hover { color: #1557b8; text-decoration: underline; }

        .lm-input {
          width: 100%;
          padding: 12px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14.5px;
          font-family: 'Sora', sans-serif;
          color: #0f172a;
          background: #f8fafc;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          outline: none;
        }

        .lm-input:focus {
          border-color: #1a6ed8;
          background: #fff;
          box-shadow: 0 0 0 3.5px rgba(26, 110, 216, 0.12);
        }

        .lm-input.lm-input-error {
          border-color: #ef4444;
          box-shadow: 0 0 0 3.5px rgba(239, 68, 68, 0.1);
        }

        .lm-input::placeholder { color: #c1cad6; }

        .lm-error {
          margin-top: 6px;
          font-size: 12.5px;
          color: #ef4444;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .lm-btn-primary {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #1a6ed8 0%, #1557b8 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          margin-top: 8px;
          margin-bottom: 20px;
          letter-spacing: 0.01em;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          box-shadow: 0 4px 14px rgba(26, 110, 216, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
        }

        .lm-btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26, 110, 216, 0.45);
        }

        .lm-btn-primary:active:not(:disabled) { transform: translateY(0); }
        .lm-btn-primary:disabled { opacity: 0.75; cursor: not-allowed; }

        .lm-spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: lm-spin 0.7s linear infinite;
        }

        @keyframes lm-spin { to { transform: rotate(360deg); } }

        .lm-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .lm-divider-line {
          flex: 1;
          height: 1px;
          background: #e9eef5;
        }

        .lm-divider-text {
          font-size: 12px;
          color: #b0bac6;
          font-weight: 500;
          white-space: nowrap;
        }

        .lm-btn-google {
          width: 100%;
          padding: 12px;
          background: #fff;
          color: #1a202c;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14.5px;
          font-weight: 600;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
          min-height: 48px;
        }

        .lm-btn-google:hover {
          background: #f8fafc;
          border-color: #c7d4e4;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .lm-google-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .lm-footer {
          background: #f8fafc;
          padding: 16px 40px;
          text-align: center;
          border-top: 1px solid #eef1f6;
          font-size: 13.5px;
          color: #6b7280;
        }

        .lm-register-link {
          color: #1a6ed8;
          font-weight: 600;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'Sora', sans-serif;
          font-size: 13.5px;
          padding: 0;
          text-decoration: none;
          transition: color 0.15s;
        }

        .lm-register-link:hover { color: #1557b8; text-decoration: underline; }
      `}</style>

      <div className="lm-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
        <div className="lm-card">
          <div className="lm-top-bar" />
          <div className="lm-body">
            <div className="lm-card-inner">
              {onClose && (
                <button className="lm-close" onClick={onClose} aria-label="Close">
                  ×
                </button>
              )}
              <h1 className="lm-title">Welcome back</h1>
              <p className="lm-subtitle">Log in to your account to continue</p>

              <form onSubmit={handleSubmit}>
                <div className="lm-field">
                  <div className="lm-label-row">
                    <label className="lm-label" htmlFor="login-email">Email</label>
                  </div>
                  <input
                    id="login-email"
                    className={`lm-input${error ? " lm-input-error" : ""}`}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="lm-field">
                  <div className="lm-label-row">
                    <label className="lm-label" htmlFor="login-password">Password</label>
                    <button type="button" className="lm-forgot">Forgot password?</button>
                  </div>
                  <input
                    id="login-password"
                    className={`lm-input${error ? " lm-input-error" : ""}`}
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    required
                    autoComplete="current-password"
                  />
                  {error && (
                    <div className="lm-error">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {error}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="lm-btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><div className="lm-spinner" /> Logging in…</>
                  ) : (
                    "Log in"
                  )}
                </button>
              </form>

              <div className="lm-divider">
                <div className="lm-divider-line" />
                <span className="lm-divider-text">or continue with</span>
                <div className="lm-divider-line" />
              </div>

              <button className="lm-btn-google" onClick={handleGoogleLogin} type="button">
                <svg className="lm-google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="lm-footer">
            Don't have an account?{" "}
            <button className="lm-register-link" onClick={onSwitchToRegister} type="button">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}