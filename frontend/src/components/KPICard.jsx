function KPICard({
  title,
  value,
  onClick
}){

  return(

    <div
      onClick={onClick}
      className="
      bg-white
      p-6
      rounded-xl
      shadow-md
      cursor-pointer
      hover:shadow-xl
      transition
      "
    >

      <h2
        className="
        text-gray-500
        text-sm
        "
      >
        {title}
      </h2>

      <h1
        className="
        text-3xl
        font-bold
        mt-3
        "
      >
        {value}
      </h1>

    </div>

  );
}

export default KPICard;