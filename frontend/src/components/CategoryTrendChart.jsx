import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
}
from "recharts";

import {
  formatIndianCurrency
}
from "../lib/formatters";

function CategoryTrendChart({
  data
}) {

  const transformed = [];

  data.forEach((row) => {

    let existing =
      transformed.find(
        item =>
          item.period === row.period
      );

    if (!existing) {

      existing = {
        period: row.period
      };

      transformed.push(
        existing
      );

    }

    existing[
      row.category_name
    ] = row.revenue;

  });

  const categories =
    [...new Set(
      data.map(
        item =>
          item.category_name
      )
    )];

  const chartColors = [
    "#0f172a",
    "#2563eb",
    "#ea580c",
    "#059669",
    "#7c3aed"
  ];

  if (!categories.length) {

    return (

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
          Select at least one category from the slicer to see revenue trends here.
        </div>
      </div>

    );

  }

  return (

    <div
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-5
      h-[500px]
      shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]
      "
    >

      <div
        className="
        mb-4
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

        <p
          className="
          mt-1
          text-sm
          text-slate-500
          "
        >
          Compare category performance over time with Indian-number revenue formatting.
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="92%"
      >

        <LineChart
          data={transformed}
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
            formatter={(value) =>
              `₹${formatIndianCurrency(value)}`
            }
            contentStyle={{
              borderRadius: 16,
              border: "1px solid #e2e8f0",
              boxShadow: "0 16px 40px -24px rgba(15, 23, 42, 0.45)"
            }}
          />

          <Legend />

          {

            categories.map(
              (category, index) => (

                <Line
                  key={category}
                  dataKey={category}
                  stroke={
                    chartColors[
                      index %
                      chartColors.length
                    ]
                  }
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 5
                  }}
                />

              )
            )

          }

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default CategoryTrendChart;
