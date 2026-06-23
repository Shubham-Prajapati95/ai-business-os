function CountryChart({
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
        Top Countries
      </h2>

      {

        data.map(
          (country,index)=>(
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
                {country.country}
              </span>

              <span>
                {
                  country.total_customers
                }
              </span>

            </div>
          )
        )

      }

    </div>

  );
}

export default CountryChart;