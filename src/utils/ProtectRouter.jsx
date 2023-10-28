import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRouter = ({ isLogged }) => {
  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRouter;
ProtectRouter.propTypes = {
  isLogged: PropTypes.any,
};
