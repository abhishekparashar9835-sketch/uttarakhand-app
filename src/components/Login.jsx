import React, { useState } from "react";
import authService from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const handleLogin = async (data) => {
        try {
            setError("");

            const session = await authService.login(data);

            console.log("Login Response:", session);

            // Store JWT token
            localStorage.setItem("token", session.token);

            // Store user in Redux
            dispatch(authLogin(session.user));

            navigate("/");

        } catch (err) {
            console.log("LOGIN ERROR:", err.response);

            setError(
                err.response?.data?.message || 
                "Invalid email or password"
            );
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">

                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">
                    Login
                </h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Don't have an account?&nbsp;

                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>


                {error && (
                    <p className="text-red-600 mt-8 text-center">
                        {error}
                    </p>
                )}


                <form onSubmit={handleSubmit(handleLogin)}>

                    <div className="space-y-5">

                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                                        || "Email address must be valid",
                                },
                            })}
                        />


                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />


                        <Button 
                            type="submit" 
                            className="w-full"
                        >
                            Login
                        </Button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default Login;