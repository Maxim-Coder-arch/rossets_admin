import PanelIcon from "@/public/icons/panel"
import "./open.scss";
const OpenButton = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <button onClick={onOpen} className="panel-open">
      <PanelIcon />
    </button>
  )
}

export default OpenButton;