import {
  useEffect,
  useState
}
from "react";

import {
  ArrowRight,
  ChartColumn,
  CircleAlert,
  RefreshCcw,
  TrendingDown,
  TrendingUp,
  Wallet
}
from "lucide-react";

import {
  useNavigate
}
from "react-router-dom";

import RevenueChart
from "../components/RevenueChart";

import PeriodSelector
from "../components/PeriodSelector";

import PeriodCard
from "../components/PeriodCard";

import {
  getRevenueTrend,
  getTotalRevenue
}
from "../api/revenueApi";

import {
  formatIndianCurrency
}
from "../lib/formatters";

import {
  getComparisonInsight,
  getPartialPeriodLabel,
  getRankedPeriods
}
from "../lib/revenueInsights";

function SummaryCard({
  eyebrow,
  title,
  value,
  note,
  tone = "slate"
}) {
  const toneClasses = {
    slate:
      "border-slate-200 bg-white text-slate-950",
    emerald:
      "border-emerald-200 bg-emerald-50 text-emerald-950",
    rose:
      "border-rose-200 bg-rose-50 text-rose-950"
  };

  return (
    <div
      className={`
      rounded-3xl
      border
      p-5
      shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]
      ${toneClasses[tone]}
      `}
    >
      <p
        className="
        text-xs
        font-semibold
        uppercase
        tracking-[0.22em]
        text-slate-500
        "
      >
        {eyebrow}
      </p>

      <div
        className="
        mt-3
        text-3xl
        font-semibold
        "
      >
        {value}
      </div>

      <p
        className="
        mt-2
        text-sm
        text-slate-600
        "
      >
        {title}
      </p>

      <p
        className="
        mt-3
        text-sm
        text-slate-500
        "
      >
        {note}
      </p>
    </div>
  );
}

function DrilldownCard({
  title,
  description,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white
      p-5
      text-left
      shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]
      transition
      hover:-translate-y-0.5
      hover:border-slate-300
      "
    >
      <div
        className="
        flex
        items-start
        justify-between
        gap-4
        "
      >
        <div>
          <h3
            className="
            text-lg
            font-semibold
            text-slate-950
            "
          >
            {title}
          </h3>

          <p
            className="
            mt-2
            text-sm
            leading-6
            text-slate-500
            "
          >
            {description}
          </p>
        </div>

        <ArrowRight
          className="
          mt-1
          h-4
          w-4
          text-slate-400
          "
        />
      </div>
    </button>
  );
}

