import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function AccountMenu({ username, profilePic, targetReached }) {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const router = useRouter();
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
      router.push("/profile");
   };
   return (
      <React.Fragment>
         <Box className="flex flex-row items-center">
            {!targetReached && (
               <Image
                  src={profilePic}
                  alt="Profile Pic"
                  width={48}
                  height={48}
               />
            )}
            <Typography className="pl-4 pr-1 text-xl">{username}</Typography>
            <Tooltip title="Account settings">
               <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
               >
                  <FaBars />
               </IconButton>
            </Tooltip>
         </Box>
         <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
               elevation: 0,
               sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                     width: 32,
                     height: 32,
                     mr: 1,
                  },
                  "&:before": {
                     content: '""',
                     display: "block",
                     position: "absolute",
                     top: 0,
                     right: 14,
                     width: 10,
                     height: 10,
                     bgcolor: "background.paper",
                     transform: "translateY(-50%) rotate(45deg)",
                     zIndex: 0,
                  },
               },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
         >
            <MenuItem onClick={handleClose}>
               <Avatar /> Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
               <ListItemIcon>
                  <Settings fontSize="small" />
               </ListItemIcon>
               Settings
            </MenuItem>
            <MenuItem onClick={signOut}>
               <ListItemIcon>
                  <Logout fontSize="small" />
               </ListItemIcon>
               Log out
            </MenuItem>
         </Menu>
      </React.Fragment>
   );
}
