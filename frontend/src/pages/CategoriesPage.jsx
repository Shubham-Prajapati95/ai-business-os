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

import CategoryFilterPanel
from "../components/CategoryFilterPanel";

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

  const selectedCategories =
    allCategories.filter(
      (item) =>
        selected.includes(
          item.category_name
        )
    );

  useEffect(() => {

    loadCategories();

  }, []);

  useEffect(() => {

    if (
      selected.length
    ) {

      loadTrend();

    }
    else {

      setTrend([]);

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

      setSelected(
        top.data
          .slice(0, 3)
          .map(
            (item) =>
              item.category_name
          )
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
                Category analytics
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
                Power your category comparisons
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
                Use a slicer-style filter pane to search known categories fast and compare revenue trends without losing context.
              </p>
            </div>

            <button
              onClick={() =>
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
                categories selected for side-by-side analysis
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
                {allCategories.length}
              </div>

              <p
                className="
                mt-2
                text-sm
                text-slate-500
                "
              >
                categories available in the searchable catalog
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
                Revenue leaders
              </p>

              <div
                className="
                mt-3
                text-3xl
                font-semibold
                text-slate-950
                "
              >
                {categories.length}
              </div>

              <p
                className="
                mt-2
                text-sm
                text-slate-500
                "
              >
                top categories surfaced by revenue for quick comparisons
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

            <CategoryFilterPanel
              categories={allCategories}
              selected={selected}
              onSelectedChange={
                setSelected
              }
              suggestedCategories={
                categories
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
                      Selected categories stay visible while you shift between monthly, weekly, quarterly, and yearly views.
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
                  {selectedCategories.length ? (
                    selectedCategories.map(
                      (item) => (
                        <div
                          key={
                            item.category_name
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
                      Pick up to 5 categories to unlock the comparison chart.
                    </div>
                  )}
                </div>
              </div>

              <CategoryTable
                data={categories}
              />

              <CategoryTrendChart
                data={trend}
              />
            </div>
          </div>
        </div>

      </div>

    </div>

  );

}

export default CategoriesPage;
