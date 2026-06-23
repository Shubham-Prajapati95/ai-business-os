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
  getTopCategories,
  getAllCategories,
  getCategoryTrend
}
from "../api/categoryApi";

import CategoryTable
from "../components/CategoryTable";

import CategoryTrendChart
from "../components/CategoryTrendChart";

import PeriodSelector
from "../components/PeriodSelector";

function CategoriesPage() {

  const navigate =
    useNavigate();

  const [categories,
    setCategories] =
    useState([]);

  const [allCategories,
    setAllCategories] =
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

  useEffect(() => {

    loadCategories();

  }, []);

  useEffect(() => {

    if (
      selected.length
    ) {

      loadTrend();

    }

  }, [
    selected,
    period
  ]);

  const loadCategories =
    async () => {

      const top =
        await getTopCategories();

      const all =
        await getAllCategories();

      setCategories(
        top.data
      );

      setAllCategories(
        all.data
      );

    };

  const loadTrend =
    async () => {

      const result =
        await getCategoryTrend(
          selected,
          period
        );

      setTrend(
        result.data
      );

    };

  return (

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
          Category Analytics
        </h1>

        <button
          onClick={() =>
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

      <CategoryTable
        data={categories}
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

        <h2
          className="
          text-xl
          font-bold
          mb-4
          "
        >
          Select Categories
        </h2>

        {

          allCategories.map(
            (item, index) => (

              <label
                key={index}
                className="
                block
                py-1
                "
              >

                <input
                  type="checkbox"
                  value={
                    item.category_name
                  }
                  onChange={
                    (e) => {

                      if (
                        e.target.checked
                      ) {

                        setSelected(
                          prev => [
                            ...prev,
                            e.target.value
                          ]
                        );

                      }
                      else {

                        setSelected(
                          prev =>
                            prev.filter(
                              c =>
                                c !== e.target.value
                            )
                        );

                      }

                    }
                  }
                />

                <span
                  className="
                  ml-2
                  "
                >
                  {
                    item.category_name
                  }
                </span>

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

        <CategoryTrendChart
          data={trend}
        />

      </div>

    </div>

  );

}

export default CategoriesPage;