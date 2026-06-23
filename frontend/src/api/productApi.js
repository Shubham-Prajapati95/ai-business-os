import api from "./axios";

export const getTopProducts =
async(limit=5)=>{

 const response =
 await api.get(
  `/top-products?limit=${limit}`
 );

 return response.data;
};

export const getAllProducts =
async()=>{

 const response =
 await api.get(
  "/all-products"
 );

 return response.data;
};

export const getProductTrend =
async(products,period)=>{

 const query =
 products
 .map(
  p=>`products=${p}`
 )
 .join("&");

 const response =
 await api.get(
 `/product-revenue-trend?${query}&period=${period}`
 );

 return response.data;
};