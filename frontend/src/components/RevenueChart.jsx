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

import {
  formatIndianCurrency
}
from "../lib/formatters";

function RevenueChart({
  data,
  comparisonLabel,
  partialLabel
}){

  if(!data.length){

    return(

      <div
        className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]
        "
      >

        <h2
          className="
          text-xl
          font-semibold
          text-slate-950
          "
        >
          Revenue trend
        </h2>

        <div
          className="
          mt-4
          rounded-3xl
          border
          border-dashed
          border-slate-300
          bg-slate-50
          p-10
          text-center
          text-sm
          text-slate-500
          "
        >
          No revenue trend is available for this grain yet.
        </div>

      </div>

    );
  }

  return(

    <div
      className="
      border
      border-slate-200
      bg-white
      p-5
      rounded-3xl
      shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]
      h-[450px]
      "
    >

      <div
        className="
        mb-4
        flex
        flex-col
        gap-3
        lg:flex-row
        lg:items-start
        lg:justify-between
        "
      >

        <div>
          <h2
            className="
            text-xl
            font-semibold
            text-slate-950
            "
          >
            Revenue trend
          </h2>

          <p
            className="
            mt-1
            text-sm
            text-slate-500
            "
          >
            {comparisonLabel}
          </p>
        </div>

        {partialLabel ? (
          <div
            className="
            rounded-full
            border
            border-amber-200
            bg-amber-50
            px-3
            py-1
            text-xs
            font-medium
            text-amber-700
            "
          >
            {partialLabel}
          </div>
        ) : null}

      </div>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >

        <LineChart
          data={data}
          margin={{
            left: 12,
            right: 18,
            top: 16,
            bottom: 4
          }}
        >

          <CartesianGrid
            stroke="#e2e8f0"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="period"
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#64748b",
              fontSize: 12
            }}
          />

          <YAxis
            tickFormatter={
              formatIndianCurrency
            }
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "#64748b",
              fontSize: 12
            }}
          />

          <Tooltip
            formatter={(value)=>
              `₹${formatIndianCurrency(value)}`
            }
            contentStyle={{
              borderRadius: 16,
              border: "1px solid #e2e8f0",
              boxShadow: "0 16px 40px -24px rgba(15, 23, 42, 0.45)"
            }}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#0f172a"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 5
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}

export default RevenueChart;
