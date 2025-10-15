export default function IngredientList(props){
     const ingredientList = props.ingredients.map(ingredient=> (
        <li key={ingredient}>{ingredient}</li>
    ));
    
   return (
    <section>
      <h2 className="ingredients-heading">Ingredients On Hand:</h2>
        <div className="main-section">
      <ul>{ingredientList}</ul>
      {ingredientList.length >3 && <div className="get-recipe-container">
          <div className="get-recipe-children-container">
              <div className="get-recipe-sub-children-container">
              <div className="text-field" ref={props.ref}>
                  <h3>Ready for a Recipe?</h3>
                  <p>
                  Generate a recipe from your list of Ingredients
                  </p>
              </div>
              <div className="button-field">
                  <button className="get-recipe" onClick={props.getRecipe}>Get Recipe</button>
              </div>
              </div>
          </div>
      </div>}
      </div>
  </section>
   );
}