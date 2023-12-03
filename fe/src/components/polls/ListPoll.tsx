import React from "react";
import { GET } from "../../utils/fetchMethod.ts";

const ListPoll = () => {
  const [polls, setPolls] = React.useState([]);
  React.useEffect(() => {
    const getListPoll = async () => {
      const res = await GET("polls").then((res) => res.json());
      setPolls(res["polls"]);
    };
    getListPoll();
  }, []);
  return (
    <div className={"row gx-5"}>
      {polls &&
        polls?.map((item: object) => (
          <div key={item["_id"]} className={"col my-3"}>
            <div className="card shadow-lg" style={{ width: "20rem" }}>
              <div className="card-body">
                <h3 className="card-title">{item["title"]}</h3>
                <a href={`/${item["_id"]}`} className={"card-link"}>
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListPoll;
