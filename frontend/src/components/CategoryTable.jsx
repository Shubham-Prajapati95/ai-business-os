import {
 formatIndianCurrency
}
from "../lib/formatters";

function CategoryTable({
 data
}){

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

   <div
    className="
    mb-4
    flex
    items-end
    justify-between
    gap-4
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
      Top categories by revenue
     </h2>

     <p
      className="
      mt-1
      text-sm
      text-slate-500
      "
     >
      A quick leaderboard to seed useful category comparisons.
     </p>
    </div>
   </div>

   <table
    className="
    w-full
    "
   >

    <thead>

     <tr>

      <th
       className="
       border-b
       border-slate-200
       pb-3
       text-left
       text-xs
       font-semibold
       uppercase
       tracking-[0.18em]
       text-slate-500
       "
      >
       Category
      </th>

      <th
       className="
       border-b
       border-slate-200
       pb-3
       text-right
       text-xs
       font-semibold
       uppercase
       tracking-[0.18em]
       text-slate-500
       "
      >
       Revenue
      </th>

     </tr>

    </thead>

    <tbody>

     {

      data.map(
       (item,index)=>(
        <tr
         key={index}
         className="
         border-b
         border-slate-100
         last:border-b-0
         "
        >

         <td
          className="
          py-3
          text-sm
          font-medium
          text-slate-800
          "
         >
          {item.category_name}
         </td>

         <td
          className="
          py-3
          text-right
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
         </td>

        </tr>
       )
      )

     }

    </tbody>

   </table>

  </div>

 );

}

export default CategoryTable;
