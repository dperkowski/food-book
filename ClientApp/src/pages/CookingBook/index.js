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

const CookingBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { recipe, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.recipe
  );
  const { user } = useSelector((state) => state.auth);
  const [recipeList, setRecipeList] = useState();

  useEffect(() => {
    const newRecipeList = recipe
      ? recipe.map((recipeElement) => ({
          ...recipeElement,
          isVisible: true,
        }))
      : null;
    setRecipeList(newRecipeList);
  }, []);

  useEffect(() => {
    dispatch(loadRecipe());
  }, [addRecipe]);

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

  //ADD
  const [addFormData, setAddFormData] = useState({
    id: 0,
    name: "",
    desc: "",
    hardLevel: 1,
    time: 0,
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

    // const newRecipeList = [...recipeList];
    // setNewRecipe((prev) => (prev.id = newRecipeList.length));
    // newRecipeList.push(newRecipe);
    // setRecipeList(newRecipeList);
    // setNewRecipe(defaultDataStructure);
  };

  const addRecipeForm = (
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
          <select
            className="form-select"
            value={addFormData.time}
            onChange={(e) => handleAddRecipeInputChange(e, "time")}
          >
            <option value="1">Up to 30min</option>
            <option value="2">30 - 60min</option>
            <option value="3">60min+</option>
          </select>
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

  // Recipe list generator
  const recipeItemButtons = (
    <>
      <button
        className="btn btn-primary flex-fill"
        onClick={() => setFavRecipe(recipe.id)}
      >
        Favorite
      </button>
      <button
        className="btn btn-primary flex-fill"
        onClick={() => enableEditRecipe(recipe.id)}
      >
        Edit
      </button>
      <button
        className="btn btn-danger flex-fill"
        onClick={() => deleteRecipe(recipe.id)}
      >
        Delete
      </button>
    </>
  );

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

  const recipeItem = (recipe) =>
    recipe.isVisible ? (
      <div
        key={recipe.id}
        className="p-4 ps-xs-4 ps-lg-0 mb-3 custom-bg text-light"
      >
        <div className="row g-4">
          <div className="col-lg-4">
            <img
              src={recipe.image}
              alt="recipe"
              className="img-fluid rounded shadow-lg"
            />
          </div>
          <div className="col-lg-8 offset-lg-0 d-flex flex-column">
            <h2>{recipe.name}</h2>
            <p>{recipe.desc}</p>
            <div className="row mt-auto d-flex gap-3 gap-lg-0">
              <div className="col-lg-6 col-xxl-8">
                {recipeItemHardLevel(recipe.hardLevel)}
                {recipeItemTime(recipe.time)}
              </div>
              <div className="col-lg-6 col-xxl-4 d-flex gap-3">
                {recipeItemButtons}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;

  const recipeListMap = recipeList
    ? recipeList.map((recipe) => {
        if (recipe.id === editingId) {
          return editForm(recipe);
        } else return recipeItem(recipe);
      })
    : null;

  return (
    <div className="container mb-4">
      <div className="row">
        <div className="col-md-12">
          <h1 className="display-1 mb-4 text-center">Coking book</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">{searchBar}</div>
      </div>

      <div className="row">
        <div className="col-md-12">{recipeListMap}</div>
      </div>

      <div className="row">
        <div className="col-md-12">{addRecipeForm}</div>
      </div>
    </div>
  );
};

export default CookingBook;
