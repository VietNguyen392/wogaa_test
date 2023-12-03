import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hook/useAuth";


type loginProps = {
  changeTab: () => void;
};
type loginData = {
  email: string;
  password: string;
};
const Login = (props: loginProps) => {
  const [show, setShow] = useState(false);
const {handleLogin}=useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<loginData> = (data: object) => {
    handleLogin(data);
  };
  return (
    <div className="center">
      <form
        className="shadow-lg py-2 px-4 bg-white rounded "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center">Login</h1>
        <div className="my-3">
          <label htmlFor="email" className="form-label">
            Email<span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control w-100"
            id="email"
            {...register("email", { required: 'Email is required' })}
          />
          <small className="form-text text-danger">
            {errors.email && errors.email.message}
          </small>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <input
              type={show ? "text" : "password"}
              className="form-control"
              id="password"
              {...register("password", {
                required: 'Password is required',
                minLength:{
                  value:6,
                  message:'Password must have at least 6 character'
                }
              })}
            />
            <span className="input-group-text" onClick={() => setShow(!show)}>
              {show ? <IconEyeOff /> : <IconEye />}
            </span>
          </div>
          <small className="form-text text-danger">
            {errors.password && errors.password.message}
           
          </small>
        </div>
        <div className="my-2 d-flex align-item-center">
          <p>Don't have account ?</p>{" "}
          <button
            type="button"
            className="link_btn"
            onClick={() => props.changeTab()}
          >
            Register
          </button>
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">
         Login
        </button>
      </form>
    </div>
  );
};

export default Login;
