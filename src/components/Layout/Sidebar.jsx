import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	Box,
	Divider,
	Toolbar,
	ListItemButton,
	useTheme,
	useMediaQuery,
	IconButton,
	keyframes,
} from "@mui/material";
import {
	Dashboard as DashboardIcon,
	ShoppingCart as POSIcon,
	Inventory as InventoryIcon,
	Assessment as ReportIcon,
	Menu as MenuIcon,
	Close as CloseIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Sidebar = ({ user, mobileOpen, handleDrawerToggle }) => {
	const location = useLocation();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const menuItems = [
		{ text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
		{ text: "POS", icon: <POSIcon />, path: "/pos" },
		{ text: "Inventory", icon: <InventoryIcon />, path: "/inventory" },
		{ text: "Sales Report", icon: <ReportIcon />, path: "/sales-report" },
	];

	const drawer = (
		<Box
			sx={{
				height: "100%",
				background:
					"linear-gradient(-45deg, #FFE0D1, #FFD4BC, #FFC4A6, #FFB088)",
				backgroundSize: "400% 400%",
				animation: `${slideIn} 0.5s ease-out`,
			}}>
			<Toolbar
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					px: [1],
					minHeight: "64px",
				}}>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
							flexGrow: 1,
							color: "#444",
							fontWeight: "bold",
							textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
						}}>
						Medyo System
					</Typography>
				</Box>
				{isMobile && (
					<IconButton
						onClick={handleDrawerToggle}
						sx={{
							color: "#444",
							transition: "transform 0.2s",
							"&:hover": {
								transform: "scale(1.1)",
							},
						}}>
						<CloseIcon />
					</IconButton>
				)}
			</Toolbar>
			<Divider sx={{ borderColor: "rgba(0,0,0,0.1)" }} />
			<List sx={{ pt: 2 }}>
				{menuItems.map((item, index) => (
					<ListItem
						key={item.text}
						disablePadding
						sx={{
							animation: `${slideIn} 0.5s ease-out ${index * 0.1}s`,
							opacity: 0,
							animationFillMode: "forwards",
						}}>
						<ListItemButton
							component={Link}
							to={item.path}
							selected={location.pathname === item.path}
							onClick={isMobile ? handleDrawerToggle : undefined}
							sx={{
								mx: 2,
								borderRadius: "10px",
								transition: "all 0.3s ease",
								position: "relative",
								"&.Mui-selected": {
									backgroundColor: "rgba(255, 255, 255, 0.4)",
									"&:hover": {
										backgroundColor: "rgba(255, 255, 255, 0.5)",
									},
									"&::before": {
										content: '""',
										position: "absolute",
										left: "-10px",
										top: "50%",
										transform: "translateY(-50%)",
										width: "4px",
										height: "70%",
										backgroundColor: "#FF5722",
										borderRadius: "0 4px 4px 0",
									},
								},
								"&:hover": {
									backgroundColor: "rgba(255, 255, 255, 0.3)",
									transform: "translateX(5px)",
								},
							}}>
							<ListItemIcon
								sx={{
									minWidth: 40,
									color: location.pathname === item.path ? "#FF5722" : "#666",
									transition: "color 0.3s ease",
								}}>
								{item.icon}
							</ListItemIcon>
							<ListItemText
								primary={item.text}
								sx={{
									"& .MuiTypography-root": {
										fontWeight:
											location.pathname === item.path ? "bold" : "normal",
										color: location.pathname === item.path ? "#FF5722" : "#444",
										transition: "all 0.3s ease",
									},
								}}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<Box
			component="nav"
			sx={{
				width: { sm: drawerWidth },
				flexShrink: { sm: 0 },
			}}>
			{/* Mobile drawer */}
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						borderRight: "none",
						boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)",
					},
				}}>
				{drawer}
			</Drawer>
			{/* Desktop drawer */}
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						borderRight: "none",
						boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)",
						background: "transparent",
					},
				}}
				open>
				{drawer}
			</Drawer>
		</Box>
	);
};

export default Sidebar;
