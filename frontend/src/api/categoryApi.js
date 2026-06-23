import api from "./axios";

export const getTopCategories =
async(limit=5)=>{

 const response =
 await api.get(
 `/top-categories?limit=${limit}`
 );

 return response.data;
};

export const getAllCategories =
async()=>{

 const response =
 await api.get(
 "/all-categories"
 );

 return response.data;
};

export const getCategoryTrend =
async(categories,period)=>{

 const query =
 categories
 .map(
  c=>`categories=${c}`
 )
 .join("&");

 const response =
 await api.get(
 `/category-revenue-trend?${query}&period=${period}`
 );

 return response.data;
};