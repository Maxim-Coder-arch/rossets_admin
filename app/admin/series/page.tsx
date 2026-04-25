"use client";

import { useEffect, useState } from "react";
import TemplateContent from "@/app/main/template-content/templateContent";
import { seriesData } from "@/data/series.data";
import SeriesFolder from "@/app/share/series-folder/seriesFolder";
import "./index.scss";

const Series = () => {
  const [openSeriesId, setOpenSeriesId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rossets, setRossets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleSeries = (id: string) => {
    setOpenSeriesId(openSeriesId === id ? null : id);
  };

  const filteredSeries = seriesData.filter((series) =>
    series.seriesTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchRossets = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setRossets(data.products);
      } catch (err) {
        console.error("Ошибка загрузки розеток:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRossets();
  }, []);
  const rossetsBySeries = rossets.reduce((acc: any, rosset) => {
    const key = String(rosset.seriesId);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(rosset);
    return acc;
  }, {});

  return (
    <TemplateContent>
      <div className="series-page">
        <div className="series-page__header">
          <div>
            <p className="subtitle">Всего серий: {seriesData.length} | Всего розеток: {rossets.length}</p>
          </div>
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
          {filteredSeries.map((series) => (
            <SeriesFolder
              key={series._id}
              series={series}
              rossetsList={rossetsBySeries[series._id] || []}
              onOpen={toggleSeries}
              isOpen={openSeriesId === series._id}
            />
          ))}
        </div>

        {filteredSeries.length === 0 && (
          <div className="no-results">
            <p>Серии не найдены</p>
          </div>
        )}
      </div>
    </TemplateContent>
  );
};

export default Series;