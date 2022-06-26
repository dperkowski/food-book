import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Recipes from "./Recipes";

const SearchBar = ({ recipesData }) => {
  const { user } = useSelector((state) => state.auth);
  const [recipeList, setRecipeList] = useState([]);

  const [showFavorites, setShowFavorites] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = (e, type) => {
    e.preventDefault();
    const newRecipeList = [...recipesData];

    if (type === "search") {
      e.preventDefault();
      newRecipeList.map((recipe) => {
        if (recipe.name.toLowerCase().includes(searchValue.toLowerCase())) {
          recipe.isVisible = true;
          setRecipeList(newRecipeList);
        } else {
          recipe.isVisible = false;
          setRecipeList(newRecipeList);
        }
      });
    } else if (type === "favorites") {
      setShowFavorites((prev) => !prev);
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
      <Recipes recipeList={recipesData} user={user} />
    </>
  );
};

export default SearchBar;
