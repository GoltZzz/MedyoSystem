import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import LandingPage from "./components/Layout/LandingPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DashboardLayout from "./components/Layout/DashboardLayout";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import { isAuthenticated } from "./services/auth";
import DashboardContent from "./pages/Dashboard/DashboardContent";
import POSContent from "./pages/POS/POSContent";
import InventoryContent from "./pages/Inventory/InventoryContent";
import SalesReportContent from "./pages/SalesReport/SalesReportContent";

const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					margin: 0,
					padding: 0,
					display: "flex",
					minHeight: "100vh",
					width: "100%",
				},
			},
		},
	},
	globalStyles: {
		"& *": {
			backfaceVisibility: "hidden",
			WebkitFontSmoothing: "antialiased",
			MozOsxFontSmoothing: "grayscale",
		},
	},
});

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
	if (!isAuthenticated()) {
		// Redirect to landing page instead of login
		return <Navigate to="/" replace />;
	}
	return children;
};

// Public Route wrapper (redirects to landing page if already authenticated)
const PublicRoute = ({ children }) => {
	if (isAuthenticated()) {
		return <Navigate to="/" replace />;
	}
	return children;
};

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Routes>
					{/* Public landing page */}
					<Route path="/" element={<LandingPage />} />

					{/* Auth routes - redirect to landing if authenticated */}
					<Route
						path="/login"
						element={
							<PublicRoute>
								<LoginForm />
							</PublicRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<PublicRoute>
								<RegisterForm />
							</PublicRoute>
						}
					/>

					{/* Protected dashboard routes */}
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<DashboardLayout>
									<DashboardContent />
								</DashboardLayout>
							</ProtectedRoute>
						}
					/>

					<Route
						path="/pos"
						element={
							<ProtectedRoute>
								<DashboardLayout>
									<POSContent />
								</DashboardLayout>
							</ProtectedRoute>
						}
					/>

					<Route
						path="/inventory"
						element={
							<ProtectedRoute>
								<DashboardLayout>
									<InventoryContent />
								</DashboardLayout>
							</ProtectedRoute>
						}
					/>

					<Route
						path="/sales-report"
						element={
							<ProtectedRoute>
								<DashboardLayout>
									<SalesReportContent />
								</DashboardLayout>
							</ProtectedRoute>
						}
					/>

					{/* Redirect unknown routes to dashboard if authenticated, otherwise to landing page */}
					<Route
						path="*"
						element={
							isAuthenticated() ? (
								<Navigate to="/dashboard" replace />
							) : (
								<Navigate to="/" replace />
							)
						}
					/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
