import "./NavbarDropdown.css";

import { useState } from "react";

function NavbarDropdown({
  title,
  children
}) {

  const [open, setOpen] = useState(false);

  return (
    <div
      className="navbar-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >

      <button className="navbar-dropdown-button">
        {title} ▼
      </button>

      {open && (
        <div className="navbar-dropdown-menu">
          {children}
        </div>
      )}

    </div>
  );
}

export default NavbarDropdown;