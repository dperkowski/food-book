import React, { useState } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

const NavMenu = () => {
  const displayName = NavMenu.name;
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed((prev) => !prev);
  };

  const menuItem = (path, title) => (
    <NavItem>
      <NavLink tag={Link} className="text-dark" to={path}>
        {title}
      </NavLink>
    </NavItem>
  );

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        light
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            food_book
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse
            className="d-sm-inline-flex flex-sm-row-reverse"
            isOpen={!collapsed}
            navbar
          >
            <ul className="navbar-nav flex-grow">
              {menuItem("/", "Home")}
              {menuItem("/counter", "Counter")}
              {menuItem("/fetch-data", "Fetch data")}
              {menuItem("/cooking-book", "Cooking Book")}
              {menuItem("/login", "Login")}
              {menuItem("/register", "Register")}
              {menuItem("/user-profile", "User Profile")}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;
