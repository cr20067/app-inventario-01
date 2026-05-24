import "./Toast.css";

import { useEffect } from "react";

function Toast({ message, type, visible, onClose, actionText, onAction }) {

  useEffect(() => {

    if (visible) {

      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (

    <div className={`toast ${type} ${visible ? "show" : ""}`}>

      <div className="toast-content">
        <span>{message}</span>

        {actionText && (

          <button
            className="toast-action"
            onClick={() => {

              onAction();

              onClose();
            }}
          >
            {actionText}
          </button>

        )}

      </div>

    </div>
  );
}

export default Toast;