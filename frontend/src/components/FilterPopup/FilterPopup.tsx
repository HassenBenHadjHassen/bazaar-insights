import React, { useCallback } from "react";
import "./FilterPopup.css";
import {
  BazaarProducts,
  ComparisonType,
  FilterParams,
} from "../../utils/types";
import { GuestViewModel } from "../../viewModels/Guestpage/GuestViewModel";
import { priceFormatUpdate } from "../../utils/priceFormatUpdate";

interface FilterPopupProps {
  filters: FilterParams;
  setFilters: React.Dispatch<React.SetStateAction<FilterParams>>;
  editing: {
    active: boolean;
    name: null;
  };
  setEditing: React.Dispatch<
    React.SetStateAction<{
      active: boolean;
      name: null;
    }>
  >;
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
  inputComparison: ComparisonType;
  setInputComparison: React.Dispatch<React.SetStateAction<ComparisonType>>;
  setShowFilterPopup: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setItems: React.Dispatch<React.SetStateAction<BazaarProducts[]>>;
  filterAttempts: number;
  setFilterAttempts: React.Dispatch<React.SetStateAction<number>>;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  filters,
  setFilters,
  editing,
  setEditing,
  inputValue,
  setInputValue,
  inputComparison,
  setInputComparison,
  setShowFilterPopup,
  setLoading,
  setItems,
  filterAttempts,
  setFilterAttempts,
}) => {
  const viewModel = GuestViewModel.GetInstance();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      viewModel.handleInputChange(e, setFilters),
    [viewModel, setFilters]
  );

  const resetFilters = useCallback(viewModel.resetFilters, []);

  const applyFilters = useCallback(() => {
    viewModel.applyFilters(
      setShowFilterPopup,
      filterAttempts,
      setFilterAttempts,
      setLoading,
      setItems
    );
  }, [filters]);

  // Render individual filter row
  const renderFilterRow = (
    label: string,
    name: keyof FilterParams,
    max: string
  ) => (
    <div className="filterpopup_row" key={name}>
      <label>{label}</label>
      <input
        type="range"
        min="0"
        max={max}
        value={filters[name].value}
        name={name}
        onChange={handleInputChange}
      />
      {editing.active && editing.name === name ? (
        <input
          className="filterpopup_span_input"
          value={inputValue}
          onChange={(e) =>
            viewModel.handleInputManualChange(
              e,
              setInputValue,
              editing,
              setFilters
            )
          }
          onBlur={() =>
            viewModel.handleEditSave(
              +max,
              editing,
              inputValue,
              inputComparison,
              setFilters,
              setEditing,
              setInputValue
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              viewModel.handleEditSave(
                +max,
                editing,
                inputValue,
                inputComparison,
                setFilters,
                setEditing,
                setInputValue
              );
            }
          }}
          autoFocus
        />
      ) : (
        <span
          onClick={() =>
            viewModel.handleEditStart(name, setEditing, setInputValue, filters)
          }
        >
          {priceFormatUpdate(filters[name].value ?? 0)}
        </span>
      )}
      <select
        value={filters[name].comparison}
        onChange={(e) =>
          viewModel.handleComparisonChange(
            e,
            name,
            setInputComparison,
            setFilters
          )
        }
      >
        <option value=">=">Greater Than or Equal To</option>
        <option value="<=">Less Than or Equal To</option>
        <option value="==">Equal To</option>
      </select>
    </div>
  );

  return (
    <div className="filterpopup">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div></div>
        <h2>Item Filters</h2>
        <span
          className="filterpopup_close"
          onClick={() => viewModel.closeFilters(setShowFilterPopup)}
        >
          x
        </span>
      </div>
      {renderFilterRow("buy Price", "buyPriceFilter", "100000000")}
      {renderFilterRow("sell Price", "sellPriceFilter", "100000000")}
      {renderFilterRow("buy Volume", "buyVolumeFilter", "100000000")}
      {renderFilterRow("sell Volume", "sellVolumeFilter", "100000000")}
      {renderFilterRow(
        "week Buy Transaction Volume",
        "weekBuyTransactionVolumeFilter",
        "1000000000"
      )}
      {renderFilterRow(
        "week Sell Transaction Volume",
        "weekSellTransactionVolumeFilter",
        "1000000000"
      )}
      {renderFilterRow("profit", "profitFilter", "1000000000")}
      {renderFilterRow("profit Margin", "profitMarginFilter", "100")}
      <div className="filterpopup_buttons">
        <button onClick={() => resetFilters(setFilters)}>Reset Filters</button>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
    </div>
  );
};

export default FilterPopup;
