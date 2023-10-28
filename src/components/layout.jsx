import PropTypes from "prop-types";
import { Toaster } from "./ui/toaster";
function Layout({ children }) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}
export default Layout;

Layout.propTypes = {
  children: PropTypes.any,
};
