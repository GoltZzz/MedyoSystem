import React, { useState, useEffect, useCallback } from "react";
import { Box, CssBaseline } from "@mui/material";
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

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (!userData) {
			navigate("/", { replace: true });
			return;
		}
		setUser(JSON.parse(userData));
	}, [navigate]);

	const handleLogout = useCallback(() => {
		logout();
		navigate("/", { replace: true });
	}, [navigate]);

	return (
		<Box
			sx={{
				display: "flex",
				minHeight: "100vh",
				overflow: "hidden",
				bgcolor: "#F5F7FA",
			}}>
			<CssBaseline />
			<Navbar user={user} onLogout={handleLogout} />
			<Sidebar user={user} />
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					mt: { xs: 7, sm: 8 },
					display: "flex",
					flexDirection: "column",
					background: "linear-gradient(135deg, #F5F7FA 0%, #E4E7EB 100%)",
					position: "relative",
					minHeight: "100vh",
					width: "100%",
					overflow: "auto",
					transition: "all 0.3s ease-in-out",
				}}>
				<Box
					sx={{
						flexGrow: 1,
						bgcolor: "rgba(255, 255, 255, 0.98)",
						borderRadius: { xs: "0", sm: "12px", md: "16px" },
						p: { xs: 2, sm: 3, md: 4 },
						mx: { xs: 0, sm: 1, md: 2 },
						my: { xs: 0, sm: 1, md: 2 },
						boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)",
						overflow: "auto",
						height: "100%",
						"&::-webkit-scrollbar": {
							width: "6px",
						},
						"&::-webkit-scrollbar-track": {
							background: "rgba(0,0,0,0.03)",
							borderRadius: "3px",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "#FF5722",
							borderRadius: "3px",
							"&:hover": {
								background: "#F4511E",
							},
						},
					}}>
					{children}
				</Box>
				<Footer />
			</Box>
		</Box>
	);
});

export default DashboardLayout;
