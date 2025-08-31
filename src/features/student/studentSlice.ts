// src/store/studentSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Student } from "@/types/student";
import { StudentApi } from "@/ApiHandler/Student";

// Async thunks
export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
  const res = await StudentApi.getAll();
  return res as Student[];
});

export const getStudentById = createAsyncThunk(
  "students/getById",
  async (id: number) => {
    const res = await StudentApi.getById(id);
    return res as Student;
  }
);

export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ id, student }: { id: number; student: Student }) => {
    const res = await StudentApi.update(id, student);
    return res as Student;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id: number) => {
    await StudentApi.delete(id);
    return id;
  }
);

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    data: [] as Student[],
    selectedStudent: null as Student | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchStudents
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch students";
      })

      // getStudentById
      .addCase(getStudentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action: PayloadAction<Student>) => {
        state.loading = false;
        state.selectedStudent = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get student";
      })

      // updateStudent
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        state.loading = false;
        state.data = state.data.map((s) =>
          s.id === action.payload.id ? action.payload : s
        );
        state.selectedStudent = action.payload;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update student";
      })

      // deleteStudent
      .addCase(deleteStudent.fulfilled, (state, action: PayloadAction<number>) => {
        state.data = state.data.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
