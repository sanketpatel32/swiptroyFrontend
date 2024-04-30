import { useContext, useEffect, useState } from 'react';
import style from './StoryFeed.module.css';
import StoryComponent from './StoryComponent';
import axios from "axios";
import { UserContext } from '../../context/userContext';
// 
const BookmarkFeed = () => {
    const [stories, setStories] = useState([]);
    const [page, setPage] = useState(1);
    const{ userDetails } = useContext(UserContext);
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const { data } = await axios.get(`/api/story/mybookmark?userId=${userDetails._id}`);
                setStories(data.bookmarks); 
            } catch (error) {
                console.error("Error fetching stories:", error);
            } finally {
                console.log(stories);
            }
        };
        fetchStories();
    }, [ page]);


    return (
        <>
            <div className={style.container}>
                <h1>Your Bookmarks</h1>
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

                </div>

            </div> 
        </>


    );
};

export default BookmarkFeed;
