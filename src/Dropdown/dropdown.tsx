import { useCallback, useMemo, useState } from "react";
import { DataItem } from "../hooks/useDataLoader"

export type AutoSuggestProps = {
  data: DataItem[];
  loading: boolean;
}

const MIN_SYMBOLS = 2;

export type DropDownState = 'hidden' | 'loading' | 'loaded' | 'empty';

const useAutoSuggest = ({
    loading, 
    data
      }: {
    loading: AutoSuggestProps['loading']
    data: AutoSuggestProps['data']
      }) => {
  const [inputValue, setInput] = useState('')
  const isLoading = !!loading;
  const isDropDownActive = useMemo(() => !isLoading && inputValue.length > MIN_SYMBOLS, [isLoading, inputValue]);
  const filteredData = useMemo(() => {
    if (!isDropDownActive) return [];
    return [ ...data ].filter(item => `${item.email} ${item.login.username} ${item.name.first} ${item.name.last}`
    .toLowerCase()
    .includes(inputValue));
  }, [data, inputValue, isDropDownActive]);
  // nested ternary is not good and I don't do it normally :):)
  const dropDownState: DropDownState = isDropDownActive? filteredData.length ? 'loaded': 'empty' : 'hidden';
  const getHighlightedText = useCallback((text: string) => {
    const parts = text.split(new RegExp(`(${inputValue})`, 'gi'));
    // there are no ids in api
    return <span key={text}> { parts.map((part, i) => 
        <span key={i} className={part.toLowerCase() === inputValue.toLowerCase() ? 'dropdownItem' : '' }>
            { part }
        </span>)
    } </span>;
}, [inputValue])
  const getFormattedItem = (item: DataItem) => getHighlightedText(`${item.name.first} ${item.name.last} (${item.login.username}: ${item.email})`);

  return {
    values: { isLoading, dropDownState, inputValue, filteredData},
    operations: {setInput, getFormattedItem}
  }
}
export const AutoSuggest: React.FC<AutoSuggestProps> = ({data, loading}) => {
  const {values: {isLoading, dropDownState, inputValue, filteredData}, operations: {setInput, getFormattedItem}} = useAutoSuggest({ loading, data});
  return <div className="autoComplete">
    <div>
      <input className="input"value={inputValue} onChange={(e) => setInput(e.target.value)}></input>
      {isLoading ? <img className="loader" src='loader.gif'/> : null}
    </div>
      <div className={`dropDown ${dropDownState !== 'hidden' ?  'openDropdown' : 'closeDropdown' }`}>
      {dropDownState !== 'empty' ? filteredData.map(getFormattedItem) : 'no data filtered'}
    </div>
  </div>
}
