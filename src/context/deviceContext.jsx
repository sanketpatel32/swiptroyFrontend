import { createContext, useState, useEffect } from "react";

export const MobileViewContext = createContext();

const ViewProvider = ({ children }) => {
    // For Mobile Display
    const [isMobile, setIsMobile] = useState(false);
    // Complementary function for Mobile display
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        // This function updates the state variable `isMobile` based on the window's inner width
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // We add an event listener to the window object for the 'resize' event and call `handleResize` whenever the event occurs.
        window.addEventListener("resize", handleResize);

        // Call `handleResize` once when the component mounts to set the initial value of `isMobile`
        handleResize();

        // Clean up by removing the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <MobileViewContext.Provider value={{
            isMobile,
            display,
            setDisplay,
        }}>
            {children}
        </MobileViewContext.Provider>
    );
}

export default ViewProvider;
