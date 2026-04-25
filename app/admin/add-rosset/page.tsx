"use client";

import { useState } from "react";
import TemplateContent from "@/app/main/template-content/templateContent";
import { adminSeriesList } from "@/data/seriesList";
import Image from "next/image";
import TrashCanIcon from "@/public/icons/trashCan";
import "./index.scss";
import PlusIcon from "@/public/icons/plus";

const AddRosset = () => {
  const [formData, setFormData] = useState({
    image: "",
    additionalImages: [] as string[],
    seriesId: "",
    seriesNumber: "",
    rossetSeries: "",
    rossetNumber: "",
    rossetDiameter: "",
    numberOfTails: "",
    tailLength: "",
    comment: "",
    price: "",
  });

  const [additionalImageInput, setAdditionalImageInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addAdditionalImage = () => {
    if (additionalImageInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        additionalImages: [...prev.additionalImages, additionalImageInput.trim()],
      }));
      setAdditionalImageInput("");
    }
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

    // защита от двойного клика
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = {
        image: formData.image || "",
        additionalImages: formData.additionalImages || [],
        seriesId: formData.seriesId,
        seriesNumber: formData.seriesNumber,
        rossetSeries: formData.rossetSeries || "",
        rossetNumber: Number(formData.rossetNumber) || 0,
        rossetDiameter: Number(formData.rossetDiameter),
        numberOfTails: Number(formData.numberOfTails),
        tailLength: Number(formData.tailLength),
        comment: formData.comment || "",
        price: Number(formData.price),
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Ошибка при создании розетки");
      }

      const data = await res.json();

      setSuccess(true);

      // очистка формы
      setFormData({
        image: "",
        additionalImages: [],
        seriesId: "",
        seriesNumber: "",
        rossetSeries: "",
        rossetNumber: "",
        rossetDiameter: "",
        numberOfTails: "",
        tailLength: "",
        comment: "",
        price: "",
      });

      setAdditionalImageInput("");

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ошибка сервера");
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewRosset = {
    image: formData.image || "/placeholder.jpg",
    seriesNumber: formData.seriesNumber || "ER_00/0",
    rossetDiameter: Number(formData.rossetDiameter) || 0,
    numberOfTails: Number(formData.numberOfTails) || 0,
    tailLength: Number(formData.tailLength) || 0,
    price: Number(formData.price) || 0,
    comment: formData.comment || "",
  };

  return (
    <TemplateContent>
      <div className="add-rosset">
        <div className="add-rosset__layout">
          <div className="add-rosset__preview">
            <div className="preview-card">
              <div className="preview-card__image">
                <Image src={previewRosset.image} alt="preview" width={300} height={300} />
              </div>
              <div className="preview-card__info">
                <h3 className="preview-card__title">{previewRosset.seriesNumber}</h3>
                <div className="preview-card__details">
                  <span>Диаметр: {previewRosset.rossetDiameter}см</span>
                  <span>Количество хвостов: {previewRosset.numberOfTails}</span>
                  <span>Длина хвостов: {previewRosset.tailLength}см</span>
                </div>
                {previewRosset.comment && (
                  <p className="preview-card__comment">{previewRosset.comment}</p>
                )}
                <div className="preview-card__price">{previewRosset.price} ₽</div>
              </div>
            </div>
          </div>

          <div className="add-rosset__form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Серия *</label>
                <select name="seriesId" value={formData.seriesId} onChange={handleChange} required>
                  <option value="">Выберите серию</option>
                  {adminSeriesList.map((series) => (
                    <option key={series.id} value={series.id}>
                      {series.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Номер розетки *</label>
                  <input
                    type="text"
                    name="seriesNumber"
                    placeholder="ER_11/1"
                    value={formData.seriesNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Серия розетки</label>
                  <input
                    type="text"
                    name="rossetSeries"
                    placeholder="ER_11"
                    value={formData.rossetSeries}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Номер в серии</label>
                  <input
                    type="number"
                    name="rossetNumber"
                    placeholder="1"
                    value={formData.rossetNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Диаметр (см) *</label>
                  <input
                    type="number"
                    name="rossetDiameter"
                    placeholder="15"
                    value={formData.rossetDiameter}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Количество хвостов *</label>
                  <input
                    type="number"
                    name="numberOfTails"
                    placeholder="5"
                    value={formData.numberOfTails}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Длина хвостов (см) *</label>
                  <input
                    type="number"
                    name="tailLength"
                    placeholder="40"
                    value={formData.tailLength}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Цена (₽) *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="1000"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Главное изображение (URL)</label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Комментарий / описание</label>
                <textarea
                  name="comment"
                  placeholder="Краткое описание розетки..."
                  value={formData.comment}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <button type="submit" className="submit-btn">Сохранить</button>
            </form>
          </div>

          <div className="add-rosset__images">
            <h3>Дополнительные изображения</h3>
            <div className="add-image-input">
              <input
                type="text"
                placeholder="URL изображения"
                value={additionalImageInput}
                onChange={(e) => setAdditionalImageInput(e.target.value)}
              />
              <button type="button" onClick={addAdditionalImage}>
                <PlusIcon />
              </button>
            </div>
            <div className="images-list">
              {formData.additionalImages.length === 0 ? (
                <p className="empty-images">Нет дополнительных изображений</p>
              ) : (
                formData.additionalImages.map((img, idx) => (
                  <div key={idx} className="image-item">
                    <Image src={img} alt={`Доп. ${idx + 1}`} width={60} height={60} />
                    <button onClick={() => removeAdditionalImage(idx)}>
                      <TrashCanIcon />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </TemplateContent>
  );
};

export default AddRosset;