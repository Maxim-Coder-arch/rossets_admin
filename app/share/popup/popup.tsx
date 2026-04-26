"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import "./index.scss";

interface IPopupProps {
  title: string;
  text: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  singleButton?: boolean;
}

const Popup = ({
  title,
  text,
  onClose,
  onConfirm,
  onCancel,
  singleButton = false,
}: IPopupProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <motion.div 
      initial={{opacity: 0, y: 100}}
      animate={{opacity: 1, y: 0}}
      className="popup-window">
        <button className="popup-window__close" onClick={onClose}>✕</button>
        <h2 className="popup-window__title">{title}</h2>
        <p className="popup-window__text">{text}</p>
        <div className="popup-window__actions">
          {!singleButton && <button className="popup-window__actions__btn popup-btn--cancel" onClick={handleCancel}>
            Отмена
          </button>}
          <button className={`popup-window__actions__btn ${!singleButton ? "popup-btn--confirm" : "message-btn"}`} onClick={handleConfirm}>
            {singleButton ? "Понятно" : "Удалить"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Popup;