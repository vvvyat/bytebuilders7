import React from "react";
import { NavLink } from "react-router";

export const Header: React.FC = React.memo(() => {
  return (
    <>
      <header
        style={{
          backgroundColor: "#83480D",
          height: "8vh",
          width: "100%",
          margin: 0,
          padding: "0 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box"
        }}
      >
        <img src="/menu-button.svg" style={{ height: "40%", }} />
        <div style={{display: "flex", gap: 10}}>
          <NavLink to="/authorization" className="header-button" style={{backgroundColor: "#E2F4D7"}}>Войти</NavLink>
          <NavLink to="/registration" className="header-button" style={{backgroundColor: "#7BC47B"}}>Зарегистрироваться</NavLink>
        </div>
      </header>
    </>
  );
});
