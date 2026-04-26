"use client";

import { useState } from "react";
import TemplateContent from "@/app/main/template-content/templateContent";
import Image from "next/image";
import "./index.scss";
import Popup from "@/app/share/popup/popup";

const AddSeries = () => {
  const [formData, setFormData] = useState({
    seriesTitle: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "image") {
      setPreviewImage(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.seriesTitle.trim()) return;

    try {
      const res = await fetch("/api/series", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setShowSuccessPopup(true);

        setFormData({
          seriesTitle: "",
          image: "",
        });

        setPreviewImage("");
      }
    } catch (err) {
      console.error("Ошибка создания серии:", err);
    }
  };

  return (
    <TemplateContent>
      <div className="add-series">

        <div className="add-series__layout">
          <div className="add-series__form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Название серии *</label>
                <input
                  type="text"
                  name="seriesTitle"
                  placeholder="Например: Ринговая серия"
                  value={formData.seriesTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>URL баннера</label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">Сохранить серию</button>
                <button type="button" className="cancel-btn">Отмена</button>
              </div>
            </form>
          </div>

          <div className="add-series__preview">
            <h3>Превью серии</h3>
            <div className="preview-card">
              <div className="preview-card__image">
                {previewImage ? (
                  <Image src={previewImage} alt="Превью" width={400} height={200} />
                ) : (
                  <div className="preview-card__placeholder">
                    <p>Баннер серии</p>
                  </div>
                )}
              </div>
              <div className="preview-card__info">
                <h4>{formData.seriesTitle || "Название серии"}</h4>
              </div>
            </div>
            <p className="preview-note">
              ID будет сгенерирован автоматически при сохранении
            </p>
          </div>
        </div>
      </div>
      {showSuccessPopup && (
        <Popup
          title="Успешно!"
          text="Серия успешно добавлена в каталог."
          onClose={() => setShowSuccessPopup(false)}
          onConfirm={() => setShowSuccessPopup(false)}
          onCancel={() => setShowSuccessPopup(false)}
          singleButton={true}
        />
      )}
    </TemplateContent>
  );
};

export default AddSeries;