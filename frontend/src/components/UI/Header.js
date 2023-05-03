import React, {
  useState,
  useEffect,
  useContext,
  Fragment,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IsExchangingContext } from "./../../context/isExchangingContext";
import { ExchangesContext } from "./../../context/exchangesContext";
import { AuthContext } from "./../../context/authContext";

import AuthButtons from "./AuthButtons";
import ExchangePlatformButton from "./ExchangePlatformButton";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@mui/material/Badge";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: "3rem",
    fontFamily: "Playfair Display",
    fontStyle: "italic",
    color: theme.palette.common.brown,
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
  },
  drawerIcon: {
    height: "2rem",
    width: "2rem",
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  drawerItemSelected: {
    ...theme.typography.tab,
    opacity: 1,
    "&:hover": {
      opacity: 1,
    },
  },
  username: {
    ...theme.typography.text,
    color: theme.palette.common.armyGreen,
  },
  // skip: {
  //   "&:focus": {
  //     marginLeft: "5rem",
  //   }
  // }
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props) {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cartItems);
  const exchangeItems = useSelector((state) => state.exchangeItems);
  const theme = useTheme();
  //const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isExchanging } = useContext(IsExchangingContext);
  const { exchanges } = useContext(ExchangesContext);
  const { currentFarm, username } = useContext(AuthContext);
  const firstName = username.split(" ")[0];

  const handleTabValue = (e, tabValue) => {
    props.setTabValue(tabValue);
  };

  const handleHover = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    props.setSelectedIndex(i);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const menuOptions = useMemo(
    () => [
      { name: "SHOP NOW", link: "/shop", tabValue: 2 },
      { name: "EXCHANGE", link: "/exchange", tabValue: 2 },
    ],
    []
  );

  // const menuOptions = [
  //   // { name: "MARKET", link: "/market", tabValue: 2 },
  //   { name: "SHOP NOW", link: "/shop", tabValue: 2 },
  //   { name: "EXCHANGE", link: "/exchange", tabValue: 2 },
  // ];

  const routes = useMemo(
    () => [
      { name: "HOME", link: "/", tabValue: 0 },
      { name: "ABOUT US", link: "/about", tabValue: 1 },
      {
        name: "MARKET",
        link: "/market",
        tabValue: 2,
        ariaOwns: anchorEl ? "simple-menu" : undefined,
        ariaPopup: anchorEl ? "true" : undefined,
        onMouseOver: (event) => handleHover(event),
      },
      { name: "CONTACT", link: "/contact", tabValue: 3, target: "_blank" },
    ],
    [anchorEl]
  );

  // const routes = [
  //   { name: "HOME", link: "/", tabValue: 0 },
  //   { name: "ABOUT US", link: "/about", tabValue: 1 },
  //   {
  //     name: "MARKET",
  //     link: "/market",
  //     tabValue: 2,
  //     ariaOwns: anchorEl ? "simple-menu" : undefined,
  //     ariaPopup: anchorEl ? "true" : undefined,
  //     onMouseOver: (event) => handleHover(event),
  //   },
  //   { name: "CONTACT", link: "/contact", tabValue: 3, target: "_blank" },
  // ];

  const routesForDrawer = [
    { name: "HOME", link: "/", tabValue: 0 },
    { name: "ABOUT US", link: "/about", tabValue: 1 },
    { name: "SHOP NOW", link: "/shop", tabValue: 2 },
    { name: "EXCHANGE", link: "/exchange", tabValue: 2 },
    { name: "CONTACT", link: "/contact", tabValue: 3, target: "_blank" },
  ];

  useEffect(() => {
    [...routes, ...menuOptions].forEach((route) => {
      if (
        window.location.pathname === route.link &&
        props.tabValue !== route.tabValue
      ) {
        props.setTabValue(route.tabValue);
      }
    });
  }, [props.tabValue, menuOptions, routes, props]);

  const totalItems = cartItems.reduce((totalItems, item) => {
    return (totalItems += item.quantity);
  }, 0);

  const totalExchangeItems = exchangeItems.reduce((totalItems, item) => {
    return (totalItems += item.quantity);
  }, 0);

  const myExchanges = exchanges.filter(
    (exchange) =>
      exchange.requestFrom === currentFarm || exchange.requestTo === currentFarm
  );

  const totalExchangeRequests = myExchanges.length;

  const cartIcon = (
    <IconButton component={Link} to="/cart" aria-label="Go to my shopping cart">
      <Badge badgeContent={totalItems} color="success">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );

  const notification = (
    <IconButton
      component={Link}
      to="/exchangeview"
      aria-label="Go to exchange requests"
    >
      <Badge badgeContent={totalExchangeRequests} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );

  const tabs = (
    <Fragment>
      <Tabs
        className={classes.tabContainer}
        value={props.tabValue}
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
            target={route.target}
            tabIndex="0"
          />
        ))}
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
            onClick={(event) => {
              handleMenuItemClick(event, i);
              handleClose();
              props.setTabValue(2);
            }}
            selected={i === props.selectedIndex && props.tabValue === 2}
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
        //disableBackdropTransition={!iOS}
        //disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List>
          {routesForDrawer.map((route, i) => (
            <ListItem
              key={i}
              onClick={() => {
                setOpenDrawer(false);
                props.setTabValue(0);
              }}
              divider
              button
              component={Link}
              to={route.link}
              selected={props.tabValue === route.tabValue}
              target={route.target}
            >
              <ListItemText
                className={
                  props.tabValue === route.tabValue
                    ? classes.drawerItemSelected
                    : classes.drawerItem
                }
                disableTypography
              >
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        aria-label="drawer"
        aria-expanded={openDrawer}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <div className="skip">
        <a href="#main">Skip to main content</a>
      </div>
      <ElevationScroll>
        <AppBar position="static">
          <Toolbar>
            <Typography
              className={classes.title}
              component={Link}
              to="/"
              aria-label="home page"
            >
              iOrganicFarm
            </Typography>
            {matches ? drawer : tabs}
            {username ? (
              <Typography
                className={classes.username}
              >{`Welcome ${firstName}!`}</Typography>
            ) : null}
            <AuthButtons />
            {!isExchanging ? (
              cartIcon
            ) : (
              <ExchangePlatformButton totalExchangeItems={totalExchangeItems} />
            )}
            {currentFarm ? notification : null}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}
