import { useEffect, useRef } from "react";
import "./Modal.css";

export default function Modal({ isOpen, onClose, title, children, maxWidth }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal active"
      ref={overlayRef}
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        className="modal-content"
        style={maxWidth ? { maxWidth } : undefined}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button className="modal-close" aria-label="Close dialog" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
