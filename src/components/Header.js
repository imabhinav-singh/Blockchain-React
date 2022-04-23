import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { STATUS_CONFIG } from "../config";

const Header = ({ account, status, loading }) => {
  if (!loading) console.log(account, status, STATUS_CONFIG[status]);
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <div className="align-items-center col-md-2 col-sm-3 d-flex gap-4 mr-0 mx-3 navbar-brand">
        Hawkins
        {!loading ? (
          <div className="d-flex">
            <div className="px-3 status-div">{status}</div>
            <FontAwesomeIcon
              icon={STATUS_CONFIG[status].icon}
              className="ms-2"
            />
          </div>
        ) : null}
      </div>
      <div className="nav-link">
        <span id="account">{account}</span>
      </div>
    </nav>
  );
};

export default Header;
