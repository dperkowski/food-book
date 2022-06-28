import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Recipes from "./Recipes";

const Search = () => {
  const { user } = useSelector((state) => state.auth);
  const { recipe, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );

  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState(recipe);

  const handleSearchClick = (e, type) => {
    e.preventDefault();
    if (type === "search") {
      e.preventDefault();
      setFilteredList([]);
      recipe.forEach((recipe) => {
        if (recipe.name.toLowerCase().includes(searchValue.toLowerCase())) {
          setFilteredList((prev) => [...prev, recipe]);
        }
      });
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <form onSubmit={(e) => handleSearchClick(e, "search")}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={handleSearch}
            value={searchValue}
            aria-label="Search"
          ></input>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={(e) => handleSearchClick(e, "favorites")}
          >
            Favorites
          </button>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={(e) => handleSearchClick(e, "search")}
          >
            Search
          </button>
        </div>
      </form>
      <Recipes recipeList={filteredList} user={user} />
    </>
  );
};

export default Search;
