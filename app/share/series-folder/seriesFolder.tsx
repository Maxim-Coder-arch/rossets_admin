"use client";

import FolderIcon from "@/public/icons/folder";
import OpenFolderIcon from "@/public/icons/openFolder";
import ArrowRightIcon from "@/public/icons/arrowRight";
import ArrowBottomIcon from "@/public/icons/arrowBottom";
import TrashCanIcon from "@/public/icons/trashCan";
import RossetCard from "../rosset-card/rossetCard";
import "./index.scss";

interface SeriesFolderProps {
  series: any;
  rossetsList: any[];
  isOpen: boolean;
  onOpen: (id: string) => void;
  onDeleteSeries: (id: string) => void;
  onDeleteRosset: (id: string, seriesId: string) => void;
}

const SeriesFolder = ({
  series,
  rossetsList,
  onOpen,
  isOpen,
  onDeleteSeries,
  onDeleteRosset,
}: SeriesFolderProps) => {
  return (
    <div className="series-folder">
      {/* HEADER */}
      <div className="series-folder__header" onClick={() => onOpen(series._id)}>
        <span className="folder-icon">
          {isOpen ? <OpenFolderIcon /> : <FolderIcon />}
        </span>

        <div className="folder-info">
          <h3 className="folder-title">{series.seriesTitle}</h3>
          <span className="folder-count">{rossetsList.length} розеток</span>
        </div>

        <div className="folder-actions">
          <span className="folder-arrow">
            {isOpen ? <ArrowBottomIcon /> : <ArrowRightIcon />}
          </span>

          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSeries(series._id);
            }}
          >
            <TrashCanIcon />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {isOpen && (
        <div className="series-folder__content">
          {rossetsList.length === 0 ? (
            <div className="empty-folder">
              <p>В этой серии пока нет розеток</p>
            </div>
          ) : (
            <div className="rossets-grid">
              {rossetsList.map((rosset) => (
                <RossetCard key={rosset._id} rosset={rosset} onDelete={onDeleteRosset} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SeriesFolder;