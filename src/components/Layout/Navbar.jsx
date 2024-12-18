import React from "react";
import {
	AppBar,
	Box,
	IconButton,
	Toolbar,
	Typography,
	Button,
	Avatar,
	Menu,
	MenuItem,
	keyframes,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
import { useState } from "react";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const Navbar = ({ handleDrawerToggle, handleLogout, user }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogoutClick = () => {
		handleClose();
		handleLogout();
	};

	return (
		<AppBar
			position="fixed"
			sx={{
				background: "linear-gradient(-45deg, #FFE0D1, #FFD4BC, #FFC4A6, #FFB088)",
				backgroundSize: "400% 400%",
				animation: `${gradientAnimation} 15s ease infinite, ${slideIn} 0.5s ease-out`,
				boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
				backdropFilter: "blur(10px)",
				borderBottom: "1px solid rgba(255,255,255,0.1)",
			}}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					sx={{
						mr: 2,
						color: "#444",
						transition: "transform 0.2s",
						"&:hover": {
							transform: "scale(1.1)",
						},
					}}>
					<MenuIcon />
				</IconButton>

				<Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
					<img
						src="/medyoLogo.png"
						alt="Medyo Logo"
						style={{
							height: "40px",
							filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
						}}
					/>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							color: "#444",
							fontWeight: "bold",
							textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
						}}>
						Medyo System
					</Typography>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<Typography
						variant="subtitle1"
						sx={{
							color: "#444",
							mr: 1,
							display: { xs: "none", sm: "block" },
						}}>
						{user?.firstName || user?.username || "User"}
					</Typography>
					<IconButton
						size="large"
						onClick={handleMenu}
						color="inherit"
						sx={{
							color: "#444",
							transition: "transform 0.2s",
							"&:hover": {
								transform: "scale(1.1)",
							},
						}}>
						<Avatar
							sx={{
								bgcolor: "#FF5722",
								width: 35,
								height: 35,
								border: "2px solid #fff",
							}}>
							{(user?.firstName?.[0] || user?.username?.[0] || "U").toUpperCase()}
						</Avatar>
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(anchorEl)}
						onClose={handleClose}
						sx={{
							"& .MuiPaper-root": {
								background: "rgba(255, 255, 255, 0.9)",
								backdropFilter: "blur(10px)",
								borderRadius: "10px",
								boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
								border: "1px solid rgba(255,255,255,0.2)",
							},
						}}>
						<MenuItem
							onClick={handleLogoutClick}
							sx={{
								color: "#444",
								gap: 1,
								transition: "background-color 0.2s",
								"&:hover": {
									backgroundColor: "rgba(255,87,34,0.1)",
								},
							}}>
							<ExitToApp fontSize="small" />
							Logout
						</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
