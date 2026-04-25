'use client';

import SideBar from "@/app/share/sidebar/sidebar"
import { useState } from "react";
import OpenButton from "./openButton";

const Panel = () => {
  const [open, setOpen] = useState(true);

  return (
    open ? <SideBar onOpen={() => setOpen(false)} /> : <OpenButton onOpen={() => setOpen(true)} />
  )
}

export default Panel;