import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { authContext } from "../../helpers/authContext";
import { useState, useEffect } from "react";
import { auth } from "../../helpers/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../helpers/firebaseConfig";

const pages = ["Home"];

function ResponsiveAppBar() {
  const [profilePhoto, setProfilePhoto] = React.useState("");
  const loggedIn = React.useContext(authContext);

  // console.log("Navbar: ", loggedIn);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  useEffect(() => {
    if (loggedIn && auth.currentUser) {
      getDownloadURL(ref(storage, `/users/${auth.currentUser.uid}/profile`))
        .then((url) => {
          setProfilePhoto(url);
          // console.log("Profile Photo: ", url);
        })
        .catch((error) => {});
    }
  }, [loggedIn, auth.currentUser]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xs">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              mx: "auto",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, i) => {
                if (i === 0) {
                  return (
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    </Link>
                  );
                }
              })}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              flexGrow: 1,
              fontWeight: 100,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JobFINDER
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            {loggedIn ? (
              <Link to="/user" style={{ textDecoration: "none" }}>
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={profilePhoto} />
                </IconButton>
              </Link>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button variant="contained">Log in</Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
