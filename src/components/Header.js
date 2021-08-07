import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    fontSize: "3rem",
    fontFamily: "Playfair Display",
    fontStyle: "italic",
    color: theme.palette.common.brown,
    textDecoration: "none"
  },
  tabContainer: {
    marginLeft: "auto"
  },
  tab: {
    ...theme.typography.tab
  },
  menu: {
    backgroundColor: theme.palette.primary.main
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  }
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

export default function Header() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleTabValue = (e, value) => {
    setValue(value);
  };

  const handleHover = e => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };

  const handleClose = e => {
    setAnchorEl(null);
    setOpen(false);
  };

  const menuOptions = [
    { name: "MARKET", link: "/market" },
    { name: "SHOP NOW", link: "/shop" },
    { name: "EXCHANGE", link: "/exchange" }
  ];

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/about" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/market" && value !== 2) {
      setValue(2);
      setSelectedIndex(0);
    } else if (window.location.pathname === "/shop" && value !== 2) {
      setValue(2);
      setSelectedIndex(1);
    } else if (window.location.pathname === "/exchange" && value !== 2) {
      setValue(2);
      setSelectedIndex(2);
    } else if (window.location.pathname === "/contact" && value !== 3) {
      setValue(3);
    }
  }, [value]);

  return (
    <div className={classes.root}>
      <ElevationScroll>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton> */}

            <Typography
              variant="h6"
              className={classes.title}
              component={Link}
              to="/"
            >
              iOrganicFarm
            </Typography>

            <Tabs
              className={classes.tabContainer}
              value={value}
              onChange={handleTabValue}
            >
              <Tab
                label="Home"
                className={classes.tab}
                component={Link}
                to="/"
              />
              <Tab
                label="About Us"
                className={classes.tab}
                component={Link}
                to="/about"
              />
              <Tab
                label="Market"
                className={classes.tab}
                component={Link}
                to="/market"
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? "true" : undefined}
                onMouseOver={event => handleHover(event)}
              ></Tab>
              <Tab
                label="Contact Us"
                className={classes.tab}
                component={Link}
                to="/contact"
              />
            </Tabs>
            {/* <Button color="inherit">Login</Button> */}
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{ onMouseLeave: handleClose }}
              classes={{ paper: classes.menu }}
            >
              {menuOptions.map((option, i) => (
                <MenuItem
                  key={i}
                  onClick={(event) => {
                    handleMenuItemClick(event, i);
                    handleClose();
                    setValue(2);
                  }}
                  selected={i === selectedIndex && value === 2}
                  component={Link}
                  to={option.link}
                  classes={{ root: classes.menuItem }}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}
