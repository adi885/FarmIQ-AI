
import React from 'react';

const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-green-600"
  >
    <path d="M11 20A7 7 0 0 1 4 13V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6a7 7 0 0 1-7 7z"></path>
    <path d="M12 20A4 4 0 0 0 16 16v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a4 4 0 0 0 4 4z"></path>
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
        <LeafIcon />
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
          Farm<span className="text-green-700">IQ</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
