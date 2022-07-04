import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  loadRecipe,
  loadUserRecipe,
  addRecipe,
  reset,
} from "../../features/recipes/recipeSlice";

import { editRecipe } from "../../features/recipes/recipeSlice";

const EditRecipe = ({ recipeData, setEditMode }) => {
  const dispatch = useDispatch();
  const { userRecipe, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );
  const { user } = useSelector((state) => state.auth);

  //EDIT
  const [editFormData, setEditFormData] = useState({
    id: recipeData.id,
    name: recipeData.name,
    desc: recipeData.desc,
    hardLevel: recipeData.hardLevel,
    time: recipeData.time,
    image: recipeData.image,
    userId: recipeData.userId,
    userFavorite: recipeData.userFavorite,
    token: user.token,
    categories: recipeData.categories ? recipeData.categories : {},
  });

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
      case "image":
        editFormDataCopy.image = e.target.value;
        break;
      default:
        break;
    }
    setEditFormData(editFormDataCopy);
  };

  const handleEditRecipe = (e) => {
    e.preventDefault();
    dispatch(editRecipe(editFormData));
    console.log(editFormData);
    setEditMode();
    if (isSuccess) toast.success("Recipe edited");
  };

  return (
    <form className="mb-3" onSubmit={handleEditRecipe}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text">Title</span>
            <input
              type="text"
              className="form-control"
              aria-describedby="recipeTitle"
              placeholder="Enter title"
              value={editFormData.name}
              onChange={(e) => handleEditInputChange(e, "name")}
            ></input>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <select
            className="form-select"
            value={editFormData.hardLevel}
            onChange={(e) => handleEditInputChange(e, "hardLevel")}
          >
            <option value="1">Easy to make</option>
            <option value="2">Takes practice</option>
            <option value="3">Pretty difficult</option>
            <option value="4">Not for crybabies</option>
            <option value="5">Only for chosen ones</option>
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <div className="input-group">
            <span className="input-group-text">Time</span>
            <input
              type="number"
              className="form-control"
              placeholder="Enter time"
              value={editFormData.time}
              onChange={(e) => handleEditInputChange(e, "time")}
            ></input>
          </div>
        </div>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Image url</span>
        <input
          type="text"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Enter title"
          value={editFormData.image}
          onChange={(e) => handleEditInputChange(e, "image")}
        ></input>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Description</span>
        <textarea
          type="text"
          className="form-control"
          placeholder="Enter title"
          value={editFormData.desc}
          onChange={(e) => handleEditInputChange(e, "desc")}
        ></textarea>
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </div>
      <button className="btn btn-primary w-100" onClick={() => setEditMode()}>
        Go back
      </button>
    </form>
  );
};

export default EditRecipe;
