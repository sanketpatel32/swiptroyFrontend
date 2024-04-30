import React, { useEffect, useState } from 'react';
import style from './StoryFeed.module.css';
import StoryComponent from '../../components/Story/StoryComponent';
import { useFilter } from '../../context/FilterContext';
import sample from '../../assets/sample.png';
import axios from "axios";

// 
const StoryFeed = ({ category }) => {
    const [showAll, setShowAll] = useState(false);
    const [stories, setStories] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                if (showAll) {
                    setPage(10);
                }
                const { data } = await axios.get(`/api/story/getAll?category=${category}&page=${page}`);
                setStories(data.stories);
            } catch (error) {
                console.error("Error fetching stories:", error);
            }
        };
        fetchStories();
    }, [category, page, showAll]);

    const seeMoreClickHandler = () => {
        setShowAll(!showAll);
    }

    return (
        <div className={style.container}>
            <h1>Top Stories About {category}</h1>
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

        </div>

    );
};

export default StoryFeed;
