import { useState, useContext, useEffect } from "react";
import styles from "./AddStoryModal.module.css";
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";
import { toast } from 'react-toastify';
import { ModalContext } from "../../context/ModalContext";
import SlideForm from "./AddStoryModalComponents/SlideForm";
import { UserContext } from "../../context/userContext";
const AddStoryModal = ({ setIsOpen }) => {
    const { setIsAddStoryModalOpen } = useContext(ModalContext);
    const { userDetails }  = useContext(UserContext);
    const [error, setError] = useState("");
    //---------------------------------------------
    const initialSlide = {
        heading: "",
        description: "",
        imageUrl: "",
        category: "",
    };
    //---------------------------------------------
    const [slides, setSlides] = useState([
        initialSlide,
        initialSlide,
        initialSlide,
    ]);
    //---------------------------------------------
    const [currentSlide, setCurrentSlide] = useState(0);
    //-----------------------------------------------
    useEffect(() => {
        setCurrentSlide(currentSlide);
        console.log("currentSlide", currentSlide);
    }, [currentSlide]);
    // ----  ----------------
    const handleValidate = (name, value) => {
        if (name === "category" && value === "") {
            setError("Please select a category");
        } else if (name === "imageUrl" && value == "") {
            setError("Please add an image url");
        } else if (name === "description" && value == "") {
            setError("Please add a description");
        } else if (name === "heading" && value == "") {
            setError("Please add a heading");
        } else {
            setError("");
        }
    };

    //-===========================================================================
    const addSlide = () => {
        if (slides.length < 6) {
            setSlides((prevSlides) => [...prevSlides, {}]);
            setCurrentSlide(slides.length);
        }
    };
    //-===========================================================================
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        handleValidate(name, value);
        setSlides((prevSlides) =>
            prevSlides.map((slide, i) =>
                i === index ? { ...slide, [name]: value } : slide
            )
        );
    }
    // ----------------------------------------------------------------
    const handleRemoveSlide = (index) => {
        if (slides && slides.length > 3) {
            setSlides((prevSlides) => prevSlides.filter((_, i) => i !== index));
            handlePrevClick();
        }
    };
    //- - - - - - - - - - - -           
    const handleAddSlide = () => {
        if (slides.length < 6) {
            setSlides((prevSlides) => [...prevSlides, {}]);
            setCurrentSlide(slides.length);
        }
    };
    const handlePrevClick = () => {

        setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0);

    };
    const handleNextClick = () => {
        setCurrentSlide(
            currentSlide < slides.length - 1 ? currentSlide + 1 : slides.length - 1
        );
    };
    //---------------------------------------
    const handleSubmit = async () => {

        try {
            const isValid = slides.some((slide, index) => {
                if (
                    Object.keys(slide).length === 0 ||
                    slide.heading?.trim() === "" ||
                    slide.description?.trim() === "" ||
                    slide.imageUrl?.trim() === "" ||
                    slide.category?.trim() === ""
                ) {
                    setError(slide, index);
                }
                return (
                    Object.keys(slide).length === 0 ||
                    slide.heading?.trim() === "" ||
                    slide.description?.trim() === "" ||
                    slide.imageUrl?.trim() === "" ||
                    slide.category?.trim() === ""
                );
            });

            if (isValid) {
                setError("Please fill out all fields");
                return;
            }

            if (slides.length < 3) {
                setError("Please add at least 3 slides");
                return;
            } else if (slides.length > 6) {
                setError("Please remove slides");
                return;
            }

            const response = await axios
                .post(`/api/story/create`, {
                    slides,
                    addedBy: userDetails._id,
                })
                .then((response) => {
                    // setLoading(false);
                    if (response.data.success) {
                        toast.success("Story created successfully", {
                            position: "top-center",
                        });
                    }
                    setIsAddStoryModalOpen(false);
                });
        } catch (error) {
            console.log(error);
            toast.error("Error creating story", { position: "top-center" });
        }
    };


    return (

        <div className={styles.container}>
            <div className={styles.darkBG} onClick={() => setIsAddStoryModalOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <button className={styles.closeBtn} onClick={() => setIsAddStoryModalOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>


                    <div className={styles.slides}>
                        {slides.map((slide, index) => (
                            <div
                                className={styles.slide_box}
                                onClick={() => setCurrentSlide(index)}
                                style={{
                                    border: currentSlide === index ? "2px solid #73ABFF" : "none",
                                }}
                            >
                                {<button className={styles.close_button}>X</button>}
                                slide {index + 1}
                            </div>
                        ))}

                        {slides.length < 6 && <div
                            className={styles.slide_box}
                            onClick={handleAddSlide}
                            style={{ cursor: "pointer" }}
                        >
                            Add +
                        </div>}
                    </div>

                    <div>
                        {slides.map((slide, slideIndex) => (
                            <>
                                {slideIndex === currentSlide && (

                                    <SlideForm
                                        key={slideIndex}
                                        slide={slide}
                                        slideIndex={slideIndex}
                                        handleChange={(e) => handleChange(e, slideIndex)}
                                        handleRemoveSlide={() => handleRemoveSlide(slideIndex)}
                                    />

                                )}
                            </>
                        ))}
                    </div>
                    <div className={styles.modalActions}>
                        <div className={styles.actionsContainer}>
                            <div>

                                <button className={`${styles.deleteBtn} ${styles.green}`} type="submit" onClick={() => handlePrevClick()}>Previous</button>
                                <button className={`${styles.deleteBtn} ${styles.blue}`} type="submit" onClick={() => handleNextClick()}>Next</button>
                            </div>
                            <button className={`${styles.deleteBtn} ${styles.pink}`} type="submit" onClick={() => handleSubmit()} >Post</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
};

export default AddStoryModal;




