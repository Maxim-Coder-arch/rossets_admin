// app/admin/reviews/page.tsx
"use client";

import { useEffect, useState } from "react";
import TemplateContent from "@/app/main/template-content/templateContent";
import "./index.scss";
import TrashCanIcon from "@/public/icons/trashCan";
import LeadIcon from "@/public/icons/lead";

// Тип для отзыва
interface IReview {
  _id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}



// Компонент карточки отзыва
const ReviewCard = ({ review, onDelete }: { review: IReview; onDelete: (id: string) => void }) => {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`star ${i < review.rating ? "filled" : ""}`}>★</span>
  ));


  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__user">
          <span className="review-card__avatar">
            <LeadIcon />
          </span>
          <div>
            <h4 className="review-card__name">{review.name}</h4>
            <div className="review-card__rating">{stars}</div>
          </div>
        </div>
        <div className="review-card__date">
          {new Date(review.createdAt).toLocaleDateString()}
        </div>
      </div>
      
      <p className="review-card__text">{review.text}</p>
      
      <div className="review-card__actions">
        <button className="delete-btn" onClick={() => onDelete(review._id)}>
          <TrashCanIcon />
        </button>
      </div>
    </div>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    text: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.text.trim()) return;

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newReview = await res.json();

      setReviews((prev) => [newReview, ...prev]);

      setFormData({ name: "", rating: 5, text: "" });

    } catch (err) {
      console.error("Ошибка добавления:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить этот отзыв?")) return;

    try {
      await fetch("/api/reviews", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      setReviews((prev) => prev.filter((r) => r._id !== id));

    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();

        setReviews(data.reviews);
      } catch (err) {
        console.error("Ошибка загрузки отзывов:", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <TemplateContent>
      <div className="reviews-page">
        
        <div className="reviews-layout">
          {/* Форма добавления отзыва */}
          <div className="reviews-form-block">
            <div className="reviews-form-block__header">
              <h2>Добавить отзыв</h2>
              <p>Отзыв сразу появится на сайте</p>
            </div>
            
            <form className="add-review-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Имя *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Введите имя"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Оценка *</label>
                <select name="rating" value={formData.rating} onChange={handleChange}>
                  <option value={5}>★★★★★ (5/5)</option>
                  <option value={4}>★★★★☆ (4/5)</option>
                  <option value={3}>★★★☆☆ (3/5)</option>
                  <option value={2}>★★☆☆☆ (2/5)</option>
                  <option value={1}>★☆☆☆☆ (1/5)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Текст отзыва *</label>
                <textarea
                  name="text"
                  placeholder="Расскажите о своём опыте..."
                  value={formData.text}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn">Добавить отзыв</button>
            </form>
          </div>
          
          {/* Список всех отзывов */}
          <div className="reviews-list-block">
            <div className="reviews-list-block__header">
              <h2>Все отзывы</h2>
              <span className="count">Всего: {reviews.length}</span>
            </div>
            
            <div className="reviews-list">
              {reviews.length === 0 ? (
                <div className="empty-reviews">
                  <p>Нет отзывов</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} onDelete={handleDelete} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </TemplateContent>
  );
};

export default Reviews;