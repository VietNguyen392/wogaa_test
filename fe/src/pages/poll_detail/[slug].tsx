import React from "react";
import { useParams } from "react-router-dom";
import { GET, PATCH } from "../../utils/fetchMethod.ts";
import { useForm } from "react-hook-form";
import Results from "../../components/polls/Results.tsx";

const PollDetail = () => {
  const [state, setState] = React.useState({
    poll: {},
    options: [],
  });
  const { poll, options } = state;
  const user = JSON.parse(localStorage.getItem("auth"));
  const authorId = user.user["_id"];
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: `${authorId}`,
      optionsId: "",
    },
    mode: "onSubmit",
  });
  const { slug } = useParams();
  const onSubmit = async (data: object) => {
    const res = await PATCH(`voted/${slug}`, data).then((res) => res.json());
    console.log(res);
  };
  React.useEffect(() => {
    const pollDetail = async () => {
      const res = await GET(`poll/${slug}`).then((res) => res.json());
      setState((p) => ({
        ...p,
        poll: res["poll"],
        options: res["poll"]["options"],
      }));
    };
    pollDetail();
  }, []);

  return (
    <div className={"mt-3"}>
      <h1 className="text-center text-uppercase">{poll["title"]}</h1>
      <div className="row">
        <form className="col" onSubmit={handleSubmit(onSubmit)}>
          <ul className={"list-group"}>
            {poll["options"]?.map((item: object) => (
              <li key={item["_id"]} className={"list-group-item"}>
                <div className="form-check">
                  <input
                    type={"radio"}
                    value={item["_id"]}
                    className={"form-check-input"}
                    disabled={
                      authorId === poll["author"] ||
                      poll["user_voted"].includes(authorId)
                    }
                    id={item["name"]}
                    // checked={item["count"] !== 0}
                    {...register("optionsId")}
                  />
                  <label
                    className="form-check-label text-capitalize"
                    htmlFor={item["name"]}
                  >
                    {item["name"]}
                  </label>
                </div>
              </li>
            ))}
          </ul>
          <button className="btn btn-primary my-3" type={"submit"}>
            Voted
          </button>
        </form>
        <div className="mt-4">
          <h1 className="text-center">Results</h1>
          <Results pollName={poll["title"]} optionsData={options} />
        </div>
      </div>
    </div>
  );
};

export default PollDetail;
