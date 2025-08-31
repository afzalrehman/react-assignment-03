import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Recipe } from "@/types/recipe";

interface RecipeState {
  list: Recipe[];
  editingRecipe: Recipe | null;
}

const initialState: RecipeState = {
  list: [],
  editingRecipe: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.list.push(action.payload);
    },
    updateRecipe: (state, action: PayloadAction<Recipe>) => {
      state.list = state.list.map((r) =>
        r.id === action.payload.id ? action.payload : r
      );
      state.editingRecipe = null;
    },
    deleteRecipe: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((r) => r.id !== action.payload);
    },
    setEditingRecipe: (state, action: PayloadAction<number | null>) => {
      if (action.payload === null) {
        state.editingRecipe = null;
      } else {
        state.editingRecipe =
          state.list.find((r) => r.id === action.payload) || null;
      }
    },
  },
});

export const { addRecipe, updateRecipe, deleteRecipe, setEditingRecipe } =
  recipeSlice.actions;

export default recipeSlice.reducer;