function RevenuePage() {
  const navigate =
    useNavigate();

  const [period, setPeriod] =
    useState("monthly");

  const [trend, setTrend] =
    useState([]);

  const [totalRevenue,
    setTotalRevenue] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError("");

      try {
        const [
          revenueData,
          totalData
        ] = await Promise.all([
          getRevenueTrend(period),
          getTotalRevenue()
        ]);

        if (cancelled) {
          return;
        }

        setTrend(
          revenueData.data || []
        );

        setTotalRevenue(
          totalData.total_revenue || 0
        );
      }
      catch (err) {
        if (cancelled) {
          return;
        }

        console.error(err);
        setError(
          "Revenue analytics could not be loaded right now."
        );
      }
      finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [period]);

  const comparison =
    getComparisonInsight(
      trend,
      period
    );

  const rankings =
    getRankedPeriods(
      trend,
      period,
      new Date(),
      3
    );

  const changeValue =
    comparison.hasEnoughData &&
    comparison.changePercent !== null
      ? `${comparison.changePercent >= 0 ? "+" : ""}${
          comparison.changePercent.toFixed(1)
        }%`
      : "Not enough data";

  const changeNote =
    comparison.hasEnoughData
      ? comparison.hasIncompleteLatest
        ? `Using the last closed ${period.slice(0, -2)} period to avoid partial-period distortion.`
        : `${comparison.currentClosed.period} versus ${comparison.previousClosed.period}.`
      : "Add at least two closed periods to unlock a trustworthy comparison.";

  const comparisonLabel =
    comparison.hasEnoughData
      ? comparison.hasIncompleteLatest
        ? `Showing change for the latest closed period while the current ${getPartialPeriodLabel(period).toLowerCase()} is still accumulating.`
        : `${comparison.currentClosed.period} compared with ${comparison.previousClosed.period}.`
      : "This view becomes more useful once at least two closed periods are available.";

  const sparseData =
    trend.length > 0 &&
    !comparison.hasEnoughData;

  const partialLabel =
    comparison.hasIncompleteLatest
      ? `${getPartialPeriodLabel(period)} is still in progress`
      : "";

  return (
    <div
      className="
      min-h-screen
      bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_20%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)]
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
          bg-white/75
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
                Revenue workspace
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
                Read revenue faster and investigate with confidence
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
                Start with current revenue, compare it with the last closed period, and jump into the right drilldown when a spike or dip needs explanation.
              </p>
            </div>

            <div
              className="
              flex
              flex-wrap
              gap-3
              "
            >
              <PeriodSelector
                value={period}
                onChange={setPeriod}
              />

              <button
                onClick={() =>
                  navigate("/dashboard")
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
          </div>

          {error ? (
            <div
              className="
              mt-6
              rounded-3xl
              border
              border-rose-200
              bg-rose-50
              p-5
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
                <div
                  className="
                  flex
                  gap-3
                  "
                >
                  <CircleAlert
                    className="
                    mt-0.5
                    h-5
                    w-5
                    text-rose-600
                    "
                  />

                  <div>
                    <h2
                      className="
                      text-lg
                      font-semibold
                      text-rose-950
                      "
                    >
                      Revenue data is temporarily unavailable
                    </h2>

                    <p
                      className="
                      mt-1
                      text-sm
                      text-rose-700
                      "
                    >
                      {error} Try again and we will reload the workspace.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    window.location.reload()
                  }
                  className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-rose-300
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-rose-700
                  "
                >
                  <RefreshCcw
                    className="
                    h-4
                    w-4
                    "
                  />
                  Retry
                </button>
              </div>
            </div>
          ) : null}

          {loading ? (
            <div
              className="
              mt-6
              grid
              gap-4
              md:grid-cols-2
              xl:grid-cols-4
              "
            >
              {[0, 1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                  h-40
                  animate-pulse
                  rounded-3xl
                  bg-slate-200/70
                  "
                />
              ))}
            </div>
          ) : (
            <>
              <div
                className="
                mt-6
                grid
                gap-4
                md:grid-cols-2
                xl:grid-cols-4
                "
              >
                <SummaryCard
                  eyebrow="Current total"
                  title="All recorded revenue"
                  value={`₹${
                    formatIndianCurrency(
                      totalRevenue
                    )
                  }`}
                  note="Indian-number formatting is applied across the workspace for faster scanning."
                />

                <SummaryCard
                  eyebrow="Change vs previous"
                  title="Latest closed period movement"
                  value={changeValue}
                  note={changeNote}
                  tone={
                    comparison.direction === "down"
                      ? "rose"
                      : comparison.direction === "up"
                        ? "emerald"
                        : "slate"
                  }
                />

                <SummaryCard
                  eyebrow="Best period"
                  title={
                    rankings.best[0]
                      ? rankings.best[0].period
                      : "No completed period yet"
                  }
                  value={
                    rankings.best[0]
                      ? `₹${
                          formatIndianCurrency(
                            rankings.best[0].revenue
                          )
                        }`
                      : "--"
                  }
                  note="Best period is defined as the highest absolute revenue among completed periods."
                />

                <SummaryCard
                  eyebrow="Worst period"
                  title={
                    rankings.worst[0]
                      ? rankings.worst[0].period
                      : "No completed period yet"
                  }
                  value={
                    rankings.worst[0]
                      ? `₹${
                          formatIndianCurrency(
                            rankings.worst[0].revenue
                          )
                        }`
                      : "--"
                  }
                  note="Worst period is defined as the lowest absolute revenue among completed periods."
                />
              </div>

              {trend.length === 0 ? (
                <div
                  className="
                  mt-6
                  rounded-3xl
                  border
                  border-dashed
                  border-slate-300
                  bg-slate-50
                  p-8
                  "
                >
                  <h2
                    className="
                    text-xl
                    font-semibold
                    text-slate-950
                    "
                  >
                    No revenue data available for this grain yet
                  </h2>

                  <p
                    className="
                    mt-2
                    max-w-2xl
                    text-sm
                    leading-6
                    text-slate-500
                    "
                  >
                    Once orders accumulate for the selected period grain, this workspace will show trend, rankings, and drilldown paths.
                  </p>
                </div>
              ) : (
                <>
                  {sparseData ? (
                    <div
                      className="
                      mt-6
                      rounded-3xl
                      border
                      border-amber-200
                      bg-amber-50
                      p-5
                      "
                    >
                      <div
                        className="
                        flex
                        gap-3
                        "
                      >
                        <ChartColumn
                          className="
                          mt-0.5
                          h-5
                          w-5
                          text-amber-700
                          "
                        />

                        <div>
                          <h2
                            className="
                            text-lg
                            font-semibold
                            text-amber-950
                            "
                          >
                            Trend interpretation is still limited
                          </h2>

                          <p
                            className="
                            mt-1
                            text-sm
                            text-amber-800
                            "
                          >
                            We need at least two closed periods before the change card becomes a trustworthy comparison.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div
                    className="
                    mt-6
                    grid
                    gap-6
                    xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]
                    "
                  >
                    <RevenueChart
                      data={trend}
                      comparisonLabel={
                        comparisonLabel
                      }
                      partialLabel={
                        partialLabel
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
                        bg-slate-950
                        p-5
                        text-white
                        shadow-[0_24px_60px_-36px_rgba(15,23,42,0.45)]
                        "
                      >
                        <div
                          className="
                          flex
                          items-center
                          gap-3
                          "
                        >
                          {comparison.direction === "down" ? (
                            <TrendingDown
                              className="
                              h-5
                              w-5
                              text-rose-300
                              "
                            />
                          ) : (
                            <TrendingUp
                              className="
                              h-5
                              w-5
                              text-emerald-300
                              "
                            />
                          )}

                          <p
                            className="
                            text-sm
                            font-medium
                            text-slate-200
                            "
                          >
                            Comparison cue
                          </p>
                        </div>

                        <p
                          className="
                          mt-4
                          text-2xl
                          font-semibold
                          "
                        >
                          {changeValue}
                        </p>

                        <p
                          className="
                          mt-2
                          text-sm
                          leading-6
                          text-slate-300
                          "
                        >
                          {comparisonLabel}
                        </p>
                      </div>

                      <PeriodCard
                        title="Best periods"
                        subtitle="Completed periods with the strongest absolute revenue."
                        data={rankings.best}
                        emptyMessage="Best-period ranking will appear after at least one closed period is available."
                      />

                      <PeriodCard
                        title="Worst periods"
                        subtitle="Completed periods with the weakest absolute revenue."
                        data={rankings.worst}
                        emptyMessage="Worst-period ranking will appear after at least one closed period is available."
                      />
                    </div>
                  </div>

                  <div
                    className="
                    mt-6
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
                      gap-3
                      lg:flex-row
                      lg:items-end
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
                          Investigate this signal
                        </h2>

                        <p
                          className="
                          mt-2
                          max-w-3xl
                          text-sm
                          leading-6
                          text-slate-500
                          "
                        >
                          When a period moves sharply, use the drilldown path that best explains whether the change came from products, categories, or customers.
                        </p>
                      </div>

                      <div
                        className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-slate-100
                        px-3
                        py-1.5
                        text-xs
                        font-medium
                        uppercase
                        tracking-[0.16em]
                        text-slate-500
                        "
                      >
                        <Wallet
                          className="
                          h-3.5
                          w-3.5
                          "
                        />
                        Revenue drilldown path
                      </div>
                    </div>

                    <div
                      className="
                      mt-5
                      grid
                      gap-4
                      md:grid-cols-3
                      "
                    >
                      <DrilldownCard
                        title="Investigate by product"
                        description="Use product analytics when you need to see which products created the spike, dip, or mix shift."
                        onClick={() =>
                          navigate("/products")
                        }
                      />

                      <DrilldownCard
                        title="Investigate by category"
                        description="Use category analytics when the signal looks broad and you want to identify which parts of the catalog moved."
                        onClick={() =>
                          navigate("/categories")
                        }
                      />

                      <DrilldownCard
                        title="Investigate by customer"
                        description="Use customer analytics when revenue movement may be driven by account concentration, geography, or buying behavior."
                        onClick={() =>
                          navigate("/customers")
                        }
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RevenuePage;
