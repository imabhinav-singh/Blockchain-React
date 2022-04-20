const Header = ({ account }) => {
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <div className="navbar-brand col-sm-3 col-md-2 mr-0">Hogwarts</div>
      <div className="nav-link">
        <span id="account">{account}</span>
      </div>
    </nav>
  );
};

export default Header;
