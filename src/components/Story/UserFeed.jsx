import { useContext, useEffect, useState } from 'react';
import style from './StoryFeed.module.css';
import StoryComponent from '../../components/Story/StoryComponent';
import axios from "axios";
import { UserContext } from '../../context/userContext';
// 
const UserFeed = () => {
    const [showAll, setShowAll] = useState(false);
    const [stories, setStories] = useState([]);
    const [page, setPage] = useState(1);
    const{ userDetails, isLoggedIn} = useContext(UserContext);
    useEffect(() => {
        const fetchStories = async () => {
            try {
                if (showAll) {
                    setPage(10);
                }
                const { data } = await axios.get(`https://swiptroybackend-1.onrender.com/api/story/getAll?userId=${userDetails._id}&page=${page}`);
                setStories(data.stories); 
            } catch (error) {
                console.error("Error fetching stories:", error);
            } finally {
                console.log(stories);
            }
        };
        fetchStories();
    }, [ page, showAll]);

    const seeMoreClickHandler = () => {
        setShowAll(!showAll);
    }

    return (
        <>
            {isLoggedIn && stories.length > 0 ? <div className={style.container}>
                <h1>Your Stories</h1>
                <div className={style.feed}>
                    {stories.length === 0 ? <div className={style.empty}>No stories Available</div> :
                        <div className={style.story_container}>
                            {
                                stories.map((story, index) => (
                                    <StoryComponent
                                        key={index}
                                        story={story}
                                    />
                                ))
                            }
                        </div>
                    }

                </div>{stories.length === 0 ? null : <div className={`${style.button} ${style.pink}`} onClick={seeMoreClickHandler}>
                    {showAll ? "See Less" : "See More"}
                </div>}

            </div> : <div></div>}
        </>


    );
};

export default UserFeed;
