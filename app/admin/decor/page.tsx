// app/admin/decor/page.tsx
"use client";

import { useEffect, useState } from "react";
import TemplateContent from "@/app/main/template-content/templateContent";
import Image from "next/image";
import "./index.scss";
import TrashCanIcon from "@/public/icons/trashCan";
import ArrowBottomIcon from "@/public/icons/arrowBottom";
import ArrowRightIcon from "@/public/icons/arrowRight";
import Popup from "@/app/share/popup/popup";

interface IAdditionalField {
  id: number;
  label: string;
  value: string;
}

interface IDecor {
  _id: string;
  title: string;
  description: string;
  price: number;
  mainImage: string;
  additionalImages: string[];
  additionalFields: IAdditionalField[];
  createdAt: string;
}

// Компонент карточки декора (для списка)
const DecorCard = ({ decor, onDelete, onToggle }: { 
  decor: IDecor; 
  onDelete: (id: string) => void; 
  onToggle: (id: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle(decor._id);
  };

  return (
    <div className={`decor-list-card ${isExpanded ? "expanded" : ""}`}>
      <div className="decor-list-card__header" onClick={handleToggle}>
        <div className="decor-list-card__preview">
          <Image src={decor.mainImage} alt={decor.title} width={50} height={50} />
        </div>
        <div className="decor-list-card__info">
          <h4>{decor.title}</h4>
          <span className="decor-price">{decor.price} ₽ / шт</span>
        </div>
        <div className="decor-list-card__actions">
          <button className="toggle-btn">{isExpanded ? <ArrowRightIcon /> : <ArrowBottomIcon />}</button>
          <button className="delete-btn" onClick={(e) => {
            e.stopPropagation();
            onDelete(decor._id);
          }}>
            <TrashCanIcon />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="decor-list-card__content">
          <div className="decor-list-card__description">
            <strong>Описание:</strong> {decor.description}
          </div>
          {decor.additionalFields.length > 0 && (
            <div className="decor-list-card__fields">
              <strong>Характеристики:</strong>
              <ul>
                {decor.additionalFields.map((field) => (
                  <li key={field.id}>
                    <span>{field.label}:</span> {field.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {decor.additionalImages.length > 0 && (
            <div className="decor-list-card__images">
              <strong>Дополнительные фото:</strong>
              <div className="images-grid">
                {decor.additionalImages.map((img, idx) => (
                  <Image key={idx} src={img} alt={`${decor.title} ${idx + 1}`} width={60} height={60} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Decor = () => {
  // Форма
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    mainImage: "",
  });
  
  // Дополнительные характеристики
  const [additionalFields, setAdditionalFields] = useState<IAdditionalField[]>([]);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const [decorToDelete, setDecorToDelete] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // Дополнительные изображения
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  
  // Превью
  const [previewImage, setPreviewImage] = useState("");

  // Список декоров (потом из БД)
  const [decors, setDecors] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "mainImage") {
      setPreviewImage(value);
    }
  };

  useEffect(() => {
    fetch("/api/decors")
      .then(res => res.json())
      .then(data => setDecors(data.decors))
      .catch(console.error);
  }, []);
  // Добавление характеристики
  const addAdditionalField = () => {
    if (!newFieldLabel.trim() || !newFieldValue.trim()) return;
    setAdditionalFields([
      ...additionalFields,
      { id: Date.now(), label: newFieldLabel, value: newFieldValue },
    ]);
    setNewFieldLabel("");
    setNewFieldValue("");
  };

  const removeAdditionalField = (id: number) => {
    setAdditionalFields(additionalFields.filter((f) => f.id !== id));
  };

  // Добавление дополнительного изображения
  const addAdditionalImage = () => {
    if (!newImageUrl.trim()) return;
    setAdditionalImages([...additionalImages, newImageUrl]);
    setNewImageUrl("");
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  // Удаление декора
  const handleDeleteDecor = async (id: string) => {
    setDecorToDelete(id);
  };

  const confirmDeleteDecor = async () => {
    if (!decorToDelete) return;
    
    try {
      const res = await fetch("/api/decors", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: decorToDelete }),
      });

      if (!res.ok) {
        throw new Error("Ошибка удаления декора");
      }

      setDecors((prev) => prev.filter((d) => d._id !== decorToDelete));
      setDecorToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Ошибка удаления");
    }
  };

  // Превью для карточки
  const previewDecor = {
    title: formData.title || "Название декора",
    description: formData.description || "Описание появится здесь",
    price: formData.price || "0",
    mainImage: previewImage || "",
    additionalImages: additionalImages,
    additionalFields: additionalFields,
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

    try {
      const res = await fetch("/api/decors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          mainImage: formData.mainImage,
          additionalImages,
          additionalFields,
        }),
      });

      if (!res.ok) {
        throw new Error("Ошибка создания декора");
      }

      const data = await res.json();

      // обновляем список
      setDecors((prev) => [data.decor, ...prev]);

      // очищаем форму
      setFormData({
        title: "",
        description: "",
        price: "",
        mainImage: "",
      });

      setAdditionalImages([]);
      setAdditionalFields([]);
      setPreviewImage("");
      setShowSuccessPopup(true);

    } catch (err) {
      console.error(err);
      alert("Не удалось создать декор");
    }
  };

  return (
    <TemplateContent>
      <div className="decor-page">

        {/* Три колонки */}
        <div className="decor-page__layout">
          {/* Левая колонка — превью */}
          <div className="decor-preview">
            <h3>Превью карточки</h3>
            <div className="preview-card">
              <div className="preview-card__image">
                {previewDecor.mainImage ? (
                  <Image src={previewDecor.mainImage} alt="Превью" width={400} height={200} />
                ) : (
                  <div className="preview-placeholder">
                    <p>Баннер</p>
                  </div>
                )}
              </div>
              <div className="preview-card__info">
                <h4>{previewDecor.title}</h4>
                <p className="preview-description">{previewDecor.description}</p>
                {previewDecor.additionalFields.length > 0 && (
                  <div className="preview-fields">
                    {previewDecor.additionalFields.map((field) => (
                      <div key={field.id} className="preview-field">
                        <span className="field-label">{field.label}:</span>
                        <span className="field-value">{field.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="preview-price">{previewDecor.price} ₽ / шт</div>
              </div>
            </div>
            {previewDecor.additionalImages.length > 0 && (
              <div className="preview-images">
                <strong>Доп. фото:</strong>
                <div className="preview-images__list">
                  {previewDecor.additionalImages.map((img, idx) => (
                    <Image key={idx} src={img} alt={`Доп ${idx + 1}`} width={60} height={60} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Средняя колонка — форма */}
          <div className="decor-form">
            <h3>Добавление декора</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Название декора *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Например: Розочка из атласа"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Описание</label>
                <textarea
                  name="description"
                  placeholder="Краткое описание декора..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Цена (₽ за штуку) *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="12"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Главное изображение (URL)</label>
                <input
                  type="text"
                  name="mainImage"
                  placeholder="https://..."
                  value={formData.mainImage}
                  onChange={handleChange}
                />
              </div>

              {/* Дополнительные характеристики */}
              <div className="form-group">
                <label>Дополнительные характеристики</label>
                <div className="fields-list">
                  {additionalFields.map((field) => (
                    <div key={field.id} className="field-item">
                      <span className="field-label">{field.label}:</span>
                      <span className="field-value">{field.value}</span>
                      <button type="button" onClick={() => removeAdditionalField(field.id)}>✕</button>
                    </div>
                  ))}
                </div>
                <div className="add-field">
                  <input
                    type="text"
                    placeholder="Название (например: Материал)"
                    value={newFieldLabel}
                    onChange={(e) => setNewFieldLabel(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Значение (например: Атлас)"
                    value={newFieldValue}
                    onChange={(e) => setNewFieldValue(e.target.value)}
                  />
                  <button type="button" onClick={addAdditionalField}>+</button>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">Сохранить декор</button>
              </div>
            </form>
          </div>

          {/* Правая колонка — дополнительные изображения */}
          <div className="decor-images">
            <h3>Дополнительные изображения</h3>
            <div className="add-image-input">
              <input
                type="text"
                placeholder="URL изображения"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
              <button type="button" onClick={addAdditionalImage}>+</button>
            </div>
            <div className="images-list">
              {additionalImages.length === 0 ? (
                <div className="empty-images">Нет дополнительных изображений</div>
              ) : (
                additionalImages.map((img, idx) => (
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

        {/* Список декоров */}
        <div className="decor-list">
          <div className="decor-list__header">
            <h3>Список декоров</h3>
            <span className="decor-count">Всего: {decors.length}</span>
          </div>
          <div className="decor-list__content">
            {decors.length === 0 ? (
              <div className="empty-decor">Нет добавленных декоров</div>
            ) : (
              decors.map((decor) => (
                <DecorCard
                  key={decor._id}
                  decor={decor}
                  onDelete={setDecorToDelete}
                  onToggle={() => {}}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {decorToDelete && (
        <Popup 
          title="Подтвердить удаление"
          text="Вы уверены, что хотите удалить этот декор?"
          onClose={() => setDecorToDelete(null)}
          onConfirm={confirmDeleteDecor}
          onCancel={() => setDecorToDelete(null)}
        />
      )}
      {showSuccessPopup && (
        <Popup
          title="Успешно!"
          text="Декор успешно добавлен в каталог."
          onClose={() => setShowSuccessPopup(false)}
          onConfirm={() => setShowSuccessPopup(false)}
          onCancel={() => setShowSuccessPopup(false)}
          singleButton={true}
        />
      )}
    </TemplateContent>
  );
};

export default Decor;