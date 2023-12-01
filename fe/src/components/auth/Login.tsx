const Login = () => {
  return (
    <div className="center">
      <form className="shadow-lg py-2 px-4 bg-white rounded ">
        <h1 className="text-center">Login</h1>
        <div className="my-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="text" className="form-control w-100" />
        </div>
      </form>
    </div>
  );
};

export default Login;
