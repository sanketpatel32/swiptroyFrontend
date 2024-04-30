import { useState, useEffect, useContext } from 'react';
import styles from "./StoryModal.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext';
import { ModalContext } from '../../context/ModalContext';
import axios from 'axios'
import LoginModal from './LoginModal';
const StoryModal = ({ setIsOpen, story }) => {

    // const [story, setStory] = useState(storyy);
    const { userDetails, setUserDetails, isLoggedIn, } = useContext(UserContext);
    const {isLoginModalOpen, setIsLoginModalOpen, } = useContext(ModalContext);
    const { setIsStoryModalOpen } = useContext(ModalContext);
    const [currentslide, setCurrentSlide] = useState(0);
    const [storyLiked, setStoryLiked] = useState(false);
    const [storyBookmarked, setStoryBookmarked] = useState(false);

    const navigate = useNavigate();
    const updateUserDetails = () => {
        try {

            axios.get(`api/auth/load/${userDetails.username}`)
                .then((res) => {
                    setUserDetails(res.data);
                    localStorage.setItem('currentUser', JSON.stringify(res.data));
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    console.log("Change Applied Successfully")
                });
        } catch {
            console.log("Nahi hora change")
        }
    }

    useEffect(() => {
        try {
            setStoryLiked(userDetails.likes.includes(story._id));
            setStoryBookmarked(userDetails.bookmarks.includes(story._id));
        } catch (error) {
            console.log(error);
        }
    }, [userDetails, story._id]);

    const previousSlide = () => {
        setCurrentSlide((currentslide) => {
            if (currentslide > 0) {
                return currentslide - 1;
            }
            return currentslide;
        });
    };

    const nextSlide = () => {
        setCurrentSlide((currentslide) => {
            if (story && story.slides && currentslide < story.slides.length - 1) {
                return currentslide + 1;
            } else {
                toast.error("No more slides available");
            }
            return currentslide;
        });
    };


    useEffect(() => {
        const timer = setInterval(() => {
            if (story && story.slides && currentslide < story.slides.length - 1) {
                nextSlide();
            } else {
                clearInterval(timer);
            }
        }, 10000);

        return () => clearInterval(timer);
    }, [story, currentslide]);

    const handleBookmark = async () => {
        if (!isLoggedIn) {
            toast.error("Login Please !!");
            setIsStoryModalOpen(false);
            setIsLoginModalOpen(true);
            { isLoginModalOpen && <LoginModal setIsOpen={setIsLoginModalOpen} /> }
        } else {
            setStoryBookmarked(true);
            try {
                axios.put(`/api/story/bookmark/${story._id}`, { userId: userDetails._id })
                    .then((res) => {
                        console.log("Successfully bookmark the story");
                        console.log(res);
                        updateUserDetails();
                    })
                    .catch((err) => {
                        console.log("Story ki gand mar food");
                        console.log(err);
                    })
                    .finally(console.log("At least we tried"));
            } catch (error) {
                console.log("Story Like hi nahi hori")
                console.log(error);
            }
        }
    };

    const closeModal = () => {
        setIsStoryModalOpen(false);
        // navigate(-1);
    };

    const handleLike = async () => {
        if (!isLoggedIn) {
            toast.error("Login Please !!");
            setIsStoryModalOpen(false);
            setIsLoginModalOpen(true);
            { isLoginModalOpen && <LoginModal setIsOpen={setIsLoginModalOpen} /> }
        } else {
            setStoryLiked(true);
            try {
                await axios.put(`/api/story/like/${story._id}`, { userId: userDetails._id })
                    .then((res) => {
                        console.log("Successfully Liked the story");
                        console.log(res);
                        updateUserDetails();
                    })
                    .catch((err) => {
                        console.log("Story ki gand mar food");
                        console.log(err);
                    })
                    .finally(console.log("At least we tried"));
            } catch (error) {
                console.log("Story Like hi nahi hori")
                console.log(error);
            }
        }
    };



    return (
        <div className={styles.background}>
            {story && story.slides && story.slides[currentslide] && (
                <div
                    className={`${styles.container} ${styles.backgroundImage}`}
                    style={{
                        backgroundImage: `url(${story.slides[currentslide].imageUrl})`,
                    }}
                >

                    <div className={styles.slideContainer}>
                        {story.slides.map((slide, index) =>
                            index < currentslide ? (
                                <span
                                    key={index}
                                    className={`${styles.slide} ${styles.dark}`}
                                ></span>
                            ) : index === currentslide ? (
                                <span
                                    key={index}
                                    className={`${styles.slide} ${styles.dark} ${styles.animated}`}
                                ></span>
                            ) : (
                                <span key={index} className={styles.slide}></span>
                            )
                        )}
                    </div>
                    {/* ////// ------------------------- CLose Button Container  ------------------------//////////// */}
                    {/* ////// ------------------------- CLose Button Container  ------------------------//////////// */}
                    <div className={styles.ButtonContainer}>
                        <button className={styles.slideCloseBtn} onClick={closeModal}>
                            <i class="fa-solid fa-x"></i>
                        </button>

                        <button
                            className={styles.slideCloseBtn}
                            onClick={() => {
                                toast.success("🦄 Link Copied !", {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                            }}
                        >
                            <i class="fa-regular fa-paper-plane"></i>
                        </button>
                    </div>



                    {/* ////// ------------------------- Left-Right Button Container  ------------------------//////////// */}

                    <div>
                        <button className={styles.leftSlide} onClick={previousSlide}>
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <button className={styles.rightSlide} onClick={nextSlide}>
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>

                    {/* ////// ------------------------- Heading, Like , Bookmark Container  ------------------------//////////// */}

                    <div className={styles.detailsContainer}>
                        <h1 className={styles.align}>
                            {story.slides[currentslide].heading}
                        </h1>
                        <p className={styles.descriptionAlign}>
                            {story.slides[currentslide].description}
                        </p>


                        <div className={styles.ButtonContainerBookmark}>
                            {/* ////// ------------------------- BookMark Button Container  ------------------------//////////// */}
                            {storyBookmarked ? (
                                <button
                                    className={`${styles.slideBookmarkBtn} ${styles.bookmarkedBtn}`}
                                    onClick={handleBookmark}
                                >
                                    <i class="fa-solid fa-bookmark"></i>
                                </button>
                            ) : (
                                <button
                                    className={styles.slideBookmarkBtn}
                                    onClick={handleBookmark}
                                >
                                    <i class="fa-solid fa-bookmark"></i>
                                </button>
                            )}

                            {/* ////// ------------------------- Like Button Container  ------------------------//////////// */}


                            <button className={styles.slideBookmarkBtn} onClick={handleLike}>
                                {/* {storyLiked ? <i class="fa fa-heart" aria-hidden="true"></i> : <i class="fa-solid fa-heart"></i> } */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={storyLiked ? 'red' : 'white'} // Fill color based on isLiked state
                                    width="24"
                                    height="24"
                                >
                                    <path
                                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    />

                                </svg>

                                <span className={styles.likeNumber}>

                                </span>
                            </button>

                        </div>
                    </div>
                </div>
            )}

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );

};

export default StoryModal;
