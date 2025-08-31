import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { fetchStudents, deleteStudent } from "@/features/student/studentSlice";

const StudentListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { data: students, loading, error } = useSelector(
    (state: RootState) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleEdit = (id: number) => navigate(`/edit-student/${id}`);
  const handleDelete = (id: number) => dispatch(deleteStudent(id));

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/add-student")}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          + Add Student
        </button>
      </div>

      {students.length === 0 ? (
        <p className="text-center text-gray-500">No students added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">Class</th>
                <th className="text-left py-3 px-4 font-medium">Phone</th>
                <th className="text-left py-3 px-4 font-medium">Father Name</th>
                <th className="text-center py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{s.name}</td>
                  <td className="py-2 px-4">{s.student_class}</td>
                  <td className="py-2 px-4">{s.phone}</td>
                  <td className="py-2 px-4">{s.father_name}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(s.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentListPage;
