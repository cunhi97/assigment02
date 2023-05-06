import React, { useState } from "react";
import SearchForm from "./SearchForm";
// import ResultList from "./ResultList";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery)

  function handleSearch(query) {
    setSearchQuery(query);
  }
  
  return (
    <div>
      <SearchForm onSearch={handleSearch} />
    </div>
  );
}

export default Search;
