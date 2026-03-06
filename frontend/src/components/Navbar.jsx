import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "react-oauth2-code-pkce";
import { Button, IconButton } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {

  const { logIn, logOut, token } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Activity", path: "/activities" },
    { name: "AI", path: "/recommendations" },
    { name: "Profile", path: "/profile" },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <nav className="w-full backdrop-blur-md nav bg-indigo-200 border-b border-gray-200 fixed top-0 z-50 rounded-b-3xl">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-indigo-600 tracking-wide"
          >
            FitnessAI
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="hidden md:flex items-center space-x-10"
          >

            {navLinks.map((link) => (

              <motion.div key={link.path} variants={itemVariants}>

                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative font-medium transition duration-300 
                    ${isActive ? "text-indigo-600" : "text-gray-700"}`
                  }
                >
                  {({ isActive }) => (
                    <div className="group relative">

                      {link.name}

                      {/* Animated underline */}
                      <motion.span
                        layoutId="navbar-indicator"
                        className={`absolute left-0 -bottom-1 h-[2px] bg-indigo-600 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        } transition-all duration-300`}
                      />

                    </div>
                  )}

                </NavLink>

              </motion.div>

            ))}

            {/* Login / Logout */}
            <motion.div variants={itemVariants}>

              {!token ? (
                <Button
                  variant="contained"
                  onClick={logIn}
                  className="shadow-lg"
                >
                  Login
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={logOut}
                >
                  Logout
                </Button>
              )}

            </motion.div>

          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">

            <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
              {/* {mobileOpen ? <CloseIcon /> : <MenuIcon />} */}
            </IconButton>

          </div>

        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col px-6 py-4 space-y-4"
            >

              {navLinks.map((link) => (

                <motion.div key={link.path} variants={itemVariants}>

                  <NavLink
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `text-lg font-medium ${
                        isActive ? "text-indigo-600" : "text-gray-700"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>

                </motion.div>

              ))}

              <motion.div variants={itemVariants}>

                {!token ? (
                  <Button variant="contained" onClick={logIn}>
                    Login
                  </Button>
                ) : (
                  <Button variant="outlined" color="error" onClick={logOut}>
                    Logout
                  </Button>
                )}

              </motion.div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </nav>
  );
};

export default Navbar;