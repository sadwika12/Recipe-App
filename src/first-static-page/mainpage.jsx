// filepath: c:\Users\Sadwika\first-react\src\first-static-page\mainpage.jsx
import React from 'react';
import IngredientList from './components/ingredientlist';
import RecipeText from './components/recipetext';
import { useState,useRef } from "react";
function MainPage() {
    const [newIngredient,setnewIngredient]=React.useState([]);
    const[recipeShown,setrecipeShown]=React.useState("");
    const recipesection=React.useRef(null);
    React.useEffect(()=>{
        if(recipeShown !=="" && recipesection.current !== null){
           const yCoord=window.scrollY+recipesection.current.getBoundingClientRect().top;
              window.scrollTo({
                top:yCoord,
                behavior:"smooth"
            });
        }
    },[recipeShown])


    async function getRecipe() {

    try {
      const response = await fetch("http://localhost:5000/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients:newIngredient }),
      });

      const data = await response.json();

      if (data?.recipe) {
        setrecipeShown(data.recipe);
      } else if (data?.error) {
        // Handle errors sent from the backend
        setrecipeShown(`Error: ${data.error}`);
      }
      else {
        setrecipeShown("⚠️ Error fetching recipe.");
      }
    } catch (err) {
      console.error("Frontend error:", err);
      setrecipeShown("⚠️ Error fetching recipe.");
    }
  }

    


    function addIngredient(formData){
        const newIngredient=formData.get("ingredient");
        setnewIngredient(prevIngredients=>[...prevIngredients,newIngredient]);
    }
    return(
        <main>
            <form
            className="form-container"
            onSubmit={(e) => {
                e.preventDefault(); // prevent page reload
                const formData = new FormData(e.target);
                addIngredient(formData);
                e.target.reset(); // clear input
            }}
            >
                <input type="text" placeholder="Add Ingredeints" className="user-input" name="ingredient">
                </input>
                <button  className="add-ingredient">
                    Add a Ingredient 
                </button>         
            </form>
            {newIngredient.length> 0 && <IngredientList ingredients={newIngredient} getRecipe={getRecipe}/>
            }   
            {recipeShown && <RecipeText recipeShown={recipeShown}/>}
        </main>

    )
}

export default MainPage;