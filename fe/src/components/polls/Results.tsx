import { Chart } from "react-google-charts";

const Results = ({ pollName, optionsData }) => {
  const chartOptions = {
    title: ` Result of ${pollName}`,
    width: 600,
    height: 400,
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
  };

  const COLOR = "color: #4285f4";
  const data = [
    ["Option", "No. of votes", { role: "annotation" }, { role: "style" }],
  ];

  optionsData.forEach(({ name, count }) =>
    data.push([name, parseInt(count), parseInt(count), COLOR])
  );

  return (
    <>
      <Chart
        data={data}
        options={chartOptions}
        chartType="BarChart"
        width={"100%"}
        height={"50rem"}
      />
    </>
  );
};

export default Results;
