import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [activeHash, setActiveHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const linkClasses = (hash) =>
    `transition hover:text-shade ${activeHash === hash ? "font-semibold underline" : ""}`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-neutral text-white p-4 shadow-md z-50">
      <div className="flex justify-between items-center">
        {/* Left-Aligned Title */}
        <a href="/ParksUX/" className="hover:text-shade transition flex items-center">
          <img className="w-10 h-10 mr-2" src="./logo192.png" alt="Parks of Mill Creek Logo" />
          <span className="text-2xl font-bold">T-ReCS</span>
        </a>

        {/* Right-Aligned Navigation Links */}
        <div className="flex gap-6 text-lg px-3">
          <a href="/ParksUX/#/about" className={linkClasses("#/about")}>About</a>
          <a href="/ParksUX/#/map" className={linkClasses("#/map")}>Explore</a>
          <a href="/ParksUX/#/comparison" className={linkClasses("#/comparison")}>Compare Parks</a>
          <a href="/ParksUX/#/howitworks" className={linkClasses("#/howitworks")}>Learn</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
