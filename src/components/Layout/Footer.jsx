import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
	return (
		<Box
			component="footer"
			sx={{
				py: 3, // Adjusted vertical padding
				px: 2, // Adjusted horizontal padding
				mt: "auto",
				background:
					"linear-gradient(-45deg, #FF5722, #FF7043, #FF8A65, #FFAB91)",
				backgroundSize: "400% 400%",
				animation: "gradient 15s ease infinite",
				color: "#FFF",
				"@keyframes gradient": {
					"0%": {
						backgroundPosition: "0% 50%",
					},
					"50%": {
						backgroundPosition: "100% 50%",
					},
					"100%": {
						backgroundPosition: "0% 50%",
					},
				},
			}}>
			<Container maxWidth="sm">
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 1,
					}}>
					<img
						src="/medyoLogo.png"
						alt="Medyo Logo"
						style={{
							height: "40px",
							marginBottom: "8px",
						}}
					/>
					<Typography variant="body1" align="center" sx={{ fontWeight: 500 }}>
						{new Date().getFullYear()} Medyo System. All rights reserved.
					</Typography>
					<Typography
						variant="body2"
						align="center"
						sx={{
							color: "rgba(255, 255, 255, 0.8)",
							display: "flex",
							alignItems: "center",
							gap: 0.5,
						}}>
						Built with{" "}
						<Box
							component="span"
							sx={{
								color: "#FF5722",
								animation: "heartBeat 1.5s ease infinite",
								display: "inline-block",
								"@keyframes heartBeat": {
									"0%": { transform: "scale(1)" },
									"50%": { transform: "scale(1.2)" },
									"100%": { transform: "scale(1)" },
								},
							}}>
							❤️
						</Box>{" "}
						for better business management
					</Typography>
					<Box sx={{ mt: 1, display: "flex", gap: 2 }}>
						<Link
							href="#"
							color="inherit"
							sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
							Privacy Policy
						</Link>
						<Link
							href="#"
							color="inherit"
							sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
							Terms of Service
						</Link>
						<Link
							href="#"
							color="inherit"
							sx={{ opacity: 0.8, "&:hover": { opacity: 1 } }}>
							Contact Us
						</Link>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Footer;
