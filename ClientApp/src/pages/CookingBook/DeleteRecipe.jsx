import { useState } from "react";

const DeleteRecipe = () => {
  const [recipeList, setRecipeList] = useState();

  const deleteRecipe = ({ id }) => {
    const newRecipeList = recipeList.filter((recipe) => recipe.id !== id);
    setRecipeList(newRecipeList);
  };

  return deleteRecipe;
};

export default DeleteRecipe;
