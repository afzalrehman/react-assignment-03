import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Student } from "@/types/student";
import { StudentApi } from "@/ApiHandler/Student";

const AddStudentPage: React.FC = () => {
    const navigate = useNavigate();

    // Use a single state object for the form
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        studentClass: "",
        fatherName: "",
    });

    // Generic handleChange for all inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Save student via API
    const handleSave = async () => {
        try {
            const newStudent: Student = {
                id: Date.now(),
                name: formData.name,
                phone: formData.phone,
                student_class: formData.studentClass,
                father_name: formData.fatherName,
            };

            await StudentApi.create(newStudent);
            alert("Student added successfully!");
            navigate("/students");
        } catch (error) {
            console.error("Failed to add student:", error);
            alert("Failed to add student. See console for details.");
        }
    };

    return (
        <div className="max-w-md mt-20 mx-auto p-6 bg-gray-100 rounded-xl shadow-md space-y-3">
            <h1 className="text-2xl font-bold text-center">Add Student</h1>

            <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />

            <input
                type="text"
                name="fatherName"
                placeholder="Father Name"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
            />
            <input
                type="text"
                name="studentClass"
                placeholder="Class"
                value={formData.studentClass}
                onChange={handleChange}
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
                    onClick={handleSave}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                    Add Student
                </button>
            </div>
        </div>
    );
};

export default AddStudentPage;
