import { useState, useContext } from 'react';
import style from './NavBar.module.css';
import { CiBookmark } from "react-icons/ci";
import sideMenuBarIcon from '../../assets/sideMenuBarIcon.png';
import { useNavigate } from 'react-router-dom';
import RegisterModal from "../../components/Modals/RegisterModal";
import LoginModal from '../../components/Modals/LoginModal';
import AddStoryModal from '../../components/Modals/AddStoryModal';
import { UserContext } from "../../context/userContext";
import { ModalContext } from '../../context/ModalContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const NavBar = () => {
    let profilePic = 'https://avatar.iran.liara.run/username?username=randomUser';
    const { userDetails, setUserDetails, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const { isRegisterModalOpen, setIsRegisterModalOpen, isLoginModalOpen, setIsLoginModalOpen, isAddStoryModalOpen, setIsAddStoryModalOpen } = useContext(ModalContext);

    const navigate = useNavigate();
    const [logoutDiv, setlogoutDiv] = useState(false);
    const logoutDivClickHandler = () => {

        setlogoutDiv(!logoutDiv);
    }
    const logoutClickHandler = () => {
        axios.post('api/auth/logout')
            .then((res) => {
                setlogoutDiv(!logoutDiv);
                toast.success('Logout successful!', {
                    position: "top-right",
                    autoClose: 1000, // Close the toast after 3000 milliseconds (3 seconds)
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsLoggedIn(false);
                localStorage.removeItem('currentUser');
                setUserDetails(null);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setlogoutDiv(!logoutDiv)
                console.log(userDetails)
            });
    }

    try {
        profilePic = userDetails.profilePic;
    } catch (error) {
        console.log(error);
    }

    return (
        <div className={style.container}>
            <div className={style.title} onClick={() => navigate('/')}>
                SwipTroy {isLoggedIn}
            </div>
            <div className={style.rightSide}>
                {isLoggedIn ? (
                    <div className={style.loggedInContent}>
                        <div className={`${style.button} ${style.pink}`} onClick={() => navigate('/bookmark')}>
                            <CiBookmark /> Bookmarks
                        </div>
                        <div className={`${style.button} ${style.pink}`} onClick={() => setIsAddStoryModalOpen(true)}>Add Story</div>
                        {isAddStoryModalOpen && <AddStoryModal setIsOpen={true} />}
                        <img src={profilePic} className={style.profilePic} alt="Profile" />
                        <div className={style.sideMenuBarIcon}>
                            <img src={sideMenuBarIcon} onClick={logoutDivClickHandler} />
                        </div>
                        {
                            logoutDiv ? <div className={style.dropdown}>
                                <p>{userDetails.username}</p>
                                <div className={`${style.button} ${style.pink}`} onClick={logoutClickHandler} >
                                    Logout
                                </div>
                            </div> : <div></div>
                        }

                    </div>
                ) : (
                    <div className={style.loggedOutContent}>
                        <div className={`${style.button} ${style.pink}`} onClick={() => setIsRegisterModalOpen(true)}>
                            Register Now
                        </div>
                        {isRegisterModalOpen && <RegisterModal setIsOpen={setIsRegisterModalOpen} />}
                        <div className={`${style.button} ${style.lightBlue}`} onClick={() => setIsLoginModalOpen(true)}>
                            Sign In
                        </div>
                        {isLoginModalOpen && <LoginModal setIsOpen={setIsLoginModalOpen} />}
                    </div>
                )}
            </div>
        </div>
    );
};


export default NavBar;
