import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Recipe = ({ recipeData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { recipe, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );

  const { user } = useSelector((state) => state.auth);
  const [recipeList, setRecipeList] = useState();

  // Recipe list generator
  //   const recipeItemButtons = (recipe) => (
  //     <>
  //       <button
  //         className="btn btn-primary flex-fill"
  //         onClick={() => setFavRecipe(recipe.id)}
  //       >
  //         Favorite
  //       </button>
  //       <button
  //         className="btn btn-primary flex-fill"
  //         onClick={() => enableEditRecipe(recipe.id)}
  //       >
  //         Edit
  //       </button>
  //       <button
  //         className="btn btn-danger flex-fill"
  //         onClick={() => deleteRecipe(recipe.id)}
  //       >
  //         Delete
  //       </button>
  //     </>
  //   );

  const recipeItemHardLevel = (hardLevel) => {
    const hardLevelItem = (value, text) => (
      <>
        <div
          class="progress mb-3"
          style={{
            height: 25 + "px",
          }}
        >
          <div
            class="progress-bar"
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
        class="progress"
        style={{
          height: 25 + "px",
        }}
      >
        <div
          class="progress-bar"
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
      {user ? (
        <div className="col-lg-6 col-xxl-4 d-flex gap-3">
          {/* {recipeItemButtons(recipe)} */}
        </div>
      ) : null}
    </div>
  );

  const title = recipeData.isFavorite ? (
    <h2>
      {recipeData.name} <span class="badge bg-primary">Favorite</span>
    </h2>
  ) : (
    <h2>{recipeData.name}</h2>
  );

  return (
    <div
      key={recipeData.id}
      className="p-4 ps-xs-4 ps-lg-0 mb-3 custom-bg text-light"
    >
      <div className="row g-4">
        <div className="col-lg-4">
          <img
            src={recipeData.image}
            alt="recipe"
            className="img-fluid rounded shadow-lg"
          />
        </div>
        <div className="col-lg-8 offset-lg-0 d-flex flex-column">
          {title}
          <p>{recipeData.desc}</p>
          {progressBarsAndButtons(recipeData)}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
