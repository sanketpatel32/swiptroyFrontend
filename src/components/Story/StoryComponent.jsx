import React, { useContext } from 'react';
import style from './StoryComponent.module.css';
import StoryModal from '../Modals/StoryModal';
import { ModalContext } from "../../context/ModalContext";

const StoryComponent = ({ story }) => {
  const { isStoryModalOpen, setIsStoryModalOpen } = useContext(ModalContext);
  return (
    <div>
      <div className={style.container} style={{ backgroundImage: `url(${story.slides[0].imageUrl})` }} onClick={() => setIsStoryModalOpen(true)}>
        <div className={style.content}>
          <div className={style.heading}>
            {story.slides[0].heading}
          </div>
          <div className={style.description}>
            {story.slides[0].description}
          </div>
        </div>
      </div>
      <div className={style.modal}>
        {isStoryModalOpen && <StoryModal setIsOpen={true} story={story} />}
      </ div>
    </div>
  );
};

export default StoryComponent;
