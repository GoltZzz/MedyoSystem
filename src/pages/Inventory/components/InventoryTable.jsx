import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TablePagination,
	Chip,
	IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const getStatusColor = (quantity) => {
	switch (true) {
		case quantity === 0:
			return "error";
		case quantity <= 10:
			return "warning";
		default:
			return "success";
	}
};

const InventoryTable = ({
	items,
	onEdit,
	onDelete,
	page,
	rowsPerPage,
	onChangePage,
	onChangeRowsPerPage,
}) => {
	return (
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
				{items.map((item) => (
					<TableRow
						key={item._id}
						sx={{ "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" } }}>
						<TableCell>{item.name}</TableCell>
						<TableCell>{item.description}</TableCell>
						<TableCell>{item.category}</TableCell>
						<TableCell align="right">{item.quantity}</TableCell>
						<TableCell align="right">₱{item.price.toFixed(2)}</TableCell>
						<TableCell>
							<Chip
								label={
									item.quantity === 0
										? "Out of Stock"
										: item.quantity <= 10
										? "Low Stock"
										: "In Stock"
								}
								color={getStatusColor(item.quantity)}
								size="small"
								sx={{ minWidth: 100 }}
							/>
						</TableCell>
						<TableCell align="right">
							<IconButton
								size="small"
								sx={{ color: "#FF5722", mr: 1 }}
								onClick={() => onEdit(item)}>
								<Edit />
							</IconButton>
							<IconButton
								size="small"
								color="error"
								onClick={() => onDelete(item._id)}>
								<Delete />
							</IconButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
