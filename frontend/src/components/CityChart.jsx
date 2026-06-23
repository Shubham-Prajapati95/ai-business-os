function CityChart({
  data
}){

  return(

    <div
      className="
      bg-white
      shadow
      rounded-xl
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
        Top Cities
      </h2>

      {

        data.map(
          (city,index)=>(
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
                {city.city}
              </span>

              <span>
                {
                  city.total_customers
                }
              </span>

            </div>
          )
        )

      }

    </div>

  );
}

export default CityChart;