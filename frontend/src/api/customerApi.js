import api from "./axios";

export const getTopCustomers =
async(limit=5)=>{

  const response =
  await api.get(
    `/top-customers?limit=${limit}`
  );

  return response.data;
};

export const getAllCustomers =
async()=>{

  const response =
  await api.get(
    "/all-customers"
  );

  return response.data;
};

export const getCustomerTrend =
async(interval)=>{

  const response =
  await api.get(
    `/new-customers-trend?interval=${interval}`
  );

  return response.data;
};

export const getTopCountries =
async(limit=5)=>{

  const response =
  await api.get(
    `/top-contries?limit=${limit}`
  );

  return response.data;
};

export const getTopCities =
async(limit=5)=>{

  const response =
  await api.get(
    `/top-cities?limit=${limit}`
  );

  return response.data;
};