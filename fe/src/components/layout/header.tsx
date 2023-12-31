const Header = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2">
      <div className="container-fluid">
        <a className="navbar-brand" href={"/"}>
          React Poll App
        </a>

        <div className="d-flex me-auto mb-2 mb-lg-0">
          <span className="nav-item mt-2 me-4">
            <a className="nav-link active" aria-current="page" href="/">
              Home
            </a>
          </span>
          <span className="nav-item mt-2">
            <a className="nav-link" href="/create">
              Create Poll
            </a>
          </span>
        </div>
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
    </nav>
  );
};

export default Header;
