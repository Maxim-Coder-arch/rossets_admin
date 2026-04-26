// app/share/change-rosset-modal/changeRossetModal.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import "./index.scss";
import Portal from "@/app/common/portal";

interface IAdditionalImage {
  url: string;
}

interface IRosset {
  _id: string;
  image: string;
  additionalImages: string[];
  seriesId: string;
  seriesNumber: string;
  rossetSeries: string;
  rossetNumber: number;
  rossetDiameter: number;
  numberOfTails: number;
  tailLength: number;
  comment: string;
  price: number;
}

interface ChangeRossetModalProps {
  rosset: IRosset;
  onClose: () => void;
  onSave: (updatedRosset: IRosset) => void;
}

const ChangeRossetModal = ({ rosset, onClose, onSave }: ChangeRossetModalProps) => {
  const [formData, setFormData] = useState<IRosset>({ ...rosset });
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addAdditionalImage = () => {
    if (!newImageUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      additionalImages: [...prev.additionalImages, newImageUrl.trim()],
    }));
    setNewImageUrl("");
  };

  const removeAdditionalImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/products`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // formData содержит _id
      });

      if (!res.ok) throw new Error("Ошибка при обновлении");

      setSuccess(true);
      onSave(formData);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сервера");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Portal>
      <div className="change-rosset-modal-overlay" onClick={handleOverlayClick}>
        <div className="change-rosset-modal">
          <button className="change-rosset-modal__close" onClick={onClose}>✕</button>
          
          <h2 className="change-rosset-modal__title">Редактирование розетки</h2>

          <div className="change-rosset-modal__layout">
            {/* Левая колонка — оригинальная карточка */}
            <div className="change-rosset-modal__original">
              <h3>До изменений</h3>
              <div className="preview-card">
                <div className="preview-card__image">
                  <Image src={rosset.image} alt={rosset.seriesNumber} width={200} height={200} />
                </div>
                <div className="preview-card__info">
                  <h4>{rosset.seriesNumber}</h4>
                  <div className="details">
                    <span>Диаметр: {rosset.rossetDiameter}см</span>
                    <span>Хвостов: {rosset.numberOfTails}</span>
                    <span>Длина: {rosset.tailLength}см</span>
                  </div>
                  <div className="price">{rosset.price} ₽</div>
                </div>
              </div>
            </div>

            {/* Центральная колонка — форма */}
            <div className="change-rosset-modal__form">
              <h3>Редактировать</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Серия ID</label>
                    <input
                      type="text"
                      name="seriesId"
                      value={formData.seriesId}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Номер розетки</label>
                    <input
                      type="text"
                      name="seriesNumber"
                      value={formData.seriesNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Серия розетки</label>
                    <input
                      type="text"
                      name="rossetSeries"
                      value={formData.rossetSeries}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Номер в серии</label>
                    <input
                      type="number"
                      name="rossetNumber"
                      value={formData.rossetNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Диаметр (см)</label>
                    <input
                      type="number"
                      name="rossetDiameter"
                      value={formData.rossetDiameter}
                      onChange={handleChange}
                      step="0.1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Количество хвостов</label>
                    <input
                      type="number"
                      name="numberOfTails"
                      value={formData.numberOfTails}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Длина хвостов (см)</label>
                    <input
                      type="number"
                      name="tailLength"
                      value={formData.tailLength}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Цена (₽)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Главное изображение (URL)</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Комментарий</label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                {/* Дополнительные изображения */}
                <div className="form-group">
                  <label>Дополнительные изображения</label>
                  <div className="images-list">
                    {formData.additionalImages.map((img, idx) => (
                      <div key={idx} className="image-item">
                        <Image src={img} alt={`Доп ${idx + 1}`} width={40} height={40} />
                        <button type="button" onClick={() => removeAdditionalImage(idx)}>🗑️</button>
                      </div>
                    ))}
                  </div>
                  <div className="add-image">
                    <input
                      type="text"
                      placeholder="URL изображения"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                    <button type="button" onClick={addAdditionalImage}>+</button>
                  </div>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">✅ Розетка обновлена!</div>}

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={onClose}>Отмена</button>
                  <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? "Сохранение..." : "Сохранить"}
                  </button>
                </div>
              </form>
            </div>

            {/* Правая колонка — превью после изменений */}
            <div className="change-rosset-modal__preview">
              <h3>После изменений</h3>
              <div className="preview-card">
                <div className="preview-card__image">
                  <Image src={formData.image || "/placeholder.jpg"} alt={formData.seriesNumber} width={200} height={200} />
                </div>
                <div className="preview-card__info">
                  <h4>{formData.seriesNumber || "Название"}</h4>
                  <div className="details">
                    <span>Диаметр: {formData.rossetDiameter}см</span>
                    <span>Хвостов: {formData.numberOfTails}</span>
                    <span>Длина: {formData.tailLength}см</span>
                  </div>
                  <div className="price">{formData.price} ₽</div>
                  {formData.comment && <p className="comment">{formData.comment}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ChangeRossetModal;