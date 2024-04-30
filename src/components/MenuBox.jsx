import React from 'react'
import style from './MenuBox.module.css'
const MenuBox = ({ Name, ImageUrl,onClick }) => {
  const containerStyle = {
    backgroundImage: `url(${ImageUrl})`,
  };

  return (
    <div className={style.container} style={containerStyle} onClick={() => onClick(Name)}>
      {Name}
    </div>
  );
};


export default MenuBox