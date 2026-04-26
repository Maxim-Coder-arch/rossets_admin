'use client';

import TemplateContent from "@/app/main/template-content/templateContent"
import RossetCard from "@/app/share/rosset-card/rossetCard";
import "./index.scss";
import { useEffect, useState } from "react";
import Popup from "@/app/share/popup/popup";

const Rossets = () => {
  const [rossets, setRossets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rossetToDelete, setRossetToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchRossets = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setRossets(data.products || data);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRossets();
  }, []);

  const deleteRosset = async (id: string) => {
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setRossets((prev) => prev.filter((item) => item._id !== id));
      } else {
        const error = await res.json();
        console.error("Ошибка удаления:", error);
      }
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  if (loading) {
    return (
      <TemplateContent>
        <div className="rossets-loading">Загрузка...</div>
      </TemplateContent>
    );
  }

  return (
    <TemplateContent>
      <div className="rossets-page">
        <div className="rossets-page__header">
          <p className="rossets-page__count">Всего: {rossets.length}</p>
        </div>
        <div className="rossets-page__grid">
          {rossets.map((rosset, index) => (
            <RossetCard 
              key={rosset._id || index} 
              rosset={rosset} 
              onDelete={setRossetToDelete}
            />
          ))}
        </div>
      </div>

      {/* Попап */}
      {rossetToDelete && (
        <Popup
          title="Подтвердить удаление"
          text="Вы уверены, что хотите удалить эту розетку?"
          onClose={() => setRossetToDelete(null)}
          onConfirm={() => {
            deleteRosset(rossetToDelete);
            setRossetToDelete(null);
          }}
          onCancel={() => setRossetToDelete(null)}
        />
      )}
    </TemplateContent>
  );
};

export default Rossets;