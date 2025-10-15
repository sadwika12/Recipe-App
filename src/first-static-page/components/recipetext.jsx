import ReactMarkdown from "react-markdown";

export default function RecipeText(props) {
  return (
    <section className="recipe-section">
      <h2>Recipe:</h2>
      <ReactMarkdown>
        {props.recipeShown}
      </ReactMarkdown>
    </section>
  );
}
