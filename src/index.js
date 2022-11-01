import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, Item} from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/item" element={<Item />}/>
    </Routes>
  </BrowserRouter>
);

