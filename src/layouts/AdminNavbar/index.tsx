"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ConfirmationNumberRoundedIcon from "@mui/icons-material/ConfirmationNumberRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import LocalActivityRoundedIcon from "@mui/icons-material/LocalActivityRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import useUser from "@/hooks/useUser";

import { logout } from "@/services/user.service";
import { useRouter } from "next-nprogress-bar";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminNavbar() {
  const { deleteUser, user } = useUser();
  const router = useRouter();
  const [open] = useState(false);

  const handleLogout = async () => {
    const success = await logout();
    if (!success) {
      toast("No se pudo hacer logout", {
        type: "error",
      });
      return;
    }

    router.push("/login");
  };

  const handleHomeClick = () => {
    const userRolesUrl = {
      Administrator: "administrador",
      User: "cliente",
      Support: "soporte",
    };
    const { userCategoryName } = user!;
    router.push(
      `/users/${userRolesUrl[userCategoryName as keyof typeof userRolesUrl]}`
    );
  };

  const handleUsersClick = () => {
    router.push("/users/administrador/users-report");
  };

  const handleMyTicketssClick = () => {
    router.push("/users/mis-tickets");
  };

  const menuItems = [
    {
      text: "Inicio",
      icon: <HomeRoundedIcon />,
      onClick: handleHomeClick,
      show: true,
    },
    {
      text: "Mis Tickets",
      icon: <LocalActivityRoundedIcon />,
      show: true,
      onClick: handleMyTicketssClick,
    },
    {
      text: "Tickets",
      icon: <ConfirmationNumberRoundedIcon />,
      show: user?.userCategoryName != "User",
    },
    {
      text: "Tareas",
      icon: <FormatListBulletedRoundedIcon />,
      show: user?.userCategoryName == "Support",
    },
    {
      text: "Usuarios",
      icon: <PeopleAltRoundedIcon />,
      show: user?.userCategoryName == "Administrator",
      onClick: handleUsersClick,
    },
    {
      text: "Cerrar Sesión",
      icon: <LogoutRoundedIcon />,
      onClick: handleLogout,
      show: true,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent">
        <DrawerHeader></DrawerHeader>
        <Divider />
        <List>
          {menuItems
            .filter((m) => m.show)
            .map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{ display: "block" }}
                title={item.text}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                    onClick={item.onClick}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Drawer>
    </Box>
  );
}
