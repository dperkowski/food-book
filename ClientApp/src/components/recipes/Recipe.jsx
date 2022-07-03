import React from "react";

import { useSelector, useDispatch } from "react-redux";
import recipe from "../../features/recipes/recipeService";

import {
  deleteRecipe,
  loadUserRecipe,
} from "../../features/recipes/recipeSlice";

const Recipe = ({ recipeData, showButtons }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = user?.token;

  const handleDeleteClick = () => {
    dispatch(
      deleteRecipe({
        userId: recipeData.userId,
        id: recipeData.id,
        token,
      })
    );
    dispatch(loadUserRecipe(user.id));
  };

  //  Recipe list generator
  const recipeItemButtons = () => {
    return (
      <>
        <button
          className="btn btn-primary flex-fill"
          // onClick={() => setFavRecipe(recipe.id)}
        >
          Favorite
        </button>
        <button
          className="btn btn-primary flex-fill"
          // onClick={() => enableEditRecipe(recipe.id)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger flex-fill"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </>
    );
  };

  const recipeItemHardLevel = (hardLevel) => {
    const hardLevelItem = (value, text) => (
      <>
        <div
          className="progress mb-3"
          style={{
            height: 25 + "px",
          }}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: value + "%",
            }}
            aria-valuenow={value}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {text}
          </div>
        </div>
      </>
    );

    switch (hardLevel) {
      case 1:
        return hardLevelItem(20, "Easy to make");
      case 2:
        return hardLevelItem(40, "Takes practice");
      case 3:
        return hardLevelItem(60, "Pretty difficult");
      case 4:
        return hardLevelItem(80, "Not for crybabies");
      case 5:
        return hardLevelItem(100, "Only for chosen ones");
      default:
        return hardLevelItem(100, "No difficulty set");
    }
  };

  const recipeItemTime = (value) => (
    <>
      <div
        className="progress"
        style={{
          height: 25 + "px",
        }}
      >
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: (value / 420) * 100 + "%",
            minWidth: 50 + "px",
            maxWidth: 100 + "%",
          }}
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax="420"
        >
          {value}min
        </div>
      </div>
    </>
  );

  const progressBarsAndButtons = (recipe) => (
    <div className="row mt-auto d-flex gap-3 gap-lg-0">
      <div className="col-lg-6 col-xxl-8">
        {recipeItemHardLevel(recipe.hardLevel)}
        {recipeItemTime(recipe.time)}
      </div>
      {showButtons ? (
        <div className="col-lg-6 col-xxl-4 d-flex gap-3">
          {recipeItemButtons(recipe)}
        </div>
      ) : null}
    </div>
  );

  const title = recipeData.isFavorite ? (
    <h2>
      {recipeData.name} <span className="badge bg-primary">Favorite</span>
    </h2>
  ) : (
    <h2>{recipeData.name}</h2>
  );

  return (
    <div
      key={recipeData.id}
      className="p-4 ps-xs-4 ps-lg-0 mb-3 custom-bg-container overflow-hidden"
    >
      <div className="row g-4">
        <div className="col-lg-4">
          <img
            src={recipeData.image}
            alt="recipe"
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-lg-8 offset-lg-0 d-flex flex-column">
          <div className="custom-bg">
            {title}
            <p className="mb-5">{recipeData.desc}</p>
          </div>

          {progressBarsAndButtons(recipeData)}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
