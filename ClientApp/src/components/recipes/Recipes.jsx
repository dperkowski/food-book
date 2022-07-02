import React from "react";

import Recipe from "./Recipe.jsx";

const Recipes = ({ recipeList, user, keyString }) => {
  const editingId = 0; //todo
  const recipeListMap = recipeList
    ? recipeList.map((recipeData) => {
        if (recipeData.id === editingId) {
          // return editForm(recipeData);
        } else return <Recipe key={recipeData.id} recipeData={recipeData} />;
      })
    : null;

  return recipeListMap;
};

export default Recipes;