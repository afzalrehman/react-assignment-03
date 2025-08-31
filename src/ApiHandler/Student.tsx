import type { Student } from "@/types/student";

const LIVE_URL = "https://student-api.muhammadafzal.com";
export const StudentApi = {
    getAll: async () => {
        const response = await fetch(`${LIVE_URL}/api/students`);
        return response.json();
    },

    getById: async (id: number) => {
        const response = await fetch(`${LIVE_URL}/api/students/${id}`);
        return response.json();
    },

    create: async (student: Student) => {
        const response = await fetch(`${LIVE_URL}/api/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        });
        return response.json();
    },
    update: async (id: number, student: Student) => {
        const response = await fetch(`${LIVE_URL}/api/students/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
        });
        return response.json();
    },
    delete: async (id: number) => {
        await fetch(`${LIVE_URL}/api/students/${id}`, {
            method: "DELETE",
        });
    },
};
