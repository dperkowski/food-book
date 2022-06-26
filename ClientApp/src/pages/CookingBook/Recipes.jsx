import React from "react";

import Recipe from "./Recipe.jsx";

const Recipes = ({ recipeList, user, showFavorites }) => {
  const editingId = 0; //todo
  console.log(showFavorites);
  const recipeListMap = recipeList
    ? recipeList.map((recipeData) => {
        if (recipeData.id === editingId) {
          // return editForm(recipeData);
        } else if (recipeData.isVisible === true)
          return <Recipe recipeData={recipeData} />;
      })
    : null;

  return recipeListMap;
};

export default Recipes;
