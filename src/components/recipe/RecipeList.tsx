import React from "react";

import RecipeCard from "./RecipeCard";
import type { Recipe } from "@/types/recipe";

interface RecipeListProps {
  recipes: Recipe[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onEdit, onDelete }) => {
  if (recipes.length === 0) {
    return <p className="text-center text-gray-500">No recipes added yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default RecipeList;
