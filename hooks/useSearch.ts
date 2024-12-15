import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash/debounce";
import { setSearchTerm } from "../store/pokemonSlice";

const DEBOUNCE_DELAY = 600;

export const useSearch = (initialValue: string = "") => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(initialValue);

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      dispatch(setSearchTerm(text));
    }, DEBOUNCE_DELAY),
    [dispatch]
  );

  const handleSearch = useCallback(
    (text: string) => {
      setInputValue(text);
      debouncedSearch(text);
    },
    [debouncedSearch]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return {
    inputValue,
    handleSearch
  };
};
