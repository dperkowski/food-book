import React, { useEffect, useState } from "react";

const CookingBook = () => {
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
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newRecipeList = [...recipeList];

    newRecipeList.map((recipe) => {
      if (recipe.title.toLowerCase().includes(searchValue.toLowerCase())) {
        recipe.isVisible = true;
        setRecipeList(newRecipeList);
      } else {
        recipe.isVisible = false;
        setRecipeList(newRecipeList);
      }
    });

    // setRecipeList();
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const searchBar = (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        onChange={handleSearch}
        value={searchValue}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );

  const editForm = (recipe) => (
    <div key={recipe.id} className="recipes__item">
      <form onSubmit={(e) => editRecipe(e, recipe.id)}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="recipeTitle"
            placeholder="Enter title"
            value={recipeValue.title}
            onChange={(e) => handleEditorInputChange(e, "title")}
          ></input>
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="recipeTitle"
            placeholder="Enter title"
            value={recipeValue.description}
            onChange={(e) => handleEditorInputChange(e, "description")}
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Edit
        </button>
      </form>
    </div>
  );

  const singleRecipe = (recipe) =>
    recipe.isVisible ? (
      <div key={recipe.id} className="recipes__item">
        <h2 className="recipes__title">{recipe.title}</h2>
        <p>Favorite? - {recipe.isFav ? "Yes" : "No"}</p>
        <p className="recipes__description">{recipe.description}</p>
        <button
          className="btn btn-primary"
          onClick={() => deleteRecipe(recipe.id)}
        >
          Delete
        </button>
        <button
          className="btn btn-primary"
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
      </div>
    ) : null;

  const recipeListMap = recipeList.map((recipe) => {
    if (recipe.id === editingId) {
      return editForm(recipe);
    } else return singleRecipe(recipe);
  });

  const addRecipeForm = (
    <form onSubmit={addRecipe}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Enter title"
          value={newRecipe.title}
          onChange={(e) => handleAddRecipeInputChange(e, "title")}
        ></input>
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          aria-describedby="recipeTitle"
          placeholder="Enter title"
          value={newRecipe.description}
          onChange={(e) => handleAddRecipeInputChange(e, "description")}
        ></input>
      </div>
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );

  return (
    <div>
      <h1>Coking book</h1>
      {searchBar}
      <ul className="recipes">{recipeListMap}</ul>
      {addRecipeForm}
    </div>
  );
};

export default CookingBook;
