import React, { useEffect, useState } from "react";

// import { useGetRecipesQuery } from "../../features/Recipes";

const CookingBook = () => {
  // const { data, error, isLoading } = useGetRecipesQuery();

  const defaultDataStructure = {
    id: 0,
    title: "",
    description: "",
    isFav: false,
    isVisible: true,
  };

  const [recipeList, setRecipeList] = useState([
    {
      id: 0,
      title: "Recipe title 0",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam optio maiores eligendi modi accusantium, consequatur consequuntur, fuga culpa obcaecati quis tenetur eius eos unde. Omnis, illo. Vero sapiente quisquam numquam?",
      isFav: false,
      isVisible: true,
    },
    {
      id: 1,
      title: "Recipe title 1",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam optio maiores eligendi modi accusantium, consequatur consequuntur, fuga culpa obcaecati quis tenetur eius eos unde. Omnis, illo. Vero sapiente quisquam numquam?",
      isFav: false,
      isVisible: true,
    },
    {
      id: 2,
      title: "Recipe title 2",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam optio maiores eligendi modi accusantium, consequatur consequuntur, fuga culpa obcaecati quis tenetur eius eos unde. Omnis, illo. Vero sapiente quisquam numquam?",
      isFav: true,
      isVisible: true,
    },
    {
      id: 3,
      title: "Recipe title 3",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam optio maiores eligendi modi accusantium, consequatur consequuntur, fuga culpa obcaecati quis tenetur eius eos unde. Omnis, illo. Vero sapiente quisquam numquam?",
      isFav: true,
      isVisible: true,
    },
  ]);
  const [editingId, setEditingId] = useState();
  const [recipeValue, setRecipeValue] = useState({
    ...defaultDataStructure,
  });
  const [newRecipe, setNewRecipe] = useState({
    ...defaultDataStructure,
  });
  const [showFavorites, setShowFavorites] = useState(false);

  //ADD
  const handleAddRecipeInputChange = (e, type) => {
    const newRecipeCopy = { ...newRecipe };

    if (type === "title") {
      newRecipeCopy.title = e.target.value;
      setNewRecipe(newRecipeCopy);
    } else if (type === "description") {
      newRecipeCopy.description = e.target.value;
      setNewRecipe(newRecipeCopy);
    }
    console.log(newRecipeCopy);
  };

  const addRecipe = (e) => {
    e.preventDefault();
    const newRecipeList = [...recipeList];
    setNewRecipe((prev) => (prev.id = newRecipeList.length));
    newRecipeList.push(newRecipe);
    setRecipeList(newRecipeList);
    setNewRecipe(defaultDataStructure);

    console.log(newRecipeList);
  };

  //EDIT
  const enableEditRecipe = (id) => {
    const newRecipeList = [...recipeList];
    newRecipeList.map((recipe) => {
      if (recipe.id === id) {
        console.log(recipe);
        setRecipeValue(recipe);
      }
    });
    setEditingId(id);
  };

  const handleEditorInputChange = (e, type) => {
    const recipeValueCopy = { ...recipeValue };
    if (type === "title") {
      recipeValueCopy.title = e.target.value;
      setRecipeValue(recipeValueCopy);
    } else if (type === "description") {
      recipeValueCopy.description = e.target.value;
      setRecipeValue(recipeValueCopy);
    }
    console.log(recipeValueCopy);
  };

  const editRecipe = (e, id) => {
    e.preventDefault();
    const newRecipeList = [...recipeList];
    newRecipeList.map((recipe) => {
      if (recipe.id === id) {
        recipe.title = recipeValue.title;
        recipe.description = recipeValue.description;

        setRecipeList(newRecipeList);
      }
    });

    setEditingId(false);
  };

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
        recipe.isFav = !recipe.isFav;
        setRecipeList(newRecipeList);
      }
    });
  };

  //SEARCH
  const [searchValue, setSearchValue] = useState("");
  const handleSearchClick = (e, type) => {
    const newRecipeList = [...recipeList];

    if (type === "search") {
      e.preventDefault();

      newRecipeList.map((recipe) => {
        if (recipe.title.toLowerCase().includes(searchValue.toLowerCase())) {
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

  useEffect(() => {
    const newRecipeList = [...recipeList];
    if (showFavorites) {
      newRecipeList.map((recipe) => {
        if (recipe.isFav) {
          recipe.isVisible = true;
          setRecipeList(newRecipeList);
        } else {
          recipe.isVisible = false;
          setRecipeList(newRecipeList);
        }
      });
    } else if (!showFavorites) {
      newRecipeList.map((recipe) => {
        recipe.isVisible = true;
        setRecipeList(newRecipeList);
      });
    }
    console.log(showFavorites);
  }, [showFavorites]);

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
            value={recipeValue.title}
            onChange={(e) => handleEditorInputChange(e, "title")}
          ></input>
        </div>

        <div className="input-group">
          <span className="input-group-text">Description</span>
          <textarea
            type="text"
            className="form-control"
            aria-describedby="Description"
            placeholder="Enter title"
            value={recipeValue.description}
            onChange={(e) => handleEditorInputChange(e, "description")}
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Done
          </button>
        </div>
      </form>
    </div>
  );

  const singleRecipe = (recipe) =>
    recipe.isVisible ? (
      <div
        key={recipe.id}
        className="p-4 mb-3 bg-dark text-light rounded-3 border-left"
      >
        <h2>{recipe.title}</h2>
        <p>{recipe.description}</p>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className={recipe.isFav ? "btn btn-success" : "btn btn-primary"}
            onClick={() => setFavRecipe(recipe.id)}
          >
            Favorite
          </button>
          <button
            className="btn btn-primary"
            onClick={() => enableEditRecipe(recipe.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteRecipe(recipe.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ) : null;

  const recipeListMap = recipeList.map((recipe) => {
    if (recipe.id === editingId) {
      return editForm(recipe);
    } else return singleRecipe(recipe);
  });

  const addRecipeForm = (
    <form onSubmit={addRecipe}>
      <div className="input-group mb-3">
        <span className="input-group-text">Title</span>
        <input
          type="text"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Enter title"
          value={newRecipe.title}
          onChange={(e) => handleAddRecipeInputChange(e, "title")}
        ></input>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text">Description</span>
        <textarea
          type="text"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Enter title"
          value={newRecipe.description}
          onChange={(e) => handleAddRecipeInputChange(e, "description")}
        ></textarea>
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </div>
    </form>
  );

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
