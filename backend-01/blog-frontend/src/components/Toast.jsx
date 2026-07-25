import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className={`toast ${toast.type}`}>
        {toast.type === "success" ? (
          <CheckCircle2 size={18} color="#10b981" />
        ) : (
          <AlertCircle size={18} color="#ef4444" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
