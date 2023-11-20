// "use client"

import React, { useState } from 'react';

const Categories = ({ categories, filterItems }) => {
  let [currentCategory, setCurrentCategory] = useState(0);

  const handleCategoryClick = (categoryIndex:any, category:any) => {
    filterItems(category);
    setCurrentCategory(categoryIndex);
  };

  return (
    <div className="btn-container">
      {categories.map((category:any, index:any) => {
        return (
          <button
            type="button"
            className={
              `filter-btn capitalize text-gray-900
              ${
                index === currentCategory ? 'active bg-primary' : 'hover:bg-indigo-400'
              }`
            }
            key={index}
            onClick={() => handleCategoryClick(index, category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
