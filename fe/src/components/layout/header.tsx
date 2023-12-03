const Header = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2">
      <div className="container-fluid">
        <a className="navbar-brand">React Poll App</a>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/create">
                Create Poll
              </a>
            </li>
          </ul>
          <span className="navbar-text">
            <span className="me-3">Hello, {user.user.fullName} !</span>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                localStorage.removeItem("auth");
                window.location.reload();
              }}
            >
              Logout
            </button>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
