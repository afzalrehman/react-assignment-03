import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { getStudentById, updateStudent } from "@/features/student/studentSlice";
import type { Student } from "@/types/student";

const EditStudentPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedStudent, loading, error } = useSelector(
    (state: RootState) => state.students
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    studentClass: "",
    fatherName: "",
  });

  useEffect(() => {
    if (id) dispatch(getStudentById(Number(id)));
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name,
        phone: selectedStudent.phone,
        studentClass: selectedStudent.student_class,
        fatherName: selectedStudent.father_name,
      });
    }
  }, [selectedStudent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = () => {
    if (!id) return;
    const updatedStudent: Student = {
      id: Number(id),
      name: formData.name,
      phone: formData.phone,
      student_class: formData.studentClass,
      father_name: formData.fatherName,
    };
    dispatch(updateStudent({ id: Number(id), student: updatedStudent }));
    navigate("/students");
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded-xl shadow-md space-y-3">
      <h1 className="text-2xl font-bold text-center">Edit Student</h1>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Student Name"
        className="w-full p-2 border rounded"
      />

       <input
        type="text"
        name="fatherName"
        value={formData.fatherName}
        onChange={handleChange}
        placeholder="Father Name"
        className="w-full p-2 border rounded"
      />

      
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="studentClass"
        value={formData.studentClass}
        onChange={handleChange}
        placeholder="Class"
        className="w-full p-2 border rounded"
      />
     

      <div className="flex justify-between gap-2">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
        >
          Back
        </button>
        <button
          onClick={handleUpdate}
          className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Update Student
        </button>
      </div>
    </div>
  );
};

export default EditStudentPage;
