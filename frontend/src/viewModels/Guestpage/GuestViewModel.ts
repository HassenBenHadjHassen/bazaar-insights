import {
  getGuest,
  registerGuest,
  updateGuest,
} from "../../services/guestService";
import { guestItems } from "../../services/itemsService";
import { GuestInfo } from "../../types/authTypes";
import {
  BazaarProducts,
  ComparisonType,
  FilterParams,
} from "../../utils/types";

// Type definitions for the setter functions
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export class GuestViewModel {
  private static instance: GuestViewModel;

  public DEFAULT_FILTERS: FilterParams = {
    buyPriceFilter: { value: 0, comparison: ">=" },
    sellPriceFilter: { value: 0, comparison: ">=" },
    buyVolumeFilter: { value: 0, comparison: ">=" },
    sellVolumeFilter: { value: 0, comparison: ">=" },
    weekBuyTransactionVolumeFilter: { value: 0, comparison: ">=" },
    weekSellTransactionVolumeFilter: { value: 0, comparison: ">=" },
    profitFilter: { value: 0, comparison: ">=" },
    profitMarginFilter: { value: 0, comparison: ">=" },
  };

  public static GetInstance = (): GuestViewModel => {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new GuestViewModel();
    return this.instance;
  };

  // getGuest method
  public getGuest = async (
    timeLeft: number,
    filterAttempts: number,
    setFilterAttempts: SetState<number>,
    setTimeLeft: SetState<number>
  ): Promise<void> => {
    const guest = await getGuest();

    if (!guest.success) {
      const data: GuestInfo = JSON.parse(guest.data);

      if (data) {
        setFilterAttempts(data.filterAttemptsRemaining);
        setTimeLeft(data.timeRemaining);
      }
    } else {
      await registerGuest(timeLeft, filterAttempts);
    }
  };

  public updateGuestFun = async (
    filterAttemptsRemaining: number,
    timeRemaining: number
  ) => {
    try {
      await updateGuest(timeRemaining, filterAttemptsRemaining);
    } catch (error) {
      console.log(error);
    }
  };

  // getGuestItems method
  public getGuestItems = async (
    filters: FilterParams,
    setLoading: SetState<boolean>,
    setItems: React.Dispatch<React.SetStateAction<BazaarProducts[]>>
  ): Promise<void> => {
    setLoading(true);
    const response = await guestItems(filters);

    if (response.success) {
      setItems(JSON.parse(response.data.message));
    } else {
      setItems([]);
    }
    setLoading(false);
  };

  // handleApplyFilterClick method
  private handleApplyFilterClick = (
    filterAttempts: number,
    setFilterAttempts: SetState<number>
  ): void => {
    if (filterAttempts > 0) {
      setFilterAttempts(filterAttempts - 1);
    }
  };

  // handleFilterClick method
  public handleFilterClick = (
    showFilterPopup: boolean,
    setShowFilterPopup: SetState<boolean>
  ): void => {
    setShowFilterPopup(!showFilterPopup);
  };

  // handleInputChange method
  public handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFilters: SetState<FilterParams>
  ): void => {
    const { name, value } = e.target;
    const filterName = name as keyof FilterParams;

    setFilters((prev) => ({
      ...prev,
      [filterName]: {
        ...prev[filterName],
        value: Number(value),
      },
    }));
  };

  // handleEditStart method
  public handleEditStart = (
    name: keyof FilterParams,
    setEditing: any,
    setInputValue: SetState<number>,
    filters: FilterParams
  ): void => {
    setEditing({ active: true, name });
    setInputValue(filters[name]?.value ?? 0);
  };

  // Utility function to convert shorthand to numeric value
  convertToNumber = (value: string): number => {
    const regex = /^(\d+)([kmb]?)$/i; // Regex to capture number and suffix
    const match = value.match(regex);

    if (match) {
      const numberPart = parseFloat(match[1]);
      const suffix = match[2].toLowerCase();

      switch (suffix) {
        case "k": // thousand
          return numberPart * 1000;
        case "m": // million
          return numberPart * 1000000;
        case "b": // billion
          return numberPart * 1000000000;
        default: // no suffix
          return numberPart;
      }
    }

    return 0; // return 0 if input doesn't match the pattern
  };

  // handleInputManualChange method
  public handleInputManualChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setInputValue: SetState<number>,
    editing: { active: boolean; name: keyof FilterParams | null },
    setFilters: SetState<FilterParams>
  ): void => {
    const { value } = e.target;
    const numericValue = this.convertToNumber(value);

    setInputValue(isNaN(numericValue) ? 0 : numericValue);

    if (editing.name) {
      setFilters((prev) => ({
        ...prev,
        [editing.name as keyof FilterParams]: {
          ...prev[editing.name as keyof FilterParams],
          value: numericValue,
        },
      }));
    }
  };

  // handleEditSave method
  public handleEditSave = (
    max: number,
    editing: { active: boolean; name: keyof FilterParams | null },
    inputValue: number,
    inputComparison: ComparisonType,
    setFilters: SetState<FilterParams>,
    setEditing: React.Dispatch<
      React.SetStateAction<{
        active: boolean;
        name: null;
      }>
    >,
    setInputValue: SetState<number>
  ): void => {
    const clampedValue = Math.max(0, Math.min(inputValue, max));

    if (editing?.name) {
      setFilters((prev) => ({
        ...prev,
        [editing.name as keyof FilterParams]: {
          ...prev[editing.name as keyof FilterParams],
          value: clampedValue,
          comparison: inputComparison,
        },
      }));
      setEditing({ active: false, name: null });
      setInputValue(clampedValue);
    }
  };

  // handleComparisonChange method
  public handleComparisonChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    filterName: keyof FilterParams,
    setInputComparison: SetState<ComparisonType>,
    setFilters: SetState<FilterParams>
  ): void => {
    const comparison = e.target.value as ComparisonType;
    setInputComparison(comparison);

    setFilters((prev) => ({
      ...prev,
      [filterName]: {
        ...prev[filterName],
        comparison,
      },
    }));
  };

  // closeFilters method
  public closeFilters = (
    setShowFilterPopup: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    setShowFilterPopup(false);
  };

  // resetFilters method
  public resetFilters = (setFilters: SetState<FilterParams>): void => {
    setFilters(this.DEFAULT_FILTERS);
  };

  // applyFilters method
  public applyFilters = async (
    setShowFilterPopup: React.Dispatch<React.SetStateAction<boolean>>,
    filterAttempts: number,
    setFilterAttempts: React.Dispatch<React.SetStateAction<number>>,
    setLoading: SetState<boolean>,
    setItems: React.Dispatch<React.SetStateAction<BazaarProducts[]>>
  ): Promise<void> => {
    this.closeFilters(setShowFilterPopup);
    this.handleApplyFilterClick(filterAttempts, setFilterAttempts);
    await this.getGuestItems(this.DEFAULT_FILTERS, setLoading, setItems);
  };
}
