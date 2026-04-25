"use client";

import { useState } from "react";
import TemplateContent from "../main/template-content/templateContent";

const AdminDashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateMessage, setGenerateMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const generateTestProducts = async () => {
    if (
      !confirm(
        "Это действие удалит все существующие розетки и создаст 340 новых (68 серий × 5 розеток). Продолжить?",
      )
    ) {
      return;
    }

    setIsGenerating(true);
    setGenerateMessage(null);

    try {
      const response = await fetch("/api/generate-products", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setGenerateMessage({ type: "success", text: data.message });
      } else {
        setGenerateMessage({
          type: "error",
          text: data.error || "Ошибка при генерации",
        });
      }
    } catch (error) {
      setGenerateMessage({
        type: "error",
        text: "Ошибка соединения с сервером",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const [isGeneratingReviews, setIsGeneratingReviews] = useState(false);
const [generateReviewsMessage, setGenerateReviewsMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

const generateTestReviews = async () => {
  if (!confirm("Это действие удалит все существующие отзывы и создаст новые (15-30 штук). Продолжить?")) {
    return;
  }
  
  setIsGeneratingReviews(true);
  setGenerateReviewsMessage(null);
  
  try {
    const response = await fetch("/api/generate-reviews", {
      method: "POST",
    });
    
    const data = await response.json();
    
    if (response.ok) {
      setGenerateReviewsMessage({ type: "success", text: data.message });
    } else {
      setGenerateReviewsMessage({ type: "error", text: data.error || "Ошибка при генерации" });
    }
  } catch (error) {
    setGenerateReviewsMessage({ type: "error", text: "Ошибка соединения с сервером" });
  } finally {
    setIsGeneratingReviews(false);
  }
};

  return (
    <TemplateContent>
      <div className="admin-dashboard">
        {/* ... существующие карточки ... */}

        {/* Карточка с генерацией тестовых данных */}
        <div className="glass-card generate-section">
          <div className="card-header">
            <h3>🔄 Генерация тестовых данных</h3>
          </div>
          <div className="generate-content">
            <p>Создать 340 тестовых розеток (по 5 на каждую из 68 серий)</p>
            <button
              onClick={generateTestProducts}
              disabled={isGenerating}
              className="generate-btn"
            >
              {isGenerating ? "Генерация..." : "🎲 Сгенерировать розетки"}
            </button>
            {generateMessage && (
              <div className={`generate-message ${generateMessage.type}`}>
                {generateMessage.text}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass-card generate-reviews-section">
  <div className="card-header">
    <h3>⭐ Генерация отзывов</h3>
  </div>
  <div className="generate-content">
    <p>Создать 15-30 случайных отзывов для тестирования</p>
    <button 
      onClick={generateTestReviews} 
      disabled={isGeneratingReviews}
      className="generate-btn"
    >
      {isGeneratingReviews ? "Генерация..." : "🎲 Сгенерировать отзывы"}
    </button>
    {generateReviewsMessage && (
      <div className={`generate-message ${generateReviewsMessage.type}`}>
        {generateReviewsMessage.text}
      </div>
    )}
  </div>
</div>
    </TemplateContent>
  );
};

export default AdminDashboard;
