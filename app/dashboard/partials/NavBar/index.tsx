import { MenuStyle, NavBarStyle } from "./styles";

export const Navbar = () => {
  return (
    <NavBarStyle>
      <div>asd</div>
      <MenuStyle>
        <ul>
          <li>Home</li>
          <li>Dashboard</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </MenuStyle>

      <div>status</div>
    </NavBarStyle>
  );
};
