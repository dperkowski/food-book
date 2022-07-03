import React from "react";

import Recipe from "./Recipe.jsx";

const Recipes = ({ recipeList, user, keyString, showButtons }) => {
  const editingId = 0; //todo
  const recipeListMap = recipeList
    ? recipeList.map((recipeData) => {
        return (
          <Recipe
            key={recipeData.id}
            recipeData={recipeData}
            showButtons={showButtons}
          />
        );
      })
    : null;

  return recipeListMap;
};

export default Recipes;
