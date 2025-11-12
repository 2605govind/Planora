import { useState, useRef, useEffect } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function OtpOnly() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: success | error | info

  // demo expected OTP (in real app don't store like this)
  const [expectedOtp, setExpectedOtp] = useState(null);

  useEffect(() => {
    let id;
    if (resendTimer > 0) {
      id = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(id);
  }, [resendTimer]);

  const clearMessage = () => setMessage({ text: "", type: "" });

  const handleSendOtp = async () => {
    if (resendTimer > 0) return;
    clearMessage();
    setLoading(true);

    // FAKE API send (replace with real call)
    setTimeout(() => {
      setLoading(false);
      setResendTimer(60); // 60 seconds cooldown
      setExpectedOtp("123456"); // demo only
      setMessage({ text: "OTP sent. Check your device.", type: "success" });
      setOtp(Array(6).fill(""));
      // focus first input after sending
      setTimeout(() => inputsRef.current[0]?.focus(), 50);
    }, 900);
  };

  const handleOtpChange = (index, val) => {
    if (!/^\d?$/.test(val)) return; // allow only single digit or empty
    const next = [...otp];
    next[index] = val;
    setOtp(next);
    if (val && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = (e) => {
    e?.preventDefault();
    clearMessage();
    const code = otp.join("");
    if (code.length < 6) {
      setMessage({ text: "Enter 6 digits.", type: "error" });
      return;
    }

    setLoading(true);
    // FAKE verify (replace with real call)
    setTimeout(() => {
      setLoading(false);
      if (expectedOtp && code === expectedOtp) {
        setMessage({ text: "OTP verified successfully!", type: "success" });
      } else {
        setMessage({ text: "Invalid OTP. Try again.", type: "error" });
      }
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-center mb-4">Enter OTP</h3>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex justify-center gap-2">
            {otp.map((d, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                value={d}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`OTP digit ${idx + 1}`}
              />
            ))}
          </div>

          {/* verify button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? <><Loader2 className="animate-spin w-4 h-4" /> Verifying...</> : "Verify OTP"}
          </button>

          {/* send / resend */}
          <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={resendTimer > 0 || loading}
              className="underline disabled:opacity-50"
            >
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Send OTP"}
            </button>
          </div>

          {/* message */}
          {message.text && (
            <div
              className={`mt-2 flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 text-green-700"
                  : message.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle size={16} />
              ) : message.type === "error" ? (
                <AlertCircle size={16} />
              ) : (
                <Loader2 size={14} className="animate-spin" />
              )}
              <span>{message.text}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
