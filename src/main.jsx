import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ViewProvider from './context/deviceContext.jsx';
import { FilterProvider } from './context/FilterContext.jsx';
import UserProvider from './context/userContext.jsx'
import ModalProvider from './context/ModalContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <ViewProvider>
      <FilterProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </ModalProvider>
      </FilterProvider>
    </ViewProvider>
  </UserProvider>
)
