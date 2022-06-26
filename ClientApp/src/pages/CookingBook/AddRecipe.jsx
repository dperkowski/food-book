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

const AddRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { recipe, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );
  const { user } = useSelector((state) => state.auth);
  const [recipeList, setRecipeList] = useState();

  //ADD
  const [addFormData, setAddFormData] = useState({
    id: 0,
    name: "",
    desc: "",
    hardLevel: 1,
    time: null,
    image: "https://picsum.photos/1000/700",
    userId: 0,
    userFavorites: false,
    categories: "",
  });

  const handleAddRecipeInputChange = (e, type) => {
    const addFormDataCopy = { ...addFormData };
    switch (type) {
      case "name":
        addFormDataCopy.name = e.target.value;
        break;
      case "desc":
        addFormDataCopy.desc = e.target.value;
        break;
      case "hardLevel":
        addFormDataCopy.hardLevel = e.target.value;
        break;
      case "time":
        addFormDataCopy.time = e.target.value;
        break;
      default:
        break;
    }
    setAddFormData(addFormDataCopy);
  };

  const handleAddRecipeSubmit = (e) => {
    e.preventDefault();
    const {
      id,
      name,
      desc,
      hardLevel,
      time,
      image,
      userFavorites,
      categories,
    } = addFormData;
    const token = user.token;
    const userId = user.id;
    const recipeData = {
      id,
      name,
      desc,
      hardLevel,
      time,
      image,
      userFavorites,
      categories,
      token,
      userId,
    };

    dispatch(addRecipe(recipeData));
  };

  return (
    <form onSubmit={handleAddRecipeSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text">Title</span>
            <input
              type="text"
              className="form-control"
              aria-describedby="recipeTitle"
              placeholder="Enter title"
              value={addFormData.name}
              onChange={(e) => handleAddRecipeInputChange(e, "name")}
            ></input>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <select
            className="form-select"
            value={addFormData.hardLevel}
            onChange={(e) => handleAddRecipeInputChange(e, "hardLevel")}
          >
            <option value="1">Easy to make</option>
            <option value="2">Takes practice</option>
            <option value="3">Only for chosen ones</option>
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <div className="input-group">
            <span className="input-group-text">Time</span>
            <input
              type="number"
              className="form-control"
              placeholder="Enter time"
              value={addFormData.time}
              onChange={(e) => handleAddRecipeInputChange(e, "time")}
            ></input>
          </div>
        </div>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Description</span>
        <textarea
          type="text"
          className="form-control"
          placeholder="Enter title"
          value={addFormData.desc}
          onChange={(e) => handleAddRecipeInputChange(e, "desc")}
        ></textarea>
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddRecipe;
