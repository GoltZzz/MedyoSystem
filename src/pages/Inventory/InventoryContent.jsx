import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import {
	Box,
	Grid,
	Paper,
	Typography,
	TextField,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	InputAdornment,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TablePagination,
} from "@mui/material";
import {
	Add,
	Edit,
	Delete,
	Search,
	Warning,
	CheckCircle,
} from "@mui/icons-material";

const InventoryContent = () => {
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [sortOrder, setSortOrder] = useState("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [editItem, setEditItem] = useState(null);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		quantity: "",
		price: "",
		category: "",
	});

	const [inventoryItems, setInventoryItems] = useState([]);
	const [categories, setCategories] = useState([
		"All",
		"Meat",
		"Pasta",
		"Bread",
		"Dairy",
		"Basic Additives",
		"Seasoning(Dry)",
		"Oil",
		"Dressing",
		"Spices",
		"Dried Leaves",
		"Dips",
		"Cold Cuts",
		"Sauces",
		"Toppings",
		"Coating/Batter",
		"Baking",
		"Takeout Boxes",
		"Storage",
		"Cleaning",
	]);
	const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
	const [editingCategory, setEditingCategory] = useState(null);
	const [newCategory, setNewCategory] = useState("");

	useEffect(() => {
		const fetchInventoryItems = async () => {
			try {
				const response = await api.getInventory();
				setInventoryItems(response.data);
			} catch (error) {
				console.error("Error fetching inventory items:", error);
			}
		};

		fetchInventoryItems();
	}, []);

	const getStatusColor = (status) => {
		switch (status) {
			case "In Stock":
				return "success";
			case "Low Stock":
				return "warning";
			case "Out of Stock":
				return "error";
			default:
				return "default";
		}
	};

	const handleOpenDialog = (item = null) => {
		if (item) {
			setEditItem(item);
			setFormData({
				name: item.name,
				description: item.description,
				quantity: item.quantity,
				price: item.price,
				category: item.category,
			});
		} else {
			setEditItem(null);
			setFormData({
				name: "",
				description: "",
				quantity: "",
				price: "",
				category: "",
			});
		}
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setEditItem(null);
		setFormData({
			name: "",
			description: "",
			quantity: "",
			price: "",
			category: "",
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		try {
			if (editItem) {
				// Edit existing item
				const response = await api.updateInventoryItem(editItem._id, formData);
				setInventoryItems((prev) =>
					prev.map((item) =>
						item._id === editItem._id
							? {
									...item,
									...response.data,
							  }
							: item
					)
				);
			} else {
				// Add new item
				const response = await api.addInventoryItem(formData);
				setInventoryItems((prev) => [...prev, response.data]);
			}
			handleCloseDialog();
		} catch (error) {
			console.error("Error submitting inventory item:", error);
		}
	};

	const handleDelete = async (itemId) => {
		try {
			await api.deleteInventoryItem(itemId);
			setInventoryItems((prev) => prev.filter((item) => item._id !== itemId));
		} catch (error) {
			console.error("Error deleting inventory item:", error);
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleSort = (field) => {
		if (sortBy === field) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortBy(field);
			setSortOrder("asc");
		}
	};

	const handleOpenCategoryDialog = (category = null) => {
		setEditingCategory(category);
		setNewCategory(category || "");
		setCategoryDialogOpen(true);
	};

	const handleCloseCategoryDialog = () => {
		setCategoryDialogOpen(false);
		setEditingCategory(null);
		setNewCategory("");
	};

	const handleAddCategory = () => {
		if (newCategory && !categories.includes(newCategory)) {
			setCategories((prev) => [...prev, newCategory]);
			handleCloseCategoryDialog();
		}
	};

	const handleEditCategory = () => {
		if (newCategory && !categories.includes(newCategory)) {
			setCategories((prev) =>
				prev.map((cat) => (cat === editingCategory ? newCategory : cat))
			);
			// Update all items with the old category to use the new category name
			setInventoryItems((prev) =>
				prev.map((item) => ({
					...item,
					category: item.category === editingCategory ? newCategory : item.category,
				}))
			);
			handleCloseCategoryDialog();
		}
	};

	const handleDeleteCategory = (categoryToDelete) => {
		if (categoryToDelete !== "All") {
			setCategories((prev) => prev.filter((cat) => cat !== categoryToDelete));
			// Update all items with the deleted category to use "Uncategorized"
			setInventoryItems((prev) =>
				prev.map((item) => ({
					...item,
					category: item.category === categoryToDelete ? "Uncategorized" : item.category,
				}))
			);
		}
	};

	// Filter and sort the items
	const filteredItems = inventoryItems
		.filter((item) => {
			const matchesSearch = item.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesCategory =
				selectedCategory === "All" || item.category === selectedCategory;
			return matchesSearch && matchesCategory;
		})
		.sort((a, b) => {
			const multiplier = sortOrder === "asc" ? 1 : -1;
			if (sortBy === "name") {
				return multiplier * a.name.localeCompare(b.name);
			} else if (sortBy === "quantity") {
				return multiplier * (a.quantity - b.quantity);
			} else if (sortBy === "price") {
				return multiplier * (a.price - b.price);
			}
			return 0;
		});

	// Paginate the items
	const paginatedItems = filteredItems.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

	return (
		<Box sx={{ maxWidth: "100%", padding: "24px" }}>
			<Typography
				variant="h4"
				sx={{ mb: 4, color: "#FF5722", fontWeight: "bold" }}>
				Inventory Management
			</Typography>

			<Grid container spacing={3} sx={{ mb: 4 }}>
				{/* Summary Cards */}
				<Grid item xs={12} sm={6} md={4}>
					<Paper
						elevation={3}
						sx={{
							p: 3,
							height: "100%",
							bgcolor: "rgba(255, 255, 255, 0.9)",
							backdropFilter: "blur(10px)",
							boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
							transition: "transform 0.2s ease-in-out",
							"&:hover": {
								transform: "translateY(-4px)",
							},
						}}>
						<Typography
							variant="h6"
							sx={{
								color: "success.main",
								mb: 2,
								display: "flex",
								alignItems: "center",
							}}>
							<CheckCircle sx={{ mr: 1 }} />
							In Stock Items
						</Typography>
						<Typography variant="h4" sx={{ fontWeight: "medium" }}>
							42
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Paper
						elevation={3}
						sx={{
							p: 3,
							height: "100%",
							bgcolor: "rgba(255, 255, 255, 0.9)",
							backdropFilter: "blur(10px)",
							boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
							transition: "transform 0.2s ease-in-out",
							"&:hover": {
								transform: "translateY(-4px)",
							},
						}}>
						<Typography
							variant="h6"
							sx={{
								color: "warning.main",
								mb: 2,
								display: "flex",
								alignItems: "center",
							}}>
							<Warning sx={{ mr: 1 }} />
							Low Stock Items
						</Typography>
						<Typography variant="h4" sx={{ fontWeight: "medium" }}>
							13
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={4}>
					<Paper
						elevation={3}
						sx={{
							p: 3,
							height: "100%",
							bgcolor: "rgba(255, 255, 255, 0.9)",
							backdropFilter: "blur(10px)",
							boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
							transition: "transform 0.2s ease-in-out",
							"&:hover": {
								transform: "translateY(-4px)",
							},
						}}>
						<Typography
							variant="h6"
							sx={{
								color: "error.main",
								mb: 2,
								display: "flex",
								alignItems: "center",
							}}>
							<Delete sx={{ mr: 1 }} />
							Out of Stock Items
						</Typography>
						<Typography variant="h4" sx={{ fontWeight: "medium" }}>
							5
						</Typography>
					</Paper>
				</Grid>
			</Grid>

			{/* Inventory Table */}
			<Grid item xs={12}>
				<Paper
					elevation={3}
					sx={{
						p: { xs: 2, md: 3 },
						bgcolor: "rgba(255, 255, 255, 0.9)",
						backdropFilter: "blur(10px)",
						boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
					}}>
					<Box
						sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							gap: 2,
							mb: 3,
							alignItems: { xs: "stretch", md: "center" },
						}}>
						<TextField
							placeholder="Search inventory..."
							variant="outlined"
							size="small"
							sx={{ flexGrow: 1 }}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Search />
									</InputAdornment>
								),
							}}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<FormControl
							size="small"
							sx={{ minWidth: { xs: "100%", md: 200 } }}>
							<InputLabel>Category</InputLabel>
							<Select
								value={selectedCategory}
								label="Category"
								onChange={(e) => setSelectedCategory(e.target.value)}>
								{categories.map((category) => (
									<MenuItem key={category} value={category}>
										{category}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl
							size="small"
							sx={{ minWidth: { xs: "100%", md: 200 } }}>
							<InputLabel>Sort By</InputLabel>
							<Select
								value={sortBy}
								label="Sort By"
								onChange={(e) => handleSort(e.target.value)}>
								<MenuItem value="name">Name</MenuItem>
								<MenuItem value="quantity">Quantity</MenuItem>
								<MenuItem value="price">Price</MenuItem>
							</Select>
						</FormControl>
						<Button
							variant="contained"
							startIcon={<Add />}
							onClick={() => handleOpenDialog()}
							sx={{
								bgcolor: "#FF5722",
								"&:hover": { bgcolor: "#F4511E" },
								minWidth: { xs: "100%", md: "auto" },
							}}>
							Add Item
						</Button>
						<Button
							variant="outlined"
							onClick={() => handleOpenCategoryDialog()}
							sx={{
								color: "#FF5722",
								borderColor: "#FF5722",
								"&:hover": {
									bgcolor: "rgba(255, 87, 34, 0.04)",
									borderColor: "#F4511E",
								},
								minWidth: { xs: "100%", md: "auto" },
							}}>
							Manage Categories
						</Button>
					</Box>

					<TableContainer sx={{ maxHeight: 440, overflow: "auto" }}>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Description</TableCell>
									<TableCell>Category</TableCell>
									<TableCell align="right">Quantity</TableCell>
									<TableCell align="right">Price</TableCell>
									<TableCell>Status</TableCell>
									<TableCell align="right">Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{paginatedItems.map((item) => (
									<TableRow
										key={item._id}
										sx={{ "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" } }}>
										<TableCell>{item.name}</TableCell>
										<TableCell>{item.description}</TableCell>
										<TableCell>{item.category}</TableCell>
										<TableCell align="right">{item.quantity}</TableCell>
										<TableCell align="right">
											₱{item.price.toFixed(2)}
										</TableCell>
										<TableCell>
											<Chip
												label={
													item.quantity === 0
														? "Out of Stock"
														: item.quantity <= 10
														? "Low Stock"
														: "In Stock"
												}
												color={getStatusColor(
													item.quantity === 0
														? "Out of Stock"
														: item.quantity <= 10
														? "Low Stock"
														: "In Stock"
												)}
												size="small"
												sx={{ minWidth: 100 }}
											/>
										</TableCell>
										<TableCell align="right">
											<IconButton
												size="small"
												sx={{
													color: "#FF5722",
													mr: 1,
												}}
												onClick={() => handleOpenDialog(item)}>
												<Edit />
											</IconButton>
											<IconButton
												size="small"
												color="error"
												sx={{
													"&:hover": {
														bgcolor: "error.light",
														color: "white",
													},
												}}
												onClick={() => handleDelete(item._id)}>
												<Delete />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>

					<TablePagination
						component="div"
						count={filteredItems.length}
						page={page}
						onPageChange={handleChangePage}
						rowsPerPage={rowsPerPage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						rowsPerPageOptions={[5, 10, 25]}
					/>
				</Paper>
			</Grid>

			{/* Add/Edit Dialog */}
			<Dialog 
				open={openDialog} 
				onClose={handleCloseDialog}
				maxWidth="sm"
				fullWidth
				PaperProps={{
					sx: {
						borderRadius: 2,
						bgcolor: "background.paper",
						boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
					}
				}}
			>
				<DialogTitle sx={{ 
					pb: 1,
					borderBottom: "1px solid",
					borderColor: "divider",
					"& .MuiTypography-root": {
						fontSize: "1.5rem",
						fontWeight: 600,
						color: "#FF5722"
					}
				}}>
					{editItem ? "Edit Inventory Item" : "Add New Item"}
				</DialogTitle>
				<DialogContent sx={{ pt: 3 }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								label="Item Name"
								fullWidth
								variant="outlined"
								required
								autoFocus
								sx={{ "& .MuiOutlinedInput-root": {
									"&:hover fieldset": {
										borderColor: "#FF5722",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#FF5722",
									}
								}}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="description"
								value={formData.description}
								onChange={handleInputChange}
								label="Description"
								fullWidth
								variant="outlined"
								multiline
								rows={3}
								required
								sx={{ "& .MuiOutlinedInput-root": {
									"&:hover fieldset": {
										borderColor: "#FF5722",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#FF5722",
									}
								}}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								name="quantity"
								value={formData.quantity}
								onChange={handleInputChange}
								label="Quantity"
								type="number"
								fullWidth
								variant="outlined"
								required
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<Typography color="text.secondary">Qty</Typography>
										</InputAdornment>
									),
								}}
								sx={{ "& .MuiOutlinedInput-root": {
									"&:hover fieldset": {
										borderColor: "#FF5722",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#FF5722",
									}
								}}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								name="price"
								value={formData.price}
								onChange={handleInputChange}
								label="Price"
								type="number"
								fullWidth
								variant="outlined"
								required
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">₱</InputAdornment>
									),
								}}
								sx={{ "& .MuiOutlinedInput-root": {
									"&:hover fieldset": {
										borderColor: "#FF5722",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#FF5722",
									}
								}}}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControl 
								fullWidth 
								required
								sx={{ "& .MuiOutlinedInput-root": {
									"&:hover fieldset": {
										borderColor: "#FF5722",
									},
									"&.Mui-focused fieldset": {
										borderColor: "#FF5722",
									}
								}}}
							>
								<InputLabel>Category</InputLabel>
								<Select
									name="category"
									value={formData.category}
									onChange={handleInputChange}
									label="Category"
								>
									{categories
										.filter((category) => category !== "All")
										.map((category) => (
											<MenuItem key={category} value={category}>
												{category}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions sx={{ 
					px: 3, 
					py: 2,
					borderTop: "1px solid",
					borderColor: "divider",
					gap: 1
				}}>
					<Button 
						onClick={handleCloseDialog}
						variant="outlined"
						sx={{
							color: "#FF5722",
							borderColor: "#FF5722",
							"&:hover": {
								borderColor: "#F4511E",
								bgcolor: "rgba(255, 87, 34, 0.04)",
							},
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						variant="contained"
						disabled={
							!formData.name ||
							!formData.category ||
							!formData.quantity ||
							!formData.price
						}
						sx={{
							bgcolor: "#FF5722",
							"&:hover": { bgcolor: "#F4511E" },
							"&.Mui-disabled": {
								bgcolor: "rgba(255, 87, 34, 0.12)",
								color: "rgba(255, 87, 34, 0.26)",
							},
						}}
					>
						{editItem ? "Save Changes" : "Add Item"}
					</Button>
				</DialogActions>
			</Dialog>

			{/* Category Management Dialog */}
			<Dialog open={categoryDialogOpen} onClose={handleCloseCategoryDialog}>
				<DialogTitle>
					{editingCategory ? "Edit Category" : "Add New Category"}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Category Name"
						fullWidth
						variant="outlined"
						value={newCategory}
						onChange={(e) => setNewCategory(e.target.value)}
					/>
					{!editingCategory && (
						<Box sx={{ mt: 2 }}>
							<Typography variant="subtitle1" gutterBottom>
								Existing Categories:
							</Typography>
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
								{categories
									.filter((cat) => cat !== "All")
									.map((category) => (
										<Chip
											key={category}
											label={category}
											onDelete={() => handleDeleteCategory(category)}
											onClick={() => handleOpenCategoryDialog(category)}
											sx={{ margin: 0.5 }}
										/>
									))}
							</Box>
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseCategoryDialog}>Cancel</Button>
					<Button
						onClick={editingCategory ? handleEditCategory : handleAddCategory}
						variant="contained"
						sx={{ bgcolor: "#FF5722", "&:hover": { bgcolor: "#F4511E" } }}>
						{editingCategory ? "Save Changes" : "Add Category"}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default InventoryContent;
