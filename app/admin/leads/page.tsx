"use client";

import { useEffect, useState } from "react";
import TemplateContent from "@/app/main/template-content/templateContent";
import Image from "next/image";
import "./index.scss";

/* ---------------- TYPES ---------------- */

interface IRosset {
  _id: string;
  image: string;
  seriesNumber: string;
  rossetDiameter: number;
  numberOfTails: number;
  tailLength: number;
  price: number;
}

interface ILead {
  _id: string;
  name: string;
  contact: string;
  socialLink?: string;
  comment?: string;
  product?: IRosset | null;
  status: "new" | "viewed";
  createdAt: string;
}

/* ---------------- PRODUCT CARD ---------------- */

const RossetCardLead = ({ rosset }: { rosset: IRosset }) => {
  return (
    <div className="lead-rosset-card">
      <div className="lead-rosset-card__image">
        <Image src={rosset.image} alt={rosset.seriesNumber} width={70} height={70} />
      </div>
      <div className="lead-rosset-card__info">
        <h4>{rosset.seriesNumber}</h4>
        <div className="details">
          <span>Диаметр розетки: {rosset.rossetDiameter}см</span>
          <span>Количество хвостов: {rosset.numberOfTails}</span>
          <span>Длина хвостов: {rosset.tailLength}см</span>
        </div>
        <div className="price">{rosset.price} ₽</div>
      </div>
    </div>
  );
};

/* ---------------- LEAD CARD ---------------- */

const LeadCard = ({
  lead,
  onMarkAsViewed,
}: {
  lead: ILead;
  onMarkAsViewed: (id: string) => void;
}) => {
  return (
    <div className={`lead-card ${lead.status === "viewed" ? "viewed" : ""}`}>
      <div className="lead-card__header">
        <span className="lead-date">{new Date(lead.createdAt).toLocaleString()}</span>
        {lead.status === "new" && <span className="lead-badge new">Новая</span>}
      </div>

      <div className="lead-card__info">
        <div className="lead-field">
          <strong>Имя:</strong> {lead.name}
        </div>
        <div className="lead-field">
          <strong>Контакт:</strong> {lead.contact}
        </div>
        {lead.socialLink && (
          <div className="lead-field">
            <strong>Соцсеть:</strong> {lead.socialLink}
          </div>
        )}
        {lead.comment && (
          <div className="lead-field comment">
            <strong>Комментарий:</strong> {lead.comment}
          </div>
        )}
      </div>

      {lead.product && (
        <div className="lead-card__rosset">
          <div className="rosset-label">Товар:</div>
          <RossetCardLead rosset={lead.product} />
        </div>
      )}

      {lead.status === "new" && (
        <div className="lead-card__actions">
          <button className="mark-viewed-btn" onClick={() => onMarkAsViewed(lead._id)}>
            Отметить как просмотренную
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------------- PAGE ---------------- */

const Leads = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("/api/bids");
        const data = await res.json();
        setLeads(data.bids || []);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const markAsViewed = async (id: string) => {
    try {
      await fetch("/api/bids", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "viewed" }),
      });
      setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status: "viewed" } : l)));
    } catch (err) {
      console.error(err);
    }
  };

  const newWithoutProduct = leads.filter((l) => l.status === "new" && !l.product);
  const newWithProduct = leads.filter((l) => l.status === "new" && l.product);
  const viewed = leads.filter((l) => l.status === "viewed");

  if (loading) {
    return (
      <TemplateContent>
        <div className="leads-loading">Загрузка заявок...</div>
      </TemplateContent>
    );
  }

  return (
    <TemplateContent>
      <div className="leads-page">

        <div className="leads-columns">
          {/* Колонка 1: Обычные заявки */}
          <div className="leads-column">
            <div className="leads-column__header">
              <h2>Обычные заявки</h2>
              <span className="count">{newWithoutProduct.length}</span>
            </div>
            <div className="leads-column__content">
              {newWithoutProduct.length === 0 ? (
                <div className="empty-leads">Нет новых заявок</div>
              ) : (
                newWithoutProduct.map((lead) => (
                  <LeadCard key={lead._id} lead={lead} onMarkAsViewed={markAsViewed} />
                ))
              )}
            </div>
          </div>

          {/* Колонка 2: Заявки с товаром */}
          <div className="leads-column">
            <div className="leads-column__header">
              <h2>Заявки с товаром</h2>
              <span className="count">{newWithProduct.length}</span>
            </div>
            <div className="leads-column__content">
              {newWithProduct.length === 0 ? (
                <div className="empty-leads">Нет заявок с товаром</div>
              ) : (
                newWithProduct.map((lead) => (
                  <LeadCard key={lead._id} lead={lead} onMarkAsViewed={markAsViewed} />
                ))
              )}
            </div>
          </div>

          {/* Колонка 3: Просмотренные заявки */}
          <div className="leads-column">
            <div className="leads-column__header">
              <h2>Просмотренные</h2>
              <span className="count">{viewed.length}</span>
            </div>
            <div className="leads-column__content">
              {viewed.length === 0 ? (
                <div className="empty-leads">Нет просмотренных заявок</div>
              ) : (
                viewed.map((lead) => (
                  <LeadCard key={lead._id} lead={lead} onMarkAsViewed={markAsViewed} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </TemplateContent>
  );
};

export default Leads;