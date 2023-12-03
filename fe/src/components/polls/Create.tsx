import { useForm, useFieldArray } from "react-hook-form";
import { IconPlus, IconBackspace } from "@tabler/icons-react";
import { POST } from "../../utils/fetchMethod.ts";
import { toast } from "react-toastify";

const Create = () => {
  const user = JSON.parse(localStorage.getItem("auth"));
  const authorId = user.user["_id"];
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { author: `${authorId}`, title: "", options: [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
    rules: { minLength: 2, maxLength: 5 },
  });
  const onSubmit = async (data: object) => {
    const res = await POST("create-poll", data).then((res) => res.json());
    if (res.code === 200) {
      toast.success("Create Success");
      reset();
    }
  };
  return (
    <>
      <div className={"center"}>
        <form
          className="shadow-lg rounded px-4 py-2 bg-white"
          style={{ width: "40rem" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center">Create a Poll</h1>
          <div className="mb-3 w-100">
            <label htmlFor="title" className="form-label">
              Title<span className="text-danger">*</span>
            </label>
            <input
              type="title"
              className="form-control w-100"
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            <small className="text-danger">
              {errors.title && errors.title.message}
            </small>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Options <span className="text-danger">*</span>
            </label>
            <br />
            <button
              className="btn btn-primary"
              type={"button"}
              disabled={fields.length === 5}
              onClick={() => append({ name: "" })}
            >
              <IconPlus /> Add Options
            </button>
            <ul className="list-group my-3">
              {fields.map((item, index) => (
                <li className="input-group my-2" key={item.id}>
                  <input
                    type={"text"}
                    className={"form-control"}
                    {...register(`options.${index}.name`, {
                      required: "Options Name is required",
                    })}
                    placeholder={"Options Name"}
                  />
                  <button
                    type={"button"}
                    className={"btn btn-danger"}
                    onClick={() => remove(index)}
                  >
                    Remove <IconBackspace />
                  </button>
                </li>
              ))}
            </ul>
            <small className="text-dager">
              {errors.options && errors.options.message}
            </small>
          </div>
          <button className="btn btn-primary w-100 mb-2" type={"submit"}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
