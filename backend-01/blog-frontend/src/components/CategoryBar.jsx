import React from "react";

const CATEGORIES = [
  "All",
  "Technology",
  "Web Development",
  "JavaScript",
  "AI & ML",
  "Design",
  "Career",
  "Tutorials",
];

export default function CategoryBar({ activeCategory, setActiveCategory }) {
  return (
    <div className="category-bar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`category-pill ${activeCategory === cat ? "active" : ""}`}
          onClick={() => setActiveCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
