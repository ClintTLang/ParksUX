import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-neutral text-white p-4 shadow-md z-50">
      <div className="flex justify-between items-center">
        {/* Left-Aligned Title */}
        <a href="/" className="text-2xl font-bold hover:text-shade transition">
          Explore the Parks of Mill Creek
        </a>

        {/* Right-Aligned Navigation Links */}
        <div className="flex gap-6 text-lg">
          <a href="/about" className="hover:text-shade transition">
            About
          </a>
          <a href="#language" className="hover:text-shade transition">
            How It Works
          </a>
          <a href="/comparison" className="hover:text-shade transition">
            Compare Parks
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
