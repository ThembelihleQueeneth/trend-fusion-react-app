import { useState } from "react";


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
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));
    setIsLoading(false);
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .rm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 14, 26, 0.72);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: rm-fade-in 0.25s ease;
        }

        @keyframes rm-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes rm-slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .rm-card {
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
          animation: rm-slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .rm-top-bar {
          height: 5px;
          background: linear-gradient(90deg, #2aba40 0%, #2cd23f 100%);
        }

        .rm-body {
          padding: 40px 40px 36px;
        }

        .rm-close {
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

        .rm-close:hover { background: rgba(0,0,0,0.1); color: #111; }

        .rm-card-inner { position: relative; }

        .rm-title {
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.5px;
          margin-bottom: 8px;
        }

        .rm-subtitle {
          font-size: 13.5px;
          color: #94a3b8;
          margin-bottom: 32px;
          font-weight: 400;
        }

        .rm-field {
          margin-bottom: 20px;
        }

        .rm-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 7px;
          letter-spacing: 0.01em;
        }

        .rm-input-wrap {
          position: relative;
        }

        .rm-input {
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

        .rm-input:focus {
          border-color: #2aba40;
          background: #fff;
          box-shadow: 0 0 0 3.5px rgba(26, 110, 216, 0.12);
        }

        .rm-input::placeholder { color: #c1cad6; }

        .rm-btn-primary {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #2aba40 0%, #2cd23f 100%);
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
          box-shadow: 0 4px 14px rgba(20, 223, 64, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
        }

        .rm-btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(20, 223, 64, 0.45);
        }

        .rm-btn-primary:active:not(:disabled) { transform: translateY(0); }
        .rm-btn-primary:disabled { opacity: 0.75; cursor: not-allowed; }

        .rm-spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: rm-spin 0.7s linear infinite;
        }

        @keyframes rm-spin { to { transform: rotate(360deg); } }

        .rm-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .rm-divider-line {
          flex: 1;
          height: 1px;
          background: #e9eef5;
        }

        .rm-divider-text {
          font-size: 12px;
          color: #b0bac6;
          font-weight: 500;
          white-space: nowrap;
        }

        .rm-btn-google {
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

        .rm-btn-google:hover {
          background: #f8fafc;
          border-color: #c7d4e4;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .rm-google-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .rm-footer {
          background: #f8fafc;
          padding: 16px 40px;
          text-align: center;
          border-top: 1px solid #eef1f6;
          font-size: 13.5px;
          color: #6b7280;
        }

        .rm-login-link {
          color: #2aba40;
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

        .rm-login-link:hover { color: #2aba40; text-decoration: underline; }
      `}</style>

      <div className="rm-overlay" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
        <div className="rm-card">
          <div className="rm-top-bar" />
          <div className="rm-body">
            <div className="rm-card-inner">
              {onClose && (
                <button className="rm-close" onClick={onClose} aria-label="Close">
                  ×
                </button>
              )}
              <h1 className="rm-title">Create account</h1>
              <p className="rm-subtitle">Join us today — it's free</p>

              <form onSubmit={handleSubmit}>
                <div className="rm-field">
                  <label className="rm-label" htmlFor="reg-email">Email</label>
                  <div className="rm-input-wrap">
                    <input
                      id="reg-email"
                      className="rm-input"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="rm-field">
                  <label className="rm-label" htmlFor="reg-password">Password</label>
                  <div className="rm-input-wrap">
                    <input
                      id="reg-password"
                      className="rm-input"
                      type="password"
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      required
                      autoComplete="new-password"
                      minLength={8}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="rm-btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><div className="rm-spinner" /> Creating account…</>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>

              <div className="rm-divider">
                <div className="rm-divider-line" />
                <span className="rm-divider-text">or continue with</span>
                <div className="rm-divider-line" />
              </div>

              <button className="rm-btn-google" onClick={handleGoogleSignUp} type="button">
                <svg className="rm-google-icon" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>
            </div>
          </div>

          <div className="rm-footer">
            Have an account?{" "}
            <button className="rm-login-link" onClick={onSwitchToLogin} type="button">
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}