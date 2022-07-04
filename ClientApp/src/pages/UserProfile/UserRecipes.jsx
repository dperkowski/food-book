import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Recipes from "../../components/recipes/Recipes.jsx";

import { loadUserRecipe, reset } from "../../features/recipes/recipeSlice";

const UserRecipes = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { recipe, userRecipe, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );

  useEffect(() => {
    dispatch(loadUserRecipe(user.id));
  }, [dispatch, user.id]);

  // const [filteredList, setFilteredList] = useState(recipe);

  // useEffect(() => {
  //   handleArray();
  // }, []);

  // const handleArray = () => {
  //   const newFilteredList = [...recipe];
  //   const newArray = [];
  //   newFilteredList.map((recipe) => {
  //     if (recipe.id === user.id) {
  //       return newArray.push(recipe);
  //     } else return null;
  //   });
  //   setFilteredList(newArray);
  // };

  return (
    <Recipes
      recipeList={userRecipe}
      user={user}
      keyString="userrecipes"
      showButtons={true}
    />
  );
};

export default UserRecipes;
