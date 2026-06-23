import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
}
from "recharts";

function CustomerTrendChart({
  data
}){

  return(

    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-5
      h-[400px]
      "
    >

      <h2
        className="
        text-xl
        font-bold
        mb-4
        "
      >
        New Customers Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <LineChart
          data={data}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="period"
          />

          <YAxis />

          <Tooltip />

          <Line
            dataKey="new_customers"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}

export default CustomerTrendChart;