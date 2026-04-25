import FolderIcon from "@/public/icons/folder";
import RossetCard from "../rosset-card/rossetCard";
import "./index.scss";
import OpenFolderIcon from "@/public/icons/openFolder";
import ArrowRightIcon from "@/public/icons/arrowRight";
import ArrowBottomIcon from "@/public/icons/arrowBottom";

const SeriesFolder = ({ series, rossetsList, onOpen, isOpen }: any) => {
  return (
    <div className="series-folder">
      <div className="series-folder__header" onClick={() => onOpen(series._id)}>
        <span className="folder-icon">{isOpen ? <OpenFolderIcon /> : <FolderIcon />}</span>
        <div className="folder-info">
          <h3 className="folder-title">{series.seriesTitle}</h3>
          <span className="folder-count">{rossetsList.length} розеток</span>
        </div>
        <span className="folder-arrow">{isOpen ? <ArrowBottomIcon /> : <ArrowRightIcon />}</span>
      </div>
      
      {isOpen && (
        <div className="series-folder__content">
          {rossetsList.length === 0 ? (
            <div className="empty-folder">
              <p>В этой серии пока нет розеток</p>
              <button className="add-rosset-btn">+ Добавить розетку</button>
            </div>
          ) : (
            <div className="rossets-grid">
              {rossetsList.map((rosset: any) => (
                <RossetCard key={rosset._id} rosset={rosset} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SeriesFolder;