import type { Recipe } from "@/types/recipe";
import React from "react";


interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-40 object-cover rounded-lg"
        />
      )}
      <h2 className="text-xl font-semibold mt-2">{recipe.name}</h2>
      <p className="text-sm text-gray-600">{recipe.category || "Uncategorized"}</p>

      <h3 className="mt-2 font-semibold">Ingredients:</h3>
      <ul className="list-disc list-inside text-sm text-gray-700">
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>

      <h3 className="mt-2 font-semibold">Instructions:</h3>
      <p className="text-sm text-gray-700">{recipe.instructions}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(recipe.id)}
          className="px-3 py-1 bg-blue-500 text-white rounded-lg"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
