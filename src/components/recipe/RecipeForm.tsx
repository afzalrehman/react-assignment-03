import type { Recipe } from "@/types/recipe";
import React, { useState, useEffect } from "react";


interface RecipeFormProps {
  onSave: (recipe: Recipe) => void;
  editingRecipe?: Recipe | null;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSave, editingRecipe }) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingRecipe) {
      setName(editingRecipe.name);
      setIngredients(editingRecipe.ingredients.join(", "));
      setInstructions(editingRecipe.instructions);
      setImage(editingRecipe.image || "");
      setCategory(editingRecipe.category || "");
    }
  }, [editingRecipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: editingRecipe ? editingRecipe.id : Date.now(),
      name,
      ingredients: ingredients.split(",").map((ing) => ing.trim()),
      instructions,
      image,
      category,
    };
    onSave(newRecipe);
    setName("");
    setIngredients("");
    setInstructions("");
    setImage("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded-xl shadow-md space-y-3"
    >
      <input
        type="text"
        placeholder="Recipe Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Cooking Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Category</option>
        <option value="Dessert">Dessert</option>
        <option value="Main Course">Main Course</option>
        <option value="Snack">Snack</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg"
      >
        {editingRecipe ? "Update Recipe" : "Add Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
