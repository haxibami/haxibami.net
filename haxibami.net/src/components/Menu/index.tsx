"use client";

import { MenuIcon } from "components/Svg";

const Menu: React.FC = () => {
  return (
    <button>
      <MenuIcon className="h-6 w-6 fill-[color:var(--fg)]" />
    </button>
  );
};

export default Menu;
