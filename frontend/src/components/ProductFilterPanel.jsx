import * as React from "react";

import {
  Search,
  X
} from "lucide-react";

import { Button } from "./ui/button";

function ProductFilterPanel({
  products,
  selected,
  onSelectedChange,
  suggestedProducts
}) {
  const selectionLimit =
    5;

  const [searchTerm,
    setSearchTerm] =
    React.useState("");

  const normalizedSearch =
    searchTerm
      .trim()
      .toLowerCase();

  const groupedProducts =
    products.reduce(
      (groups, product) => {
        const categoryName =
          product.category_name ||
          "Uncategorized";

        if (
          normalizedSearch &&
          !product.product_name
            .toLowerCase()
            .includes(normalizedSearch) &&
          !categoryName
            .toLowerCase()
            .includes(normalizedSearch)
        ) {
          return groups;
        }

        if (
          !groups[categoryName]
        ) {
          groups[categoryName] =
            [];
        }

        groups[categoryName].push(
          product
        );

        return groups;
      },
      {}
    );

  const categories =
    Object.entries(
      groupedProducts
    ).sort(
      ([left], [right]) =>
        left.localeCompare(right)
    );

  const handleToggle =
    (productName) => {
      const isSelected =
        selected.includes(
          productName
        );

      if (isSelected) {
        onSelectedChange(
          selected.filter(
            (item) =>
              item !==
              productName
          )
        );

        return;
      }

      if (
        selected.length >=
        selectionLimit
      ) {
        return;
      }

      onSelectedChange([
        ...selected,
        productName
      ]);
    };

  const handleSelectSuggested =
    () => {
      onSelectedChange(
        suggestedProducts
          .slice(0, selectionLimit)
          .map(
            (item) =>
              item.product_name
          )
      );
    };

  return (
    <aside
      className="
      rounded-3xl
      border
      border-slate-200
      bg-white/95
      p-5
      shadow-[0_24px_60px_-36px_rgba(15,23,42,0.5)]
      backdrop-blur
      lg:sticky
      lg:top-6
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
          <p
            className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.22em]
            text-slate-500
            "
          >
            Product slicer
          </p>

          <h2
            className="
            mt-2
            text-xl
            font-semibold
            text-slate-900
            "
          >
            Compare products
          </h2>
        </div>

        <div
          className="
          rounded-2xl
          bg-slate-100
          px-3
          py-2
          text-right
          "
        >
          <div
            className="
            text-lg
            font-semibold
            text-slate-900
            "
          >
            {selected.length}/{selectionLimit}
          </div>

          <div
            className="
            text-xs
            text-slate-500
            "
          >
            selected
          </div>
        </div>
      </div>

      <p
        className="
        mt-3
        text-sm
        leading-6
        text-slate-600
        "
      >
        Search a known product fast, or browse by category when you want to explore the catalog.
      </p>

      <div
        className="
        mt-4
        flex
        items-center
        gap-2
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        px-3
        "
      >
        <Search
          className="
          size-4
          text-slate-400
          "
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(
              event.target.value
            )
          }
          placeholder="Search products or categories"
          className="
          h-11
          w-full
          bg-transparent
          text-sm
          text-slate-900
          outline-none
          placeholder:text-slate-400
          "
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
        <Button
          variant="outline"
          size="sm"
          onClick={
            handleSelectSuggested
          }
        >
          Select top products
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            onSelectedChange([])
          }
          disabled={
            !selected.length
          }
        >
          Clear
        </Button>
      </div>

      <div
        className="
        mt-5
        space-y-4
        "
      >
        {selected.length > 0 ? (
          <div
            className="
            flex
            flex-wrap
            gap-2
            "
          >
            {selected.map(
              (productName) => (
                <button
                  key={productName}
                  onClick={() =>
                    handleToggle(
                      productName
                    )
                  }
                  className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-slate-900
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-white
                  "
                >
                  {productName}
                  <X
                    className="
                    size-3
                    "
                  />
                </button>
              )
            )}
          </div>
        ) : null}

        <div
          className="
          max-h-[32rem]
          space-y-4
          overflow-y-auto
          pr-1
          "
        >
          {categories.length ? (
            categories.map(
              ([categoryName, items]) => (
                <section
                  key={categoryName}
                  className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50/80
                  p-3
                  "
                >
                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    "
                  >
                    <div
                      className="
                      text-sm
                      font-semibold
                      text-slate-900
                      "
                    >
                      {categoryName}
                    </div>

                    <div
                      className="
                      rounded-full
                      bg-white
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      text-slate-500
                      "
                    >
                      {items.length}
                    </div>
                  </div>

                  <div
                    className="
                    mt-3
                    space-y-2
                    "
                  >
                    {items.map(
                      (item) => {
                        const isSelected =
                          selected.includes(
                            item.product_name
                          );

                        const isDisabled =
                          !isSelected &&
                          selected.length >=
                            selectionLimit;

                        return (
                          <label
                            key={
                              item.product_name
                            }
                            className={`
                            flex
                            cursor-pointer
                            items-center
                            justify-between
                            gap-3
                            rounded-2xl
                            border
                            px-3
                            py-2.5
                            transition
                            ${
                              isSelected
                                ? "border-slate-900 bg-slate-900 text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                            }
                            ${
                              isDisabled
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            }
                            `}
                          >
                            <div
                              className="
                              flex
                              items-center
                              gap-3
                              "
                            >
                              <input
                                type="checkbox"
                                checked={
                                  isSelected
                                }
                                onChange={() =>
                                  handleToggle(
                                    item.product_name
                                  )
                                }
                                disabled={
                                  isDisabled
                                }
                              />

                              <span
                                className="
                                text-sm
                                font-medium
                                "
                              >
                                {
                                  item.product_name
                                }
                              </span>
                            </div>

                            {isSelected ? (
                              <span
                                className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-slate-300
                                "
                              >
                                Active
                              </span>
                            ) : null}
                          </label>
                        );
                      }
                    )}
                  </div>
                </section>
              )
            )
          ) : (
            <div
              className="
              rounded-2xl
              border
              border-dashed
              border-slate-300
              p-6
              text-sm
              text-slate-500
              "
            >
              No products match this search.
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default ProductFilterPanel;
