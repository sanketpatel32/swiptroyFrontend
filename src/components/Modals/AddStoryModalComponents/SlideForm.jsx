import React from 'react'
import styles from "../AddStoryModal.module.css";
const SlideForm = ({ slide, slideIndex, handleChange }) => {
   const categories = [
        "food",
        "health and fitness",
        "travel",
        "movie",
        "education",
    ];
  return (
      <div>
          <div className={styles.inputBox}>
              <span className={styles.label}>Heading :</span>
              <input
                  className={styles.input}
                  type="text"
                  name={`heading`}
                  value={slide.heading}
                  placeholder="Your Heading"
                  onChange={(e) => handleChange(e, slideIndex)}
              />
          </div>
          <div className={styles.inputBox} >
              <span className={styles.label}>Description:</span>
              <input className={styles.inputDescription}
                  type="text"
                  name={`description`}
                  value={slide.description}
                  placeholder="Story Description"
                  onChange={(e) => handleChange(e, slideIndex)}
              />
          </div>
          <div className={styles.inputBox}>
              <span className={styles.label}>imageUrl :</span>
              <input
                  className={styles.input}
                  type="text"
                  name={`imageUrl`}
                  value={slide.imageUrl}
                  placeholder="Add Image URL"
                  onChange={(e) => handleChange(e, slideIndex)}
              />
          </div>
          <div className={styles.inputBox} >
              <span className={styles.label}>Category</span>
              <select
                  className={styles.input}
                  name="category"
                  onChange={(e) => handleChange(e, slideIndex)}
                  value={slide.category}
              >
                  <option value="" style={{ color: '#847c7c' }}>Select Category</option>
                  {categories.map((category) => (
                      <option key={category + slideIndex} value={category}>
                          {category}
                      </option>
                  ))}
              </select>
          </div>
      </div>
  )
}

export default SlideForm