function PeriodSelector({
  value,
  onChange
}){

  return(

    <div
      className="
      inline-flex
      items-center
      gap-3
      rounded-2xl
      border
      border-slate-200
      bg-white
      px-3
      py-2.5
      shadow-sm
      "
    >

      <span
        className="
        text-xs
        font-semibold
        uppercase
        tracking-[0.18em]
        text-slate-500
        "
      >
        Grain
      </span>

      <select
        value={value}
        onChange={(e)=>
          onChange(
            e.target.value
          )
        }
        className="
        bg-transparent
        text-sm
        font-medium
        text-slate-900
        outline-none
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

    </div>

  );
}

export default PeriodSelector;
