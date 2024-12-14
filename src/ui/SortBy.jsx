import { useSearchParams } from "react-router-dom";
import Select from "./Select";

////************************************* Client-Side Sorting: Sorting Cabins
// as we want to use select element many places so lets build that Select.jsx
// function SortBy({ options }) {
//   return <Select options={options} type="white" />;
// }

// export default SortBy;

////*****  Lets handle click
// after this read the value in table and do sorting CabinTable.jsx

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // get the currently selected value
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
