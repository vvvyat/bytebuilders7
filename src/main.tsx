import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import { Calculation } from './calculation.tsx';
import { ECOLOGICAL_FACTORS, MANAGEMENT_FACTORS } from './consts.ts';
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<Calculation ecologicalFactors={ECOLOGICAL_FACTORS} managementFactors={MANAGEMENT_FACTORS} />} />
        <Route path="/authorization" element={<h1>Войти</h1>} />
        <Route path="/registration" element={<h1>Зарегистрироваться</h1>} />
      </Routes>
    </StrictMode>
  </BrowserRouter>,
)