import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Calculation } from "./calculate-fixed-time.tsx";
import { ECOLOGICAL_FACTORS, MANAGEMENT_FACTORS } from "./consts.ts";
import { Header } from "./header.tsx";
import { Authorization } from "./authorization.tsx";
import { CalculationNoLimits } from "./calculate-no-limits.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Header />
      <Routes>
        <Route
          index
          path="/calculate-fixed-time"
          element={
            <Calculation
              ecologicalFactors={ECOLOGICAL_FACTORS}
              managementFactors={MANAGEMENT_FACTORS}
            />
          }
        />
        <Route
          path="/calculate-no-limits"
          element={
            <CalculationNoLimits
              ecologicalFactors={ECOLOGICAL_FACTORS}
              managementFactors={MANAGEMENT_FACTORS}
            />
          }
        />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/registration" element={<h1>Зарегистрироваться</h1>} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
