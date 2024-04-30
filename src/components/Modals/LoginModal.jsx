import { useState, useContext, useEffect } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";
import { toast } from 'react-toastify';
import { UserContext } from "../../context/userContext";

const LoginModal = ({ setIsOpen }) => {
    const { userDetails, setUserDetails, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const [warning, setWarning] = useState(false);
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
        axios.post('/api/auth/login', formData, { withCredentials: true })
            .then((res) => {
                const { token } = res.data;
                const cookieValue = document.cookie
                    .split('; ')
                    .find(cookie => cookie.startsWith('__clerk_db_jwt='));

                let jwtToken = null;
                if (cookieValue) {
                    jwtToken = cookieValue.split('=')[1];
                }

                // Step 2: Save the JWT token in the local storage of the browser
                if (jwtToken) {
                    localStorage.setItem('jwt', jwtToken);
                    console.log('JWT token saved successfully:', jwtToken);
                } else {
                    console.error('Failed to extract JWT token from the cookie.');
                }
                // --------
                setUserDetails(res.data);
                setIsOpen(false);
                toast.success('Login successful!', {
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

                // Handle cookies
            })
            .catch((err) => {
                console.log(err);
                setWarning(true);
            })
            .finally(() => {
                console.log(userDetails);
                console.log(token); // Make sure to define token outside of the scope of the promise chain
            });


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
                        <div className={styles.heading}>Login to SwipTroy</div>
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
                                {warning ? <p >Invalid Username or password</p> : <p></p>}

                                <button className={styles.deleteBtn} type="submit">Login</button>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default LoginModal;




// {
//     userId: userData._id,
//         username: userData._username,
//             profilePic: userData.profilePic
// }