import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../../hook/useAuth";
type registerProp = {
  changeTab: () => void;
};
type registerData = {
  email: string;
  password: string;
  fullName: string;
};
const Register = (props: registerProp) => {
  const [show, setShow] = useState(false);
  const {loading,handleRegister}=useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerData>({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });
  const onSubmit: SubmitHandler<registerData> = (data: object) => {
   handleRegister(data);
  };
  return (
    <div className="center">
      <form
        className="shadow-lg py-2 px-4 bg-white rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center">Register</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control w-100"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
          <small className="form-text text-danger">
            {errors.email && errors.email.message}
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Full Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="fullname"
            {...register("fullName", {
              required: "Name is required",
              minLength: {
                value: 6,
                message: "Name must have at least 6 character",
              },
            })}
          />
          <small className="text-danger">
            {errors.fullName && errors.fullName.message}
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
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 character",
                },
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
          <p>Have account ?</p>{" "}
          <button
            type="button"
            className="link_btn"
            onClick={() => props.changeTab()}
          >
            Login
          </button>
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2" disabled={loading}>
          {loading?'Loading...':'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
