import React from 'react'
import NavBar from './pages/NavBar/NavBar';
import style from './App.module.css';
import Home from './pages/MainPage/Home';
import { Route, Routes } from "react-router-dom"
import BookMark from './pages/BookMark/BookMark';
import AddStories from './pages/AddStories/AddStories';
import Story from './pages/Story/Story';
function App() {

  return (
    <div >
      <NavBar />
      <div className={style.mainPage}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/bookmark' element={<BookMark />} />
          <Route path='/addStory' element={<AddStories />} />
        </Routes>
      </div>

    </div>
  )
}

export default App
