import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
}
from "recharts";

function RevenueChart({
  data
}){

  return(

    <div
      className="
      bg-white
      p-5
      rounded-xl
      shadow
      h-[450px]
      "
    >

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

          <YAxis/>

          <Tooltip/>

          <Line
            type="monotone"
            dataKey="revenue"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}

export default RevenueChart;