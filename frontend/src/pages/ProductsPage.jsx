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

import ProductFilterPanel
from "../components/ProductFilterPanel";

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

 const selectedProducts =
 allProducts.filter(
  (item)=>
   selected.includes(
    item.product_name
   )
 );

 useEffect(()=>{

  loadProducts();

 },[]);

 useEffect(()=>{

  if(
   selected.length
  ){

   loadTrend();

  }
  else{

   setTrend([]);

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

  setSelected(
   top.data
   .slice(0,3)
   .map(
    (item)=>
     item.product_name
   )
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
   min-h-screen
   bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.18),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)]
   p-4
   lg:p-6
   xl:p-8
   "
  >

   <div
    className="
    mx-auto
    max-w-7xl
    "
   >

    <div
     className="
     rounded-[2rem]
     border
     border-white/70
     bg-white/70
     p-5
     shadow-[0_24px_80px_-36px_rgba(15,23,42,0.45)]
     backdrop-blur
     lg:p-6
     "
    >

     <div
      className="
      flex
      flex-col
      gap-4
      lg:flex-row
      lg:items-start
      lg:justify-between
      "
     >

      <div>
       <p
        className="
        text-xs
        font-semibold
        uppercase
        tracking-[0.26em]
        text-slate-500
        "
       >
        Product analytics
       </p>

       <h1
        className="
        mt-2
        text-3xl
        font-semibold
        text-slate-950
        lg:text-4xl
        "
       >
        Power your product comparisons
       </h1>

       <p
        className="
        mt-3
        max-w-3xl
        text-sm
        leading-6
        text-slate-600
        "
       >
        Use a slicer-style filter pane to search known products fast, browse by category, and compare revenue trends without losing context.
       </p>
      </div>

      <button
       onClick={()=>
        navigate(
         "/dashboard"
        )
       }
       className="
       rounded-2xl
       border
       border-slate-300
       bg-white
       px-4
       py-2.5
       text-sm
       font-medium
       text-slate-700
       shadow-sm
       transition
       hover:border-slate-400
       hover:text-slate-950
       "
      >
       Back to dashboard
      </button>
     </div>

     <div
      className="
      mt-6
      grid
      gap-4
      md:grid-cols-3
      "
     >

      <div
       className="
       rounded-3xl
       bg-slate-950
       p-5
       text-white
       "
      >
       <p
        className="
        text-sm
        text-slate-300
        "
       >
        Active comparison
       </p>

       <div
        className="
        mt-3
        text-3xl
        font-semibold
        "
       >
        {selected.length}
       </div>

       <p
        className="
        mt-2
        text-sm
        text-slate-400
        "
       >
        products selected for side-by-side analysis
       </p>
      </div>

      <div
       className="
       rounded-3xl
       border
       border-slate-200
       bg-white
       p-5
       "
      >
       <p
        className="
        text-sm
        text-slate-500
        "
       >
        Searchable catalog
       </p>

       <div
        className="
        mt-3
        text-3xl
        font-semibold
        text-slate-950
        "
       >
        {allProducts.length}
       </div>

       <p
        className="
        mt-2
        text-sm
        text-slate-500
        "
       >
        products available in the searchable catalog
       </p>
      </div>

      <div
       className="
       rounded-3xl
       border
       border-slate-200
       bg-white
       p-5
       "
      >
       <p
        className="
        text-sm
        text-slate-500
        "
       >
        Browsable categories
       </p>

       <div
        className="
        mt-3
        text-3xl
        font-semibold
        text-slate-950
        "
       >
        {
         new Set(
          allProducts.map(
           (item)=>
            item.category_name
          )
         ).size
        }
       </div>

       <p
        className="
        mt-2
        text-sm
        text-slate-500
        "
       >
        grouped sections available in the slicer
       </p>
      </div>
     </div>

     <div
      className="
      mt-6
      grid
      gap-6
      xl:grid-cols-[340px_minmax(0,1fr)]
      "
     >

      <ProductFilterPanel
       products={allProducts}
       selected={selected}
       onSelectedChange={
        setSelected
       }
       suggestedProducts={
        products
       }
      />

      <div
       className="
       space-y-6
       "
      >

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
         flex
         flex-col
         gap-4
         lg:flex-row
         lg:items-center
         lg:justify-between
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
           Comparison workspace
          </h2>

          <p
           className="
           mt-2
           text-sm
           text-slate-500
           "
          >
           Selected products stay visible while you shift between monthly, weekly, quarterly, and yearly views.
          </p>
         </div>

         <PeriodSelector
          value={period}
          onChange={
           setPeriod
          }
         />
        </div>

        <div
         className="
         mt-4
         flex
         flex-wrap
         gap-2
         "
        >
         {selectedProducts.length ? (
          selectedProducts.map(
           (item)=>(
            <div
             key={
              item.product_name
             }
             className="
             rounded-full
             border
             border-slate-200
             bg-slate-50
             px-3
             py-1.5
             text-sm
             text-slate-700
             "
            >
             <span
              className="
              font-medium
              "
             >
              {item.product_name}
             </span>
             {" "}
             <span
              className="
              text-slate-400
              "
             >
              {item.category_name}
             </span>
            </div>
           )
          )
         ) : (
          <div
           className="
           rounded-2xl
           border
           border-dashed
           border-slate-300
           px-4
           py-3
           text-sm
           text-slate-500
           "
          >
           Pick up to 5 products to unlock the comparison chart.
          </div>
         )}
        </div>
       </div>

       <ProductTable
        data={products}
       />

       <ProductTrendChart
        data={trend}
       />

      </div>
     </div>

    </div>

   </div>
  </div>

 );

}

export default ProductsPage;
