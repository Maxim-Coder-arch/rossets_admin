"use client";

import { useEffect, useState } from "react";
import TemplateContent from "@/app/main/template-content/templateContent";
import Image from "next/image";
import "./index.scss";
import TrashCanIcon from "@/public/icons/trashCan";
import Popup from "@/app/share/popup/popup";

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

interface ILead {
  _id: string;
  name: string;
  contact: string;
  socialLink?: string;
  comment?: string;
  product?: IRosset | IDecor | null;
  status: "new" | "viewed";
  createdAt: string;
  type: "without_goods" | "with_goods" | "with_decor";
}

/* ---------------- PRODUCT CARD (РОЗЕТКА) ---------------- */

const RossetCardLead = ({ rosset }: { rosset: IRosset }) => (
  <div className="lead-rosset-card">
    <div className="lead-rosset-card__image">
      <Image src={rosset.image} alt={rosset.seriesNumber} width={70} height={70} />
    </div>
    <div className="lead-rosset-card__info">
      <h4>{rosset.seriesNumber}</h4>
      <div className="details">
        <span>Диаметр: {rosset.rossetDiameter}см</span>
        <span>Хвосты: {rosset.numberOfTails}</span>
        <span>Длина: {rosset.tailLength}см</span>
      </div>
      <div className="price">{rosset.price} ₽</div>
    </div>
  </div>
);

/* ---------------- DECOR CARD ---------------- */

const DecorCardLead = ({ decor }: { decor: IDecor }) => (
  <div className="lead-rosset-card">
    <div className="lead-rosset-card__image">
      <Image src={decor.mainImage} alt={decor.title} width={70} height={70} />
    </div>
    <div className="lead-rosset-card__info">
      <h4>{decor.title}</h4>
      {decor.description && <p className="decor-description">{decor.description}</p>}
      <div className="details">
        {decor.additionalFields?.slice(0, 2).map((f) => (
          <span key={f.id}>{f.label}: {f.value}</span>
        ))}
      </div>
      <div className="price">{decor.price} ₽ / шт</div>
    </div>
  </div>
);

/* ---------------- LEAD CARD ---------------- */

