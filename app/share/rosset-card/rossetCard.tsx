'use client';

import PenIcon from "@/public/icons/pen";
import TrashCanIcon from "@/public/icons/trashCan";
import Image from "next/image";
import "./index.scss";
import ChangeRossetModal from "../change-rosset-modal/changeRossetModal";
import { useState } from "react";

const RossetCard = ({ rosset, onDelete }: { rosset: any; onDelete: (id: string) => void }) => {
  const [isChangeRossetModalOpen, setIsChangeRossetModalOpen] = useState(false);

  return (
    <>
      <div className="rosset-card">
        <div className="rosset-card__image">
          <Image src={rosset.image} alt={rosset.seriesNumber} width={400} height={400} />
        </div>
        <div className="rosset-card__info">
          <div className="rosset-card__title">{rosset.seriesNumber}</div>
          <div className="rosset-card__details">
            <span>Диаметр: {rosset.rossetDiameter}см</span>
            <span>Хвостов: {rosset.numberOfTails}</span>
            <span>Длина хвоста: {rosset.tailLength}см</span>
          </div>
          <div className="rosset-card__price">{rosset.price} ₽</div>
          <div className="rosset-card__actions">
            <button className="edit-btn" onClick={() => setIsChangeRossetModalOpen(true)}>
              <PenIcon />
            </button>
            <button className="delete-btn" onClick={() => onDelete(rosset._id)}>
              <TrashCanIcon />
            </button>
          </div>
        </div>
      </div>
      {isChangeRossetModalOpen && (
        <ChangeRossetModal
          rosset={rosset}
          onClose={() => setIsChangeRossetModalOpen(false)}
          onSave={(updated) => {
            // Обновляем данные в родительском компоненте
            // onUpdate(updated);
          }}
        />
      )}
    </>
  );
};

export default RossetCard;