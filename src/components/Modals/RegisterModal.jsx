import { useState, useContext, useEffect } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";
import { toast } from 'react-toastify';
import { UserContext } from "../../context/userContext";

const RegisterModal = ({ setIsOpen }) => {
    const { userDetails, setUserDetails, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const [warning, setWarning] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/auth/register', formData)
            .then((res) => {
                const { token } = res.data;
                setUserDetails(res.data);
                setIsOpen(false);
                toast.success('Registered successful!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsLoggedIn(true);
                localStorage.setItem('currentUser', JSON.stringify(res.data));
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.error) {
                    setWarning(error.response.data.error);
                } else {
                    setWarning("An error occurred. Please try again later.");
                    console.log('Error', error.message);
                }// Config used to make the request
            })
    };
    return (

        <div className={styles.container}>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <RiCloseLine style={{ marginBottom: "-3px" }} />
                    </button>


                    <div className={styles.modalHeader}>
                        <div className={styles.heading}>Register to SwipTroy</div>
                    </div>


                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputBox}>
                            <span className={styles.label}>Username</span>
                            <input
                                className={styles.input}
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputBox} >
                            <span className={styles.label}>Password</span>
                            <input className={styles.input}
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.modalActions}>
                            <div className={styles.actionsContainer}>
                                {warning && <p>{warning}</p>}

                                <button className={styles.deleteBtn} type="submit">Register</button>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
};

export default RegisterModal;