const LeadCard = ({
  lead,
  onMark,
  onDelete,
  onDeleteRequest,
}: {
  lead: ILead;
  onMark: (id: string) => void;
  onDelete: (id: string, type: ILead["type"]) => void;
  onDeleteRequest: (lead: ILead) => void;
}) => {
  const isDecor = lead.type === "with_decor";
  const isProduct = lead.type === "with_goods";

  return (
    <div className={`lead-card ${lead.status === "viewed" ? "viewed" : ""}`}>
      <div className="lead-card__header">
        <span className="lead-date">{new Date(lead.createdAt).toLocaleString()}</span>
        {lead.status === "new" ? (
          <span className="lead-badge new">Новая</span>
        ) : (
          <button className="delete-lead-btn" onClick={() => onDeleteRequest(lead)}>
            <TrashCanIcon />
          </button>
        )}
      </div>

      <div className="lead-card__info">
        <div className="lead-field"><strong>Имя:</strong> {lead.name}</div>
        <div className="lead-field"><strong>Контакт:</strong> {lead.contact}</div>
        {lead.socialLink && (
          <div className="lead-field"><strong>Соцсеть:</strong> {lead.socialLink}</div>
        )}
        {lead.comment && (
          <div className="lead-field comment"><strong>Комментарий:</strong> {lead.comment}</div>
        )}
      </div>

      {/* ТОВАР (розетка) */}
      {lead.product && isProduct && (
        <div className="lead-card__rosset">
          <div className="rosset-label">Товар:</div>
          <RossetCardLead rosset={lead.product as IRosset} />
        </div>
      )}

      {/* ДЕКОР */}
      {lead.product && isDecor && (
        <div className="lead-card__rosset">
          <div className="rosset-label">Декор:</div>
          <DecorCardLead decor={lead.product as IDecor} />
        </div>
      )}

      {lead.status === "new" && (
        <div className="lead-card__actions">
          <button className="mark-viewed-btn" onClick={() => onMark(lead._id)}>
            ✓ Отметить как просмотренную
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------------- COLUMN ---------------- */

const Column = ({
  title,
  data,
  onMark,
  onDelete,
  onDeleteRequest,
}: {
  title: string;
  data: ILead[];
  onMark: (id: string) => void;
  onDelete: (id: string, type: ILead["type"]) => void;
  onDeleteRequest: (lead: ILead) => void;
}) => (
  <div className="leads-column">
    <div className="leads-column__header">
      <h2>{title}</h2>
      <span className="count">{data.length}</span>
    </div>

    <div className="leads-column__content">
      {data.length === 0 ? (
        <div className="empty-leads">Нет заявок</div>
      ) : (
        data.map((lead) => (
          <LeadCard
            key={lead._id}
            lead={lead}
            onMark={onMark}
            onDelete={onDelete}
            onDeleteRequest={onDeleteRequest}
          />
        ))
      )}
    </div>
  </div>
);

/* ---------------- PAGE ---------------- */

const Leads = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(true);
  const [leadToDelete, setLeadToDelete] = useState<ILead | null>(null);

  useEffect(() => {
    fetch("/api/bids")
      .then((res) => res.json())
      .then((data) => setLeads(data.bids || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const markAsViewed = async (id: string) => {
    try {
      await fetch("/api/bids", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "viewed" }),
      });

      setLeads((prev) =>
        prev.map((l) => (l._id === id ? { ...l, status: "viewed" } : l))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteLead = async (id: string, type: ILead["type"]) => {
    try {
      const res = await fetch("/api/bids", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type }),
      });

      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRequest = (lead: ILead) => {
    setLeadToDelete(lead);
  };

  const confirmDelete = () => {
    if (leadToDelete) {
      deleteLead(leadToDelete._id, leadToDelete.type);
      setLeadToDelete(null);
    }
  };

  if (loading) {
    return (
      <TemplateContent>
        <div className="leads-loading">Загрузка заявок...</div>
      </TemplateContent>
    );
  }

  const newWithout = leads.filter(
    (l) => l.status === "new" && l.type === "without_goods"
  );

  const newWith = leads.filter(
    (l) => l.status === "new" && l.type === "with_goods"
  );

  const newDecor = leads.filter(
    (l) => l.status === "new" && l.type === "with_decor"
  );

  const viewed = leads.filter((l) => l.status === "viewed");

  return (
    <TemplateContent>
      <div className="leads-page">
        <h1 className="leads-page__title">Заявки с сайта</h1>

        <div className="leads-columns">
          <Column 
            title="Обычные" 
            data={newWithout} 
            onMark={markAsViewed} 
            onDelete={deleteLead}
            onDeleteRequest={handleDeleteRequest}
          />
          <Column 
            title="С товаром" 
            data={newWith} 
            onMark={markAsViewed} 
            onDelete={deleteLead}
            onDeleteRequest={handleDeleteRequest}
          />
          <Column 
            title="С декором" 
            data={newDecor} 
            onMark={markAsViewed} 
            onDelete={deleteLead}
            onDeleteRequest={handleDeleteRequest}
          />
          <Column 
            title="Просмотренные" 
            data={viewed} 
            onMark={markAsViewed} 
            onDelete={deleteLead}
            onDeleteRequest={handleDeleteRequest}
          />
        </div>
      </div>

      {leadToDelete && (
        <Popup
          title="Подтвердить удаление"
          text="Вы уверены, что хотите удалить эту заявку? Это действие нельзя отменить."
          onClose={() => setLeadToDelete(null)}
          onConfirm={confirmDelete}
          onCancel={() => setLeadToDelete(null)}
        />
      )}
    </TemplateContent>
  );
};

export default Leads;