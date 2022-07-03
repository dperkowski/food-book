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

export const EditRecipe = ({ recipeData }) => {
  console.log(recipeData);

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

  return editForm;
};
