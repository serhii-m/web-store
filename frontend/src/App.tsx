import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import {BrowserRouter} from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App;
