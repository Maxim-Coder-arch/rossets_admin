"use client";

import { useEffect, useState } from "react";
import TemplateContent from "@/app/main/template-content/templateContent";
import TrashCanIcon from "@/public/icons/trashCan";
import "./index.scss";

const initialData = {
  stats: {
    users: {
      day: 0,
      week: 0,
      month: 0,
      year: 0,
    },
    totalRosset: 0,
  },
  recentOrders: [],
  notes: [],
  quickActions: [
    { id: "viewOrders", label: "Заказы", link: "/admin/orders", color: "accent-orange" },
    { id: "reviews", label: "Отзывы", link: "/admin/orders", color: "accent-orange" },
    { id: "all_rossets", label: "Все розетки", link: "/admin/orders", color: "accent-orange" },
    { id: "all_series", label: "Все серии", link: "/admin/orders", color: "accent-orange" },
    { id: "newRosset", label: "Новая розетка", link: "/admin/rossets/new", color: "accent-blue" },
  ],
};

const AdminDashboard = () => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");

  const addNote = async () => {
    if (!newNote.trim()) return;

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newNote }),
      });

      const dataRes = await res.json();

      setData((prev) => ({
        ...prev,
        notes: [
          {
            id: dataRes.note._id,
            text: dataRes.note.text,
            completed: false,
            createdAt: dataRes.note.createdAt,
          },
          ...prev.notes,
        ],
      }));

      setNewNote("");
    } catch (err) {
      console.error("Ошибка добавления:", err);
    }
  };

  const toggleNote = async (id: string, current: boolean) => {
    try {
      await fetch("/api/notes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, completed: !current }),
      });

      setData((prev) => ({
        ...prev,
        notes: prev.notes.map((note) =>
          note.id === id ? { ...note, completed: !current } : note
        ),
      }));
    } catch (err) {
      console.error("Ошибка обновления:", err);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await fetch("/api/notes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setData((prev) => ({
        ...prev,
        notes: prev.notes.filter((note) => note.id !== id),
      }));
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "новый":
        return "status-new";
      case "в обработке":
        return "status-processing";
      case "отправлен":
        return "status-sent";
      case "доставлен":
        return "status-delivered";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, productsRes, notesRes, ordersRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/products/count"),
          fetch("/api/notes"),
          fetch("/api/orders/recent"),
        ]);

        const [stats, products, notesData, ordersData] = await Promise.all([
          statsRes.json(),
          productsRes.json(),
          notesRes.json(),
          ordersRes.json(),
        ]);

        setData((prev) => ({
          ...prev,
          stats: {
            users: stats.users,
            totalRosset: products.count,
          },
          notes: notesData.notes.map((note: any) => ({
            id: note._id,
            text: note.text,
            completed: note.completed,
            createdAt: note.createdAt,
          })),
          recentOrders: ordersData.orders.map((order: any, index: number) => ({
            id: order._id || index,
            customer: order.name,
            amount: "",
            status: "новый",
            date: new Date(order.createdAt).toLocaleDateString(),
          })),
        }));
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TemplateContent>
      <div className="admin-dashboard">
        <div className="glass-card users-stats">
          <div className="card-header">
            <h3>Пользователи</h3>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">За день</span>
              <span className="stat-value">{data.stats.users.day}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">За неделю</span>
              <span className="stat-value">{data.stats.users.week}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">За месяц</span>
              <span className="stat-value">{data.stats.users.month}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">За год</span>
              <span className="stat-value">{data.stats.users.year}</span>
            </div>
          </div>
        </div>

        <div className="glass-card total-rossets">
          <div className="card-header">
            <h3>Всего розеток</h3>
          </div>
          <div className="total-value">{data.stats.totalRosset}</div>
          <p className="total-sub">в каталоге</p>
        </div>

        <div className="glass-card recent-orders">
          <div className="card-header">
            <h3>Новые заказы</h3>
            <a href="/admin/orders" className="view-all">Все заказы →</a>
          </div>
          <div className="orders-list">
            {data.recentOrders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-info">
                  <span className="order-customer">{order.customer}</span>
                  <span className="order-date">{order.date}</span>
                </div>
                <div className="order-details">
                  <span className="order-amount">{order.amount}</span>
                  <span className={`order-status ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card notes">
          <div className="card-header">
            <h3>Заметки</h3>
          </div>
          <div className="add-note">
            <input
              type="text"
              placeholder="Добавить заметку..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNote()}
            />
            <button onClick={addNote}>+</button>
          </div>
          <div className="notes-list">
            {data.notes.map((note) => (
              <div key={note.id} className={`note-item ${note.completed ? "completed" : ""}`}>
                <input
                  type="checkbox"
                  checked={note.completed}
                  onChange={() => toggleNote(note.id, note.completed)}
                />
                <span className="note-text">{note.text}</span>
                <button className="delete-note" onClick={() => deleteNote(note.id)}>
                  <TrashCanIcon />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card quick-actions">
          <div className="card-header">
            <h3>Быстрые действия</h3>
          </div>
          <div className="actions-grid">
            {data.quickActions.map((action) => (
              <a key={action.id} href={action.link} className={`action-btn ${action.color}`}>
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </TemplateContent>
  );
};

export default AdminDashboard;