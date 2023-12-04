import React from "react";
import { useParams } from "react-router-dom";
import { GET, PATCH } from "../../utils/fetchMethod.ts";
import { useForm } from "react-hook-form";
import Results from "../../components/polls/Results.tsx";
import { toast } from "react-toastify";
import io from "socket.io-client";
const socket = io("http://localhost:6030");
const PollDetail = () => {
  const [state, setState] = React.useState({
    poll: {},
    options: [],
  });
  const { poll, options } = state;
  const user = JSON.parse(localStorage.getItem("auth"));
  const userId = user?.user["_id"];
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userId: `${userId}`,
      optionsId: "",
    },
    mode: "onSubmit",
  });
  const { slug } = useParams();
  const onSubmit = async (data: object) => {
    const res = await PATCH(`voted/${slug}`, data).then((res) => res.json());
    if (res.code === 200) {
      toast.success("Success");
      reset();
    }
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
  React.useEffect(() => {
    socket.emit("joinRoom", slug);
    socket.on("voted", (data) => {
      setState((p) => ({
        ...p,
        poll: data,
        options: data["options"],
      }));
    });
    return () => {
      socket.emit("outRoom", slug);
      socket.off("voted");
    };
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
                      role={"options_vote"}
                      value={item["_id"]}
                      className={"form-check-input"}
                      disabled={userId === poll["author"]||poll['user_voted']?.include(userId)}
                      id={item["name"]}
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
        {poll["user_voted"]?.length !== 0 && (
          <div className="mt-4">
            <h1 className="text-center">Results</h1>
            <Results pollName={poll["title"]} optionsData={options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PollDetail;
