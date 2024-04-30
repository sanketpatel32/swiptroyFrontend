import React from 'react';
import style from './AddSlidesDiv.module.css';

const AddSlidesDiv = ({ slideIndex, closeButton = false, onClose, isSelected = false }) => {
  const handleClose = () => {
    // Call the onClose callback passed from the parent component
    onClose(slideIndex);
  };

  return (
    <div className={style.container} style={{
      boxShadow: isSelected ? "2inset 0 0 0 2px #00acd2": "none"
    }}>
      {closeButton && <button className={style.close_button} onClick={handleClose}>X</button>}
      Slide {slideIndex}
    </div>
  );
};

export default AddSlidesDiv;
