import React, { useEffect } from "react";

function Search() {
  useEffect(() => {
    const search = async () => {
      const response = await fetch(`/api/search`);
      const data = await response.json();
    };
    search();
  }, []);
  return <div>Search</div>;
}

export default Search;
