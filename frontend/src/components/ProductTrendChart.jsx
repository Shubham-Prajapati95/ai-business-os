import {
 ResponsiveContainer,
 LineChart,
 Line,
 XAxis,
 YAxis,
 Tooltip,
 CartesianGrid
}
from "recharts";

function ProductTrendChart({
 data
}){

 const transformed = [];

 data.forEach(row=>{

  let existing =
  transformed.find(
   item=>
   item.period===row.period
  );

  if(!existing){

   existing = {
    period: row.period
   };

   transformed.push(
    existing
   );

  }

  existing[
   row.product_name
  ] = row.revenue;

 });

 const products =
 [...new Set(
  data.map(
   d=>d.product_name
  )
 )];

 return(

  <div
   className="
   bg-white
   rounded-xl
   shadow
   p-5
   h-[500px]
   "
  >

   <ResponsiveContainer
    width="100%"
    height="100%"
   >

    <LineChart
     data={transformed}
    >

     <CartesianGrid
      strokeDasharray="3 3"
     />

     <XAxis
      dataKey="period"
     />

     <YAxis/>

     <Tooltip/>

     {

      products.map(
       product=>(
        <Line
         key={product}
         dataKey={product}
         strokeWidth={3}
        />
       )
      )

     }

    </LineChart>

   </ResponsiveContainer>

  </div>

 );

}

export default ProductTrendChart;