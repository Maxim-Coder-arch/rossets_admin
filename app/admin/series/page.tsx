"use client";

import { useEffect, useState } from "react";
import TemplateContent from "@/app/main/template-content/templateContent";
import SeriesFolder from "@/app/share/series-folder/seriesFolder";
import "./index.scss";
import Popup from "@/app/share/popup/popup";

interface ISeries {
  _id: string;
  seriesId: string;
  seriesTitle: string;
  image: string;
}

interface IProduct {
  _id: string;
  seriesId: string;
  seriesNumber: string;
  price: number;
  image: string;
}

const Series = () => {
  const [openSeriesId, setOpenSeriesId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [series, setSeries] = useState<ISeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [seriesToDelete, setSeriesToDelete] = useState<string | null>(null);
  const [rossetToDelete, setRossetToDelete] = useState<{ id: string; seriesId: string } | null>(null);

  const toggleSeries = (id: string) => {
    setOpenSeriesId((prev) => (prev === id ? null : id));
  };

  // Загружаем и серии, и продукты параллельно
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [seriesRes, productsRes] = await Promise.all([
          fetch("/api/series"),
          fetch("/api/products"),
        ]);

        const seriesData = await seriesRes.json();
        const productsData = await productsRes.json();

        setSeries(Array.isArray(seriesData) ? seriesData : seriesData.series || []);
        setProducts(Array.isArray(productsData) ? productsData : productsData.products || []);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Фильтрация серий
  const filteredSeries = series.filter((s) =>
    s.seriesTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Группировка продуктов по seriesId
  const productsBySeries = products.reduce((acc: Record<string, IProduct[]>, product) => {
    const key = String(product.seriesId);
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
  }, {});

  // Удаление серии
  const handleDeleteSeries = async (id: string) => {
    try {
      const res = await fetch("/api/series", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setSeries((prev) => prev.filter((item) => item._id !== id));
        setProducts((prev) => prev.filter((p) => p.seriesId !== id));
      } else {
        const error = await res.json();
        console.error("Ошибка удаления:", error);
      }
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  // Удаление розетки
  const handleDeleteRosset = async (id: string, seriesId: string) => {
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        // Удаляем розетку из состояния
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        const error = await res.json();
        console.error("Ошибка удаления розетки:", error);
      }
    } catch (err) {
      console.error("Ошибка удаления розетки:", err);
    }
  };

  // Функция для запроса на удаление розетки (вызывается из SeriesFolder)
  const requestDeleteRosset = (id: string, seriesId: string) => {
    setRossetToDelete({ id, seriesId });
  };

  if (loading) {
    return (
      <TemplateContent>
        <div className="series-loading">Загрузка...</div>
      </TemplateContent>
    );
  }

  return (
    <TemplateContent>
      <div className="series-page">
        <div className="series-page__header">
          <p className="subtitle">
            Всего серий: {series.length} | Всего товаров: {products.length}
          </p>
        </div>

        <div className="series-page__search">
          <input
            type="text"
            placeholder="Поиск серии..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="series-list">
          {filteredSeries.map((seriesItem) => (
            <SeriesFolder
              key={seriesItem._id}
              series={seriesItem}
              rossetsList={productsBySeries[seriesItem.seriesId] || []}
              onOpen={toggleSeries}
              isOpen={openSeriesId === seriesItem._id}
              onDeleteSeries={setSeriesToDelete}
              onDeleteRosset={requestDeleteRosset}
            />
          ))}
        </div>

        {filteredSeries.length === 0 && !loading && (
          <div className="no-results">
            <p>Серии не найдены</p>
          </div>
        )}
      </div>

      {/* Попап для удаления серии */}
      {seriesToDelete && (
        <Popup
          title="Подтвердить удаление"
          text="Вы уверены, что хотите удалить эту серию? Это удалит серию и все продукты этой серии."
          onClose={() => setSeriesToDelete(null)}
          onConfirm={() => {
            handleDeleteSeries(seriesToDelete);
            setSeriesToDelete(null);
          }}
          onCancel={() => setSeriesToDelete(null)}
        />
      )}

      {/* Попап для удаления розетки */}
      {rossetToDelete && (
        <Popup
          title="Подтвердить удаление"
          text="Вы уверены, что хотите удалить эту розетку?"
          onClose={() => setRossetToDelete(null)}
          onConfirm={() => {
            handleDeleteRosset(rossetToDelete.id, rossetToDelete.seriesId);
            setRossetToDelete(null);
          }}
          onCancel={() => setRossetToDelete(null)}
        />
      )}
    </TemplateContent>
  );
};

export default Series;