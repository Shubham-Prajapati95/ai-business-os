import { useEffect,useState }
from "react";

import { useNavigate }
from "react-router-dom";

import PeriodSelector
from "../components/PeriodSelector";

import CustomerTable
from "../components/CustomerTable";

import CustomerTrendChart
from "../components/CustomerTrendChart";

import CountryChart
from "../components/CountryChart";

import CityChart
from "../components/CityChart";

import {
 getTopCustomers,
 getAllCustomers,
 getCustomerTrend,
 getTopCountries,
 getTopCities
}
from "../api/customerApi";

function CustomersPage(){

 const navigate =
 useNavigate();

 const [limit,setLimit] =
 useState(5);

 const [period,setPeriod] =
 useState("monthly");

 const [customers,setCustomers] =
 useState([]);

 const [trend,setTrend] =
 useState([]);

 const [countries,setCountries] =
 useState([]);

 const [cities,setCities] =
 useState([]);

 useEffect(()=>{

  loadData();

 },[limit,period]);

 const loadData =
 async()=>{

  let customerData;

  if(limit==="all"){

   customerData =
   await getAllCustomers();

  }
  else{

   customerData =
   await getTopCustomers(
    limit
   );

  }

  const trendData =
  await getCustomerTrend(
   period
  );

  const countriesData =
  await getTopCountries();

  const citiesData =
  await getTopCities();

  setCustomers(
   customerData.data
  );

  setTrend(
   trendData.data
  );

  setCountries(
   countriesData.data
  );

  setCities(
   citiesData.data
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
    mb-8
    "
   >

    <h1
     className="
     text-3xl
     font-bold
     "
    >
     Customer Analytics
    </h1>

    <button
     onClick={()=>
      navigate(
       "/dashboard"
      )
     }
     className="
     bg-black
     text-white
     px-4
     py-2
     rounded
     "
    >
     Back
    </button>

   </div>

   <div
    className="
    flex
    gap-4
    mb-6
    "
   >

    <select
     value={limit}
     onChange={(e)=>
      setLimit(
       e.target.value
      )
     }
    >

     <option value="5">
      Top 5
     </option>

     <option value="10">
      Top 10
     </option>

     <option value="20">
      Top 20
     </option>

     <option value="all">
      All
     </option>

    </select>

    <PeriodSelector
     value={period}
     onChange={
      setPeriod
     }
    />

   </div>

   <CustomerTable
    data={customers}
   />

   <div
    className="
    mt-6
    "
   >

    <CustomerTrendChart
     data={trend}
    />

   </div>

   <div
    className="
    grid
    grid-cols-2
    gap-6
    mt-6
    "
   >

    <CountryChart
     data={countries}
    />

    <CityChart
     data={cities}
    />

   </div>

  </div>

 );

}

export default CustomersPage;