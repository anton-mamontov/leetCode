import Link from "next/link";
import React from "react";

type TopbarProps = {};

const Topbar: React.FC<TopbarProps> = () => {
  return <nav className="relative ">
    <div>
      <Link href='/'>
        <img src="/logo2.png" alt ='Logo' className="h-full"/>
      </Link>
      <div>
        <div>
          <a>
            Premium
          </a>
        </div>
        <Link href='/auth'>
          <button>Sign In</button>
        </Link>
      </div>
    </div>
  </nav>
};
export default Topbar;
 