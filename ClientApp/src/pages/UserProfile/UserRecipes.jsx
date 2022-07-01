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
    handleArray();
  }, []);

  const handleArray = () => {
    const newFilteredList = [...recipe];
    const newArray = [];
    newFilteredList.map((recipe) => {
      if (recipe.id === user.id) {
        return newArray.push(recipe);
      } else return null;
    });
    setFilteredList(newArray);
  };

  return (
    <>
      <Recipes recipeList={filteredList} user={user} keyString="userrecipes" />
    </>
  );
};

export default UserRecipes;
