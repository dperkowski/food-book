import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  loadRecipe,
  addRecipe,
  reset,
} from "../../features/recipes/recipeSlice";

import Recipe from "./Recipe.jsx";

const EditRecipe = ({ recipeList, user }) => {
  //EDIT
  const [editingId, setEditingId] = useState();
  const [editFormData, setEditFormData] = useState({
    name: "",
    desc: "",
    hardLevel: "",
    time: "",
    image: "",
    userId: "",
    userFavorite: "",
  });

  const enableEditRecipe = (id) => {
    const newRecipeList = [...recipeList];

    newRecipeList.map((recipe) => {
      if (recipe.id === id) {
        setEditFormData(recipe);
      }
    });
    setEditingId(id);
  };

  const handleEditInputChange = (e, type) => {
    const editFormDataCopy = { ...editFormData };

    switch (type) {
      case "name":
        editFormDataCopy.name = e.target.value;
        break;
      case "desc":
        editFormDataCopy.desc = e.target.value;
        break;
      case "hardLevel":
        editFormDataCopy.hardLevel = e.target.value;
        break;
      case "time":
        editFormDataCopy.time = e.target.value;
        break;
      default:
        break;
    }
    setEditFormData(editFormDataCopy);
  };

  const editRecipe = (e, id) => {
    e.preventDefault();

    // const newRecipeList = [...recipeList];
    // newRecipeList.map((recipe) => {
    //   if (recipe.id === id) {
    //     recipe.title = recipeValue.title;
    //     recipe.desc = recipeValue.desc;

    //     setRecipeList(newRecipeList);
    //   }
    // });

    setEditingId(false);
  };

  const editForm = (recipe) => (
    <div key={recipe.id} className="p-4 mb-3 bg-dark text-light rounded-3">
      <form onSubmit={(e) => editRecipe(e, recipe.id)}>
        <div className="input-group mb-3">
          <span className="input-group-text">title</span>
          <input
            type="text"
            className="form-control"
            aria-describedby="Title"
            placeholder="Enter title"
            value={editFormData.name}
            onChange={(e) => handleEditInputChange(e, "name")}
          ></input>
        </div>

        <div className="input-group">
          <span className="input-group-text">Description</span>
          <textarea
            type="text"
            className="form-control"
            aria-describedby="Description"
            placeholder="Enter title"
            value={editFormData.desc}
            onChange={(e) => handleEditInputChange(e, "desc")}
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Done
          </button>
        </div>
      </form>
    </div>
  );

  // DELETE
  const deleteRecipe = (id) => {
    const newRecipeList = recipeList.filter((recipe) => recipe.id !== id);
    setRecipeList(newRecipeList);
  };

  //FAVORITE
  const setFavRecipe = (id) => {
    const newRecipeList = [...recipeList];
    newRecipeList.map((recipe) => {
      if (recipe.id === id) {
        // recipe.isFav = !recipe.isFav;
        setRecipeList(newRecipeList);
      }
    });
  };

  //SEARCH
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = (e, type) => {
    const newRecipeList = [...recipeList];

    if (type === "search") {
      e.preventDefault();
      newRecipeList.map((recipe) => {
        if (recipe.name.toLowerCase().includes(searchValue.toLowerCase())) {
          recipe.isVisible = true;
          setRecipeList(newRecipeList);
        } else {
          recipe.isVisible = false;
          setRecipeList(newRecipeList);
        }
      });
    } else if (type === "favorites") {
      setShowFavorites((prev) => !prev);
    }
  };

  // useEffect(() => {
  //   const newRecipeList = [...recipeList];
  //   if (showFavorites) {
  //     newRecipeList.map((recipe) => {
  //       if (recipe.isFav) {
  //         recipe.isVisible = true;
  //         setRecipeList(newRecipeList);
  //       } else {
  //         recipe.isVisible = false;
  //         setRecipeList(newRecipeList);
  //       }
  //     });
  //   } else if (!showFavorites) {
  //     newRecipeList.map((recipe) => {
  //       recipe.isVisible = true;
  //       setRecipeList(newRecipeList);
  //     });
  //   }
  //   console.log(showFavorites);
  // }, [showFavorites]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const searchBar = (
    <form onSubmit={(e) => handleSearchClick(e, "search")}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={handleSearch}
          value={searchValue}
          aria-label="Search"
        ></input>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={(e) => handleSearchClick(e, "favorites")}
        >
          Favorites
        </button>
        <button className="btn btn-outline-primary" type="button">
          Search
        </button>
      </div>
    </form>
  );

  const recipeListMap = recipeList
    ? recipeList.map((recipeData) => {
        if (recipeData.id === editingId) {
          return editForm(recipeData);
        } else return <Recipe recipeData={recipeData} />;
      })
    : null;

  return recipeListMap;
};

export default EditRecipe;
