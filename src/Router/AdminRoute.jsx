import { Navigate } from "react-router-dom";
import useRole from "../Hook/useRole";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole();

    if (isLoading) {
        return
    }

    return role === "admin" ? children : <Navigate to="/" replace />;
};

// Add prop types validation for AdminRoute
AdminRoute.propTypes = {
    children: PropTypes.node.isRequired, // Validate that children is required and is a node
};

export default AdminRoute;
