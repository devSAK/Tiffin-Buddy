import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ShoppingCartOutlined as ShoppingCartIcon,
  Close,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { badgeClasses } from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const Header = ({ onLoginClick, onLogout, setCartOpen, cartItems = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout, isAuthenticated } = useAuth();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" color="default" className="dark:bg-gray-900">
      <Toolbar className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* Left: Logo and Nav */}
        <Box className="flex items-center space-x-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-10 object-cover rounded-lg"
          />

          {/* Desktop Nav Links */}
          <Box className="hidden md:flex space-x-6 text-gray-800 dark:text-white ml-4">
            {[
              { id: "home", label: "Home" },
              { id: "meals", label: "Meals" },
              { id: "subscription", label: "Subscription" },
              { id: "contactus", label: "Contact Us" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleScroll(id)}
                className="hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors"
              >
                {label}
              </button>
            ))}
          </Box>
        </Box>

        {/* Right: Icons */}
        <Box className="flex items-center space-x-2">
          <DarkModeToggle />

          <IconButton onClick={() => setCartOpen(true)} color="success">
            <CartBadge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </CartBadge>
          </IconButton>

          <IconButton
            size="small"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar alt={user?.identifier || "Guest"} />
            {/* <AccountCircle alt={user?.identifier || "Guest"} /> */}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {isAuthenticated ? (
              <>
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
                <MenuItem
                  onClick={() => {
                    logout();
                    handleClose();
                    onLogout?.();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  handleClose();
                  onLoginClick?.();
                }}
              >
                Login
              </MenuItem>
            )}
          </Menu>

          {/* Mobile menu toggle */}
          <Box className="md:hidden">
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <Close /> : <MenuIcon />}
            </IconButton>
          </Box>
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
      {menuOpen && (
        <Box className="md:hidden px-6 py-4 bg-white dark:bg-gray-800 space-y-4">
          <nav className="flex flex-col space-y-3 text-gray-800 dark:text-white">
            {[
              { id: "home", label: "Home" },
              { id: "meals", label: "Meals" },
              { id: "subscription", label: "Subscription" },
              { id: "contactus", label: "Contact Us" },
            ].map(({ id, label }) => (
              <button key={id} onClick={() => handleScroll(id)}>
                {label}
              </button>
            ))}
          </nav>

          <div className="flex flex-col space-y-3 mt-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-800 dark:text-white">
                  {user?.identifier}
                </span>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => {
                    logout();
                    onLogout?.();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={onLoginClick}
              >
                Login
              </Button>
            )}
          </div>
        </Box>
      )}
    </AppBar>
  );
};

export default Header;
