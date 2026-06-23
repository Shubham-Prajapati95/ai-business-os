import api from "./axios";

export const getTotalRevenue =
async()=>{

  const response =
  await api.get(
    "/total-revenue"
  );

  return response.data;
};

export const getRevenueTrend =
async(interval)=>{

  const response =
  await api.get(
    `/revenue-over-time?interval=${interval}`
  );

  return response.data;
};

export const getTopPeriods =
async(interval,type)=>{

  const response =
  await api.get(
    `/top-periods?interval=${interval}&type=${type}`
  );

  return response.data;
};