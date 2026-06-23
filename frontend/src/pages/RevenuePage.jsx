import { useEffect } from "react";
import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import RevenueChart
from "../components/RevenueChart";

import PeriodSelector
from "../components/PeriodSelector";

import PeriodCard
from "../components/PeriodCard";

import {
  getRevenueTrend,
  getTopPeriods
}
from "../api/revenueApi";

function RevenuePage(){

  const navigate =
  useNavigate();

  const [period,setPeriod] =
  useState("monthly");

  const [trend,setTrend] =
  useState([]);

  const [best,setBest] =
  useState([]);

  const [worst,setWorst] =
  useState([]);

  useEffect(()=>{

    loadData();

  },[period]);

  const loadData =
  async()=>{

    try{

      const revenueData =
      await getRevenueTrend(
        period
      );

      const bestData =
      await getTopPeriods(
        period,
        "best"
      );

      const worstData =
      await getTopPeriods(
        period,
        "worst"
      );

      setTrend(
        revenueData.data
      );

      setBest(
        bestData.data
      );

      setWorst(
        worstData.data
      );

    }
    catch(err){

      console.log(err);

    }

  };

  return(

    <div
      className="
      min-h-screen
      bg-slate-100
      "
    >

      <div
        className="
        p-8
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
            Revenue Analytics
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
            px-5
            py-2
            rounded-lg
            "
          >
            Back
          </button>

        </div>

        <div
          className="
          mb-6
          "
        >

          <PeriodSelector
            value={period}
            onChange={
              setPeriod
            }
          />

        </div>

        <RevenueChart
          data={trend}
        />

        <div
          className="
          grid
          grid-cols-2
          gap-6
          mt-6
          "
        >

          <PeriodCard
            title="Best Periods"
            data={best}
          />

          <PeriodCard
            title="Worst Periods"
            data={worst}
          />

        </div>

      </div>

    </div>

  );
}

export default RevenuePage;