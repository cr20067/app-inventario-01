import "./SidebarSection.css";

import { useState } from "react";

function SidebarSection({
  icon,
  title,
  children
}) {

  const [open, setOpen] = useState(false);

  return (
    <div className="sidebar-section">

      <button
        className="sidebar-section-button"
        onClick={() => setOpen(!open)}
      >

        <div className="sidebar-section-left">
          {icon}
          <span>{title}</span>
        </div>

        <span className="sidebar-arrow">
          {open ? "−" : "+"}
        </span>

      </button>

      {open && (
        <div className="sidebar-submenu">
          {children}
        </div>
      )}

    </div>
  );
}

export default SidebarSection;