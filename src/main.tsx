import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Calculation } from "./calculate-fixed-time.tsx";
import { ECOLOGICAL_FACTORS, MANAGEMENT_FACTORS } from "./consts.ts";
import { Header } from "./header.tsx";
import { Authorization } from "./authorization.tsx";
import { CalculationNoLimits } from "./calculate-no-limits.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Registration } from "./registration.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
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
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/my-saved-calculations"
            element={<h1>Сохранённые расчёты</h1>}
          />
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </QueryClientProvider>
);
