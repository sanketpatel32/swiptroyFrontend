import React, { useContext, useState } from 'react';
import style from './Home.module.css';
import Category from './category.jsx';
import StoryBox from '../Story/Story.jsx';


const Home = () => {


    return (
        <div className={style.container}>
            <Category />
            <StoryBox />

        </div>
    );
};

export default Home;
