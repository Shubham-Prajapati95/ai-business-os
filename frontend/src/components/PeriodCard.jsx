import {
  formatIndianCurrency
}
from "../lib/formatters";

function PeriodCard({
  title,
  subtitle,
  data,
  emptyMessage
}){

  return(

    <div
      className="
      border
      border-slate-200
      bg-white
      rounded-3xl
      p-5
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
          {title}
        </h2>

        {subtitle ? (
          <p
            className="
            mt-1
            text-sm
            text-slate-500
            "
          >
            {subtitle}
          </p>
        ) : null}

      </div>

      {data.length ? (

        data.map((item,index)=>(

          <div
            key={index}
            className="
            flex
            justify-between
            items-center
            gap-4
            py-3
            border-b
            border-slate-100
            last:border-b-0
            "
          >

            <div>
              <p
                className="
                text-sm
                font-medium
                text-slate-900
                "
              >
                {item.period}
              </p>

              <p
                className="
                mt-1
                text-xs
                uppercase
                tracking-[0.16em]
                text-slate-400
                "
              >
                Rank {index + 1}
              </p>
            </div>

            <span
              className="
              text-sm
              font-semibold
              text-slate-950
              "
            >
              ₹{
                formatIndianCurrency(
                  item.revenue
                )
              }
            </span>

          </div>

        ))

      ) : (
        <div
          className="
          rounded-3xl
          border
          border-dashed
          border-slate-300
          bg-slate-50
          p-6
          text-sm
          text-slate-500
          "
        >
          {emptyMessage}
        </div>
      )}

    </div>

  );
}

export default PeriodCard;
