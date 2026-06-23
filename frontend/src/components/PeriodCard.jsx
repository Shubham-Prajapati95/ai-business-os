function PeriodCard({
  title,
  data
}){

  return(

    <div
      className="
      bg-white
      rounded-xl
      shadow
      p-5
      "
    >

      <h2
        className="
        text-xl
        font-bold
        mb-4
        "
      >
        {title}
      </h2>

      {

        data.map((item,index)=>(

          <div
            key={index}
            className="
            flex
            justify-between
            py-2
            border-b
            "
          >

            <span>
              {item.period}
            </span>

            <span>
              ₹{Math.round(item.revenue)}
            </span>

          </div>

        ))

      }

    </div>

  );
}

export default PeriodCard;