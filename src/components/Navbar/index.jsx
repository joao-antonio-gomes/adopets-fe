import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Home from "@mui/icons-material/Home";
import Pets from "@mui/icons-material/Pets";
import Link from "next/link";

const drawerWidth = 240;

const links = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "Pets",
    url: "/pets",
    icon: <Pets />,
  },
];

function Navbar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {links.map((link) => (
          <ListItem key={link.title} disablePadding>
            <Link
              href={link.url}
              passHref
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
              }}
            >
              <ListItemButton>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText primary={link.title} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Navbar;
