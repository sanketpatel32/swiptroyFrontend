import React from 'react';
import MenuBox from '../../components/MenuBox';
import style from './category.module.css';
import { useContext } from "react";

// Import images
import foodImg from '../../assets/categories/food.png';
import moviesImg from '../../assets/categories/movies.jpg';
import travelImg from '../../assets/categories/travel.jpg';
import HealthFitnessImg from '../../assets/categories/HealthFitness.jpg';
import educationImg from '../../assets/categories/education.jpg';
import allImg from '../../assets/categories/all.jpg';

import { MobileViewContext } from '../../context/deviceContext';
import { useFilter } from '../../context/FilterContext';

// Data for menu items
const menuItems = [
  { name: 'All', imageUrl: allImg },
  { name: "food", imageUrl: foodImg },
  { name: "health and fitness", imageUrl: HealthFitnessImg },
  { name: "travel", imageUrl: travelImg },
  { name: "movie", imageUrl: moviesImg },
  { name: "education", imageUrl: educationImg },
];



const Category = () => {
  const { isMobile, display, setDisplay } = useContext(MobileViewContext);
  const { selectedCategory, setCategory } = useFilter();
  const handleCategoryChange = (category) => {
    setCategory(category);
  };
  return (
    <div className={style.container}>
      <div className={style.categories}>
        {menuItems.map((menuItem, index) => (
          <MenuBox key={index} Name={menuItem.name} ImageUrl={menuItem.imageUrl} onClick={handleCategoryChange} />
        ))}
      </div>

    </div>
  );
};

export default Category;
