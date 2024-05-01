import React, { useContext, useState } from 'react';
import style from './Home.module.css';
import Category from './category.jsx';
import StoryBox from '../Story/Story.jsx';
import axios from 'axios';
import { API_URL } from "../../constant";

const Home = () => {
    const clickHandler = () => {
        axios.get(`${API_URL}story/getAll?category=food&page=1`)
    }

    return (
        <div className={style.container}>
            <Category />
            <StoryBox />
            <div>
                <button onClick={clickHandler}>Click me</button>
            </ div>
        </div>
    );
};

export default Home;
