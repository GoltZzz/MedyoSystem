import React, { useState, useEffect, useCallback } from "react";
import { Box, CssBaseline, CircularProgress } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import { keyframes } from "@mui/material/styles";

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

const DashboardLayout = React.memo(({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (!userData) {
			navigate("/", { replace: true });
			return;
		}
		setUser(JSON.parse(userData));
		setLoading(false);
	}, [navigate]);

	const handleLogout = useCallback(() => {
		logout();
		navigate("/", { replace: true });
	}, [navigate]);

	const handleDrawerToggle = useCallback(() => {
		setMobileOpen((prevState) => !prevState);
	}, []);

	if (loading) {
		return (
			<Box
				sx={{
					display: "flex",
					minHeight: "100vh",
					overflow: "hidden",
					bgcolor: "#F5F7FA",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>
			<CssBaseline />
			<Navbar
				user={user}
				onLogout={handleLogout}
				handleDrawerToggle={handleDrawerToggle}
			/>
			<Sidebar
				user={user}
				mobileOpen={mobileOpen}
				handleDrawerToggle={handleDrawerToggle}
			/>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					minHeight: "100vh",
					width: "100%",
					overflow: "auto",
					background: "linear-gradient(45deg, #FF5722 30%, #FF8A65 90%)",
					backgroundSize: "200% 200%",
					animation: `${gradientAnimation} 15s ease infinite`,
					position: "relative",
					zIndex: 0,
				}}
			>
				{children}
				<Footer />
			</Box>
		</Box>
	);
});

export default DashboardLayout;
