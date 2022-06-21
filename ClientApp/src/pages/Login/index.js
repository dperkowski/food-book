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

  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

export default CookingBook;
