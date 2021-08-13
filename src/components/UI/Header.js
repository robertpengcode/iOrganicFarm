import React, { useState, useEffect, Fragment } from "react";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem"
    }
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
  },
  drawerIconContainer: {
    marginLeft: "auto"
  },
  drawerIcon: {
    height: "2rem",
    width: "2rem"
  },
  drawer: {
    backgroundColor: theme.palette.primary.main
  },
  drawerItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerItemSelected: {
    opacity: 1
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
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleTabValue = (e, tabValue) => {
    setTabValue(tabValue);
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
    { name: "MARKET", link: "/market", tabValue: 2 },
    { name: "SHOP NOW", link: "/shop", tabValue: 2 },
    { name: "EXCHANGE", link: "/exchange", tabValue: 2 }
  ];

  const routes = [
    { name: "HOME", link: "/", tabValue: 0 },
    { name: "ABOUT US", link: "/about", tabValue: 1 },
    {
      name: "MARKET",
      link: "/market",
      tabValue: 2,
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      onMouseOver: event => handleHover(event)
    },
    //  { name: "SHOP NOW", link: "/shop", tabValue: 2},
    //  { name: "EXCHANGE", link: "/exchange", tabValue: 2},
    { name: "CONTACT", link: "/contact", tabValue: 3 }
  ];

  useEffect(() => {
    [...routes, ...menuOptions].forEach(route => {
      if (
        window.location.pathname === route.link &&
        tabValue !== route.tabValue
      ) {
        setTabValue(route.tabValue);
      }
    });
  }, [tabValue, menuOptions, routes]);

  // useEffect(() => {
  //   if (window.location.pathname === "/" && tabValue !== 0) {
  //     setTabValue(0);
  //   } else if (window.location.pathname === "/about" && tabValue !== 1) {
  //     setTabValue(1);
  //   } else if (window.location.pathname === "/market" && tabValue !== 2) {
  //     setTabValue(2);
  //     setSelectedIndex(0);
  //   } else if (window.location.pathname === "/shop" && tabValue !== 2) {
  //     setTabValue(2);
  //     setSelectedIndex(1);
  //   } else if (window.location.pathname === "/exchange" && tabValue !== 2) {
  //     setTabValue(2);
  //     setSelectedIndex(2);
  //   } else if (window.location.pathname === "/contact" && tabValue !== 3) {
  //     setTabValue(3);
  //   }
  // }, [tabValue]);

  const tabs = (
    <Fragment>
      <Tabs
        className={classes.tabContainer}
        value={tabValue}
        onChange={handleTabValue}
      >
        {routes.map((route, i) => (
          <Tab
            key={i}
            label={route.name}
            className={classes.tab}
            component={Link}
            to={route.link}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.onMouseOver}
          />
        ))}
        {/* <Tab label="HOME" className={classes.tab} component={Link} to="/" />
        <Tab
          label="ABOUT US"
          className={classes.tab}
          component={Link}
          to="/about"
        />
        <Tab
          label="MARKET"
          className={classes.tab}
          component={Link}
          to="/market"
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          onMouseOver={event => handleHover(event)}
        ></Tab>
        <Tab
          label="CONTACT US"
          className={classes.tab}
          component={Link}
          to="/contact"
        /> */}
      </Tabs>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        keepMounted
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={i}
            onClick={event => {
              handleMenuItemClick(event, i);
              handleClose();
              setTabValue(2);
            }}
            selected={i === selectedIndex && tabValue === 2}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );

  const drawer = (
    <Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List>
          {routes.map((route, i) => (
            <ListItem
              key={i}
              onClick={() => {
                setOpenDrawer(false);
                setTabValue(0);
              }}
              divider
              button
              component={Link}
              to={route.link}
              selected={tabValue === route.tabValue}
            >
              <ListItemText
                className={
                  tabValue === route.tabValue
                    ? [classes.drawerItem, classes.drawerItemSelected]
                    : classes.drawerItem
                }
                disableTypography
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}

          {/* <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(0);
            }}
            divider
            button
            component={Link}
            to="/"
            selected={tabValue === 0}
          >
            <ListItemText
              className={
                tabValue === 0
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              HOME
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(1);
            }}
            divider
            button
            component={Link}
            to="/about"
            selected={tabValue === 1}
          >
            <ListItemText
              className={
                tabValue === 1
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              ABOUT US
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(2);
            }}
            divider
            button
            component={Link}
            to="/market"
            selected={tabValue === 2}
          >
            <ListItemText
              className={
                tabValue === 2
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              MARKET
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={() => {
              setOpenDrawer(false);
              setTabValue(3);
            }}
            divider
            button
            component={Link}
            to="/contact"
            selected={tabValue === 3}
          >
            <ListItemText
              className={
                tabValue === 3
                  ? [classes.drawerItem, classes.drawerItemSelected]
                  : classes.drawerItem
              }
              disableTypography
            >
              CONTACT
            </ListItemText>
          </ListItem> */}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <ElevationScroll>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              component={Link}
              to="/"
            >
              iOrganicFarm
            </Typography>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}
