import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import KPICard from "../components/KPICard";

import {
  getTotalRevenue
} from "../api/revenueApi";

import {
  getTopCustomers
} from "../api/customerApi";

import {
  getTopProducts
} from "../api/productApi";

import {
  getTopCategories
} from "../api/categoryApi";

import {
  formatIndianCurrency
} from "../lib/formatters";

function Dashboard(){
  const navigate = useNavigate();
  
  const [revenue,setRevenue] =
    useState(0);

  const [customer,setCustomer] =
    useState("");

  const [product,setProduct] =
    useState("");

  const [category,setCategory] =
    useState("");

  useEffect(()=>{

    loadDashboard();

  },[]);

  const loadDashboard =
    async()=>{

      const rev =
        await getTotalRevenue();

      const cust =
        await getTopCustomers();

      const prod =
        await getTopProducts();

      const cat =
        await getTopCategories();

      setRevenue(
        rev.total_revenue
      );

      setCustomer(
        cust.data[0]?.customer_name
      );

      setProduct(
        prod.data[0]?.product_name
      );

      setCategory(
        cat.data[0]?.category_name
      );

    };

  return(

    <div
      className="
      flex
      "
    >

      <Sidebar/>

      <div
        className="
        flex-1
        "
      >

        <Navbar/>

        <div
          className="
          p-8
          grid
          grid-cols-2
          gap-6
          "
        >

          <KPICard
            title="Revenue"
            value={`₹${
              formatIndianCurrency(
                revenue
              )
            }`}
            onClick={()=>
                navigate("/revenue")
              }
          />

          <KPICard
            title="Top Customer"
            value={customer}
             onClick={()=>
              navigate("/customers")
              }
          />

          <KPICard
           title="Top Product"
           value={product}
            onClick={() =>
             navigate("/products")
              }
           />
          <KPICard
           title="Top Category"
           value={category}
           onClick={() =>
            navigate("/categories")
           }
           />

        </div>

      </div>

    </div>

  );
}

export default Dashboard;
