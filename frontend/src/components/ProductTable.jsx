function ProductTable({
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
    Products
   </h2>

   <table
    className="
    w-full
    "
   >

    <thead>

     <tr>

      <th>
       Product
      </th>

      <th>
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
        >

         <td>
          {item.product_name}
         </td>

         <td>
          ₹{
           Math.round(
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

export default ProductTable;