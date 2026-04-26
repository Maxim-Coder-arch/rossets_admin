'use client';

import { sidebarData } from "@/data/sidebar.data";
import Link from "next/link";
import PanelIcon from "@/public/icons/panel";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import "./index.scss";

const SideBar = ({ onOpen }: { onOpen: () => void }) => {
  const pathName = usePathname();

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    
    className="sidebar">
      <div className="sidebar__content">
        <div className="sidebar__content__header">
          <h1>CMS система</h1>
          <button onClick={onOpen}>
            <PanelIcon />
          </button>
        </div>
        <div className="sidebar__content__body">
          <ul>
            {sidebarData.map((item, index) => {
              return (
                <Link key={index} href={item.link} className={`${pathName === item.link ? "active" : ""}`}>
                  <div className="sidebar__content__body__icon">
                    {item.icon}
                  </div>
                  <li>{item.label}</li>
                </Link>
              )
            })}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default SideBar;