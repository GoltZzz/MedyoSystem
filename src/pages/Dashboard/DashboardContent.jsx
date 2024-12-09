import React, { useMemo } from "react";
import {
	Box,
	Grid,
	Paper,
	Typography,
	Card,
	CardContent,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
} from "@mui/material";
import {
	AttachMoney,
	ShoppingCart,
	Inventory,
	TrendingUp,
	ArrowUpward,
	ArrowDownward,
	Notifications,
} from "@mui/icons-material";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import Chip from "@mui/material/Chip";
import Circle from "@mui/icons-material/RadioButtonUnchecked";
import { keyframes } from "@mui/system";

const DashboardContent = React.memo(() => {
	const stats = useMemo(
		() => [
			{
				title: "Total Sales",
				value: "₱45,678",
				icon: <AttachMoney />,
				increase: "+15%",
			},
			{
				title: "Orders Today",
				value: "23",
				icon: <ShoppingCart />,
				increase: "+5%",
			},
			{
				title: "Low Stock Items",
				value: "8",
				icon: <Inventory />,
				increase: "-3%",
			},
			{
				title: "Revenue Growth",
				value: "₱12,345",
				icon: <TrendingUp />,
				increase: "+25%",
			},
			{
				title: "Total Customers",
				value: "1,250",
				icon: <Notifications />,
				increase: "+20%",
			},
			{
				title: "Pending Orders",
				value: "5",
				icon: <ShoppingCart />,
				increase: "-10%",
			},
		],
		[]
	);

	const recentTransactions = useMemo(
		() => [
			{
				id: 1,
				customer: "Juan Dela Cruz",
				amount: "₱1,200",
				time: "5 mins ago",
				status: "completed",
			},
			{
				id: 2,
				customer: "Maria Santos",
				amount: "₱3,450",
				time: "15 mins ago",
				status: "completed",
			},
			{
				id: 3,
				customer: "Pedro Garcia",
				amount: "₱890",
				time: "1 hour ago",
				status: "pending",
			},
			{
				id: 4,
				customer: "Ana Reyes",
				amount: "₱2,100",
				time: "2 hours ago",
				status: "completed",
			},
		],
		[]
	);

	const salesData = useMemo(
		() => [
			{ name: "Mon", sales: 4000 },
			{ name: "Tue", sales: 3000 },
			{ name: "Wed", sales: 5000 },
			{ name: "Thu", sales: 2780 },
			{ name: "Fri", sales: 4890 },
			{ name: "Sat", sales: 6390 },
			{ name: "Sun", sales: 3490 },
		],
		[]
	);

	const categoryData = useMemo(
		() => [
			{ name: "Electronics", value: 35 },
			{ name: "Clothing", value: 25 },
			{ name: "Food", value: 20 },
			{ name: "Others", value: 20 },
		],
		[]
	);

	const recentActivities = useMemo(
		() => [
			{ id: 1, action: "User John Doe logged in", time: "10 mins ago" },
			{ id: 2, action: "User Jane Smith updated profile", time: "30 mins ago" },
			{ id: 3, action: "User Mark Lee placed an order", time: "1 hour ago" },
			{ id: 4, action: "User Anna Brown logged out", time: "2 hours ago" },
		],
		[]
	);

	const topProducts = useMemo(
		() => [
			{ id: 1, name: "Product A", sales: 100 },
			{ id: 2, name: "Product B", sales: 80 },
			{ id: 3, name: "Product C", sales: 60 },
			{ id: 4, name: "Product D", sales: 40 },
		],
		[]
	);

	const COLORS = ["#FF5722", "#FF7043", "#FF8A65", "#FFAB91"];

	const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

	const scaleIn = keyframes`
    from {
      transform: scale(0.9);
    }
    to {
      transform: scale(1);
    }
  `;

	const slideIn = keyframes`
    from {
      transform: translateX(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  `;

	const cardStyles = {
		bgcolor: "rgba(255, 255, 255, 0.95)",
		boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
		transition: "all 0.3s ease",
		animation: `${fadeIn} 0.5s ease-out`,
		"&:hover": {
			transform: "translateY(-5px)",
			boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
		},
	};

	const listItemStyles = {
		transition: "all 0.2s ease",
		"&:hover": {
			bgcolor: "rgba(255, 87, 34, 0.05)",
			transform: "scale(1.01)",
		},
	};

	const chartContainerStyles = {
		animation: `${scaleIn} 0.5s ease-out`,
		transition: "all 0.3s ease",
		"&:hover": {
			transform: "scale(1.02)",
			boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
		},
	};

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "100%",
				overflow: "hidden",
				animation: `${fadeIn} 0.8s ease-out`,
			}}>
			<Typography
				variant="h4"
				sx={{
					mb: 4,
					color: "#FF5722",
					fontWeight: "bold",
					animation: `${slideIn} 0.8s ease-out`,
				}}>
				Welcome to the Dashboard
			</Typography>

			{/* Stats Cards */}
			<Grid container spacing={3} sx={{ mb: 4 }}>
				{stats.map((stat, index) => (
					<Grid item xs={12} sm={6} md={3} key={index}>
						<Card
							sx={{
								...cardStyles,
								animationDelay: `${index * 0.1}s`,
							}}>
							<CardContent>
								<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
									<Box
										sx={{
											p: 1,
											borderRadius: "50%",
											bgcolor: "rgba(255, 87, 34, 0.1)",
											color: "#FF5722",
											mr: 2,
										}}>
										{stat.icon}
									</Box>
									<Typography variant="h6" component="div">
										{stat.title}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}>
									<Typography
										variant="h4"
										component="div"
										sx={{ fontWeight: "bold" }}>
										{stat.value}
									</Typography>
									<Typography
										variant="body2"
										sx={{
											color: stat.increase.startsWith("+")
												? "success.main"
												: "error.main",
											display: "flex",
											alignItems: "center",
										}}>
										{stat.increase.startsWith("+") ? (
											<ArrowUpward fontSize="small" />
										) : (
											<ArrowDownward fontSize="small" />
										)}
										{stat.increase}
									</Typography>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>

			{/* Sales Chart */}
			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid item xs={12} md={8}>
					<Paper
						sx={{
							...chartContainerStyles,
							p: 3,
							height: "400px",
						}}>
						<Typography variant="h6" sx={{ mb: 2, color: "#FF5722" }}>
							Weekly Sales Overview
						</Typography>
						<ResponsiveContainer width="100%" height="90%">
							<LineChart data={salesData}>
								<CartesianGrid strokeDasharray="3 3" stroke="#eee" />
								<XAxis dataKey="name" stroke="#666" />
								<YAxis stroke="#666" />
								<Tooltip
									contentStyle={{
										backgroundColor: "rgba(255, 255, 255, 0.95)",
										border: "none",
										borderRadius: "4px",
										boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
									}}
								/>
								<Line
									type="monotone"
									dataKey="sales"
									stroke="#FF5722"
									strokeWidth={2}
									dot={{ r: 3 }}
									activeDot={{ r: 5 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper
						sx={{
							...chartContainerStyles,
							p: 3,
							height: "400px",
						}}>
						<Typography variant="h6" sx={{ mb: 2, color: "#FF5722" }}>
							Sales by Category
						</Typography>
						<ResponsiveContainer width="100%" height="70%">
							<PieChart>
								<Pie
									data={categoryData}
									cx="50%"
									cy="50%"
									innerRadius={60}
									outerRadius={80}
									paddingAngle={5}
									dataKey="value">
									{categoryData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={COLORS[index % COLORS.length]}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 1,
								justifyContent: "center",
							}}>
							{categoryData.map((category, index) => (
								<Chip
									key={category.name}
									label={`${category.name}: ${category.value}%`}
									sx={{
										bgcolor: COLORS[index],
										color: "white",
										transition: "all 0.2s ease",
										"&:hover": {
											transform: "scale(1.1)",
											boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
										},
										"& .MuiChip-label": {
											fontWeight: "bold",
										},
									}}
								/>
							))}
						</Box>
					</Paper>
				</Grid>
			</Grid>

			<Grid container spacing={3} sx={{ mb: 4 }}>
				<Grid item xs={12} md={4}>
					{/* Top Products Section */}
					<Paper
						sx={{
							p: 3,
							bgcolor: "rgba(255, 255, 255, 0.95)",
							boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
							animation: `${fadeIn} 0.5s ease-out`,
							transition: "all 0.3s ease",
							"&:hover": {
								transform: "scale(1.01)",
								boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
							},
						}}>
						<Typography variant="h6" sx={{ mb: 2, color: "#FF5722" }}>
							Top Products
						</Typography>
						<List>
							{topProducts.map((product, index) => (
								<ListItem
									key={product.id}
									sx={{
										...listItemStyles,
										animation: `${slideIn} 0.5s ease-out`,
										animationDelay: `${index * 0.1}s`,
									}}>
									<ListItemText
										primary={product.name}
										secondary={`Sales: ${product.sales}`}
									/>
								</ListItem>
							))}
						</List>
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					{/* Recent Transactions Section */}
					<Paper
						sx={{
							p: 3,
							bgcolor: "rgba(255, 255, 255, 0.95)",
							boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
						}}>
						<Typography variant="h6" sx={{ mb: 2, color: "#FF5722" }}>
							Recent Transactions
						</Typography>
						<List>
							{recentTransactions.map((transaction, index) => (
								<ListItem
									key={transaction.id}
									sx={{
										...listItemStyles,
										animation: `${slideIn} 0.5s ease-out`,
										animationDelay: `${index * 0.1}s`,
									}}>
									<ListItemText
										primary={
											<Typography component="div">
												{transaction.customer}
											</Typography>
										}
										secondary={
											<Typography component="div" variant="body2">
												{transaction.time} - Status: {transaction.status}
											</Typography>
										}
									/>
									<Typography
										variant="body2"
										sx={{ color: "#FF5722", fontWeight: "bold" }}>
										{transaction.amount}
									</Typography>
								</ListItem>
							))}
						</List>
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					{/* Recent Activities Section */}
					<Paper
						sx={{
							p: 3,
							bgcolor: "rgba(255, 255, 255, 0.95)",
							boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
						}}>
						<Typography variant="h6" sx={{ mb: 2, color: "#FF5722" }}>
							Recent Activities
						</Typography>
						<List>
							{recentActivities.map((activity, index) => (
								<ListItem
									key={activity.id}
									sx={{
										...listItemStyles,
										animation: `${slideIn} 0.5s ease-out`,
										animationDelay: `${index * 0.1}s`,
									}}>
									<ListItemText
										primary={
											<Typography component="div">{activity.action}</Typography>
										}
										secondary={
											<Typography component="div" variant="body2">
												{activity.time}
											</Typography>
										}
									/>
								</ListItem>
							))}
						</List>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
});

export default DashboardContent;
