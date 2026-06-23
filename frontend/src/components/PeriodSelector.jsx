function PeriodSelector({
  value,
  onChange
}){

  return(

    <select
      value={value}
      onChange={(e)=>
        onChange(
          e.target.value
        )
      }
      className="
      border
      rounded-lg
      p-2
      "
    >

      <option value="monthly">
        Monthly
      </option>

      <option value="weekly">
        Weekly
      </option>

      <option value="quarterly">
        Quarterly
      </option>

      <option value="yearly">
        Yearly
      </option>

    </select>

  );
}

export default PeriodSelector;