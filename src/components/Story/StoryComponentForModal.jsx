
import style from './StoryComponentForModal.module.css';

const StoryComponentForModal = ({ heading,description ,imageUrl}) => {
  return (
    <div>
      <div className={style.container} style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className={style.content}>
          <div className={style.heading}>
            {heading}
          </div>
          <div className={style.description}>
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryComponentForModal;
