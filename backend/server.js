import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_KEY = process.env.HF_API_KEY;
if (!HF_API_KEY) {
  console.error("❌ HuggingFace API key is missing. Please check your .env file.");
}

const hf = new HfInference(HF_API_KEY);

app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "Ingredients must be a non-empty array." });
  }

  const SYSTEM_PROMPT = `
  You are a helpful assistant that generates recipes.
  Given a list of ingredients, suggest a recipe with clear steps.
  Format your response in markdown (## title, ### ingredients, ### steps).
  `;

  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",  // ✅ use Mixtral, not gpt2
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have these ingredients: ${ingredients.join(", ")}. Suggest a recipe.` },
      ],
      max_tokens: 500,
    });

    res.json({ recipe: response.choices[0].message.content });
  } catch (err) {
    console.error("HF API error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));



