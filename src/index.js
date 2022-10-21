import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import store from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//    <React.StrictMode>
      <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/:id" element={<App/>} />
                    <Route path="*" element={<Navigate to={`f${Date.now().toString(16)}`} />} />
                </Routes>
            </BrowserRouter>
      </Provider>
 /* </React.StrictMode> */
);
