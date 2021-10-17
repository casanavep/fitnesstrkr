import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Navbar = (props) => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    props.setToken(null);
    history.push("/");
    props.setUser(null);
  };
  return (
    <div id="header">
      <div id="headerTitle">Fitness Tracker</div>
      <div id="headerNavHome">
        {props.user && (
          <Link className="routerLink" to="/">
            Home
          </Link>
        )}
        {!props.user && (
          <Link className="routerLink" to="/">
            {/* Passing nothing, hiding Home since not logged in */}
          </Link>
        )}
      </div>
      <div id="headerNavRoutines">
        <Link className="routerLink" to="/routines">
          Routines
        </Link>
      </div>
      <div id="headerNavMyRoutines">
        {props.user && (
          <Link className="routerLink" to="/my-routines">
            My Routines
          </Link>
        )}
      </div>
      <div id="headerNavActivities">
        <Link className="routerLink" to="/activities">
          Activities
        </Link>
      </div>
      <div id="headerUser">
        {!props.user && (
          <>
            <Link className="routerLink" to="/login">
              Login
            </Link>
            {"   "}
            <Link className="routerLink" to="/register">
              Register
            </Link>
          </>
        )}
        {props.user && (
          <a className="routerLink" onClick={logout}>
            Logout{"   "}
          </a>
        )}
      </div>
    </div>
  );
};
export default Navbar;
