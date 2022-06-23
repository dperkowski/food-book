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
import { Link, useNavigate } from "react-router-dom";
import "./NavMenu.css";

import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const NavMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    toast.success("Logged out");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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
              {user ? (
                <>
                  <>
                    <>{menuItem("/user-profile", "User Profile")}</>
                    <button className="btn btn-primary" onClick={onLogout}>
                      Logout
                    </button>
                  </>
                </>
              ) : (
                <>
                  <>{menuItem("/register", "Register")}</>
                  <>{menuItem("/login", "Login")}</>
                </>
              )}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavMenu;
