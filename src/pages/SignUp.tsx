import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router";
import type { AppDispatch, RootState } from "@/app/store";

const SignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirm) return alert("Passwords do not match!");

        const result = await dispatch(
            registerUser({ name, email, password, password_confirmation: passwordConfirm })
        );

        if (registerUser.fulfilled.match(result)) {
            navigate("/"); // redirect to home
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                    <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Input type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} required />
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" className="w-full mt-2" disabled={loading}>
                        {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                </form>
                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>Login</span>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
