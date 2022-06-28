import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Recipes from "../../components/recipes/Recipes.jsx";

const UserRecipes = () => {
  const { user } = useSelector((state) => state.auth);
  const { recipe, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );

  const [filteredList, setFilteredList] = useState(recipe);

  useEffect(() => {
    recipe.forEach((recipe) => {
      if (recipe) setFilteredList((prev) => [...prev, recipe]);
    });
  }, []);

  return (
    <>
      <Recipes recipeList={filteredList} user={user} keyString="userrecipes" />
    </>
  );
};

export default UserRecipes;
