import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loadRecipe, reset } from "../../features/recipes/recipeSlice";

import Search from "./Search.jsx";
import AddRecipe from "./AddRecipe.jsx";

const CookingBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { recipe, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );
  const [recipeList, setRecipeList] = useState();

  // Load recipes
  useEffect(() => {
    const newRecipeList = recipe
      ? recipe.map((recipeElement) => ({
          ...recipeElement,
          isVisible: true,
          isFavorite: false,
        }))
      : null;
    setRecipeList(newRecipeList);
  }, [recipe]);

  useEffect(() => {
    dispatch(loadRecipe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      toast.success("Recipes not loaded");
    }
    if (isSuccess || recipe) {
      toast.success("Recipes loaded");
    }
    dispatch(reset);
  }, [recipe, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className="container mb-4">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-1 mb-4 text-center">Coking book</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <Search />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <AddRecipe />
        </div>
      </div>
    </div>
  );
};

export default CookingBook;
