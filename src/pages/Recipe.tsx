import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { addRecipe, updateRecipe, deleteRecipe, setEditingRecipe } from "@/features/recipes/recipeSlice";
import RecipeForm from "../components/recipe/RecipeForm";
import RecipeList from "../components/recipe/RecipeList";

const Recipe: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector((state: RootState) => state.recipes.list);
  const editingRecipe = useSelector((state: RootState) => state.recipes.editingRecipe);

  const handleSave = (recipe: any) => {
    if (editingRecipe) {
      dispatch(updateRecipe(recipe));
    } else {
      dispatch(addRecipe(recipe));
    }
  };

  const handleEdit = (id: number) => {
    dispatch(setEditingRecipe(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteRecipe(id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🍴 Recipe Book</h1>
      <RecipeForm onSave={handleSave} editingRecipe={editingRecipe} />
      <RecipeList recipes={recipes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Recipe;
