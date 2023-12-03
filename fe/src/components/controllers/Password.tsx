import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import { Controller, ControllerProps } from "react-hook-form";
type PasswordProps = Omit<ControllerProps, "render">;
const Password = (props: PasswordProps) => {
  const [show, setShow] = useState(false);
  return (
    <Controller
      render={({ field, fieldState }) => (
        <>
          <label className="form-label" htmlFor="password">
            Password <span className="text-danger">*</span>
          </label>
          <div className="input-group">
            <input
              type={show ? "text" : "password"}
              className="form-control"
              id="password"
              {...field}
            />
            <span className="input-group-text" onClick={() => setShow(!show)}>
              {show ? <IconEyeOff /> : <IconEye />}
            </span>
          </div>
          {fieldState.error && (
            <div className="form-text text-danger">
              {fieldState.error.message}
            </div>
          )}
        </>
      )}
      {...props}
    />
  );
};

export default Password;
