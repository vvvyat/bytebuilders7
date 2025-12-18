import { ConfigProvider, Menu, type MenuProps } from "antd";
import React from "react";
import { NavLink } from "react-router";

export const Header: React.FC = React.memo(() => {
  type MenuItem = Required<MenuProps>["items"][number];

  const calculationOptions: MenuItem[] = [
    {
      key: "menu-button",
      label: <img src="/menu-button.svg" />,
      popupOffset: [0, 5],
      children: [
        {
          key: "calculate-fixed-time",
          label: (
            <NavLink to="/calculate-fixed-time">
              Рекреационная ёмкость маршрутов (фикс. время)
            </NavLink>
          ),
        },
        {
          key: "calculate-no-limits",
          label: (
            <NavLink to="/calculate-no-limits">
              Рекреационная ёмкость маршрутов (без ограничений)
            </NavLink>
          ),
        },
      ],
    },
  ];

  const profileOptions: MenuItem[] = [
    {
      key: "profile-menu-button",
      label: (
        <div style={{display: "flex", gap: "16px", fontWeight: 700, color: "#E2F4D7"}}>
          <img src="/profile-icon.svg" />
          <p>Мой профиль</p>
        </div>
      ),
      popupOffset: [5, -8],
      children: [
        {
          key: "saved-calculations",
          label: <NavLink to="/saved-calculations">Мои расчеты</NavLink>,
        },
        {
          key: "profile-settings",
          label: <NavLink to="/profile-settings">Настройки</NavLink>,
        },
        {
          key: "logout",
          label: <NavLink to="/calculate-no-limits">Выход</NavLink>,
        },
      ],
    },
  ];

  return (
    <>
      <header
        style={{
          backgroundColor: "#83480D",
          height: "60px",
          width: "100%",
          margin: 0,
          padding: "0 50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 0,
              fontFamily:
                "Gelasio, system-ui, Avenir, Helvetica, Arial, sans-serif",
              fontSize: 16,
              colorBorder: "red",
            },
            components: {
              Menu: {
                activeBarBorderWidth: 0,
                dropdownWidth: "fit-content",
                horizontalItemBorderRadius: 0,
                horizontalItemSelectedColor: "transparent",
                horizontalLineHeight: "26px",
                popupBg: "#83480D",
                subMenuItemBg: "#83480D",
                subMenuItemBorderRadius: 0,
                subMenuItemSelectedColor: "#000000",
                itemActiveBg: "#E2F4D7",
                itemSelectedBg: "#E2F4D7",
                itemSelectedColor: "#000000",
                itemHoverBg: "#E2F4D7",
              },
            },
          }}
        >
          <Menu
            style={{ width: 80, backgroundColor: "#83480D", border: "none" }}
            mode="horizontal"
            items={calculationOptions}
          />
        {sessionStorage.getItem("token") ? (
          <Menu
            style={{ width: 200, backgroundColor: "#83480D", border: "none" }}
            mode="horizontal"
            items={profileOptions}
          />
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <NavLink
              to="/authorization"
              className="header-button"
              style={{ backgroundColor: "#E2F4D7" }}
            >
              Войти
            </NavLink>
            <NavLink
              to="/registration"
              className="header-button"
              style={{ backgroundColor: "#7BC47B" }}
            >
              Зарегистрироваться
            </NavLink>
          </div>
        )}
        </ConfigProvider>
      </header>
    </>
  );
});
