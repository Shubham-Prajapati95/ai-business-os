import {
 useEffect,
 useState
}
from "react";

import {
 useNavigate
}
from "react-router-dom";

import {
 getTopProducts,
 getAllProducts,
 getProductTrend
}
from "../api/productApi";

import ProductTable
from "../components/ProductTable";

import ProductTrendChart
from "../components/ProductTrendChart";

import PeriodSelector
from "../components/PeriodSelector";

function ProductsPage(){

 const navigate =
 useNavigate();

 const [products,
 setProducts] =
 useState([]);

 const [allProducts,
 setAllProducts] =
 useState([]);

 const [selected,
 setSelected] =
 useState([]);

 const [trend,
 setTrend] =
 useState([]);

 const [period,
 setPeriod] =
 useState("monthly");

 useEffect(()=>{

  loadProducts();

 },[]);

 useEffect(()=>{

  if(
   selected.length
  ){

   loadTrend();

  }

 },[
   selected,
   period
 ]);

 const loadProducts =
 async()=>{

  const top =
  await getTopProducts();

  const all =
  await getAllProducts();

  setProducts(
   top.data
  );

  setAllProducts(
   all.data
  );

 };

 const loadTrend =
 async()=>{

  const result =
  await getProductTrend(
   selected,
   period
  );

  setTrend(
   result.data
  );

 };

 return(

  <div
   className="
   p-8
   bg-slate-100
   min-h-screen
   "
  >

   <div
    className="
    flex
    justify-between
    mb-6
    "
   >

    <h1
     className="
     text-3xl
     font-bold
     "
    >
     Product Analytics
    </h1>

    <button
     onClick={()=>
      navigate(
       "/dashboard"
      )
     }
    >
     Back
    </button>

   </div>

   <ProductTable
    data={products}
   />

   <div
    className="
    bg-white
    p-5
    rounded-xl
    shadow
    mt-6
    "
   >

    <h2>
     Select Products
    </h2>

    {

     allProducts.map(
      (item,index)=>(
       <label
        key={index}
        className="
        block
        "
       >

        <input
         type="checkbox"
         value={
          item.product_name
         }
         onChange={
          (e)=>{

           if(
            e.target.checked
           ){

            setSelected(
             prev=>[
              ...prev,
              e.target.value
             ]
            );

           }
           else{

            setSelected(
             prev=>
             prev.filter(
              p=>
              p!==e.target.value
             )
            );

           }

          }
         }
        />

        {
         item.product_name
        }

       </label>
      )
     )

    }

   </div>

   <div
    className="
    mt-6
    "
   >

    <PeriodSelector
     value={period}
     onChange={
      setPeriod
     }
    />

   </div>

   <div
    className="
    mt-6
    "
   >

    <ProductTrendChart
     data={trend}
    />

   </div>

  </div>

 );

}

export default ProductsPage;