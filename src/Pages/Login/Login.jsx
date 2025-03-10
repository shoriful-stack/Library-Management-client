import { FaEye } from "react-icons/fa";
import SocialLogin from "../SocialLogin";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";



const Login = () => {
    const { loginUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    
    const navigate = useNavigate();
    const location = useLocation();
    const form = location?.state;

    const onSubmit = data => {
        const { email, password } = data;
        loginUser(email, password)
            .then(result => {
                if (result.user) {
                    navigate(form);
                    toast.success("Login successful");
                }
                else {
                    toast.error("Invalid email or password")
                }
            })
            .catch(error => {
                console.error(error)
                if (error.code === "auth/wrong-password") {
                    console.log("Incorrect password");
                    toast.error("Incorrect password");
                } else if (error.code === "auth/user-not-found") {
                    console.log("Email not found");
                    toast.error("Email not found");
                } else {
                    console.log("An error occurred. Please try again later.", error);
                    toast.error("An error occurred. Please try again later.");
                }
            })
    }
    return (
        <div className="flex flex-col justify-around lg:flex-row mb-10 lg:p-10 p-2">
            <div>
                <img src="https://i.ibb.co/kcWKynT/login-concept-illustration-114360-739.jpg" alt="" />
            </div>
            <div className="lg:w-[450px]">
                <h2 className="text-5xl font-bold text-center">Please Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                    </div>
                    {errors.email && <span className="text-red-500">Email does not matched</span>}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="join">
                            <input type={showPassword ? 'text' : 'password'} placeholder="password" name="password" className="w-full input input-bordered" {...register("password")} required />
                            <FaEye className="my-auto -ml-8" onClick={() => setShowPassword(!showPassword)} />
                        </div>
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-accent">Login</button>
                    </div>
                </form>
                <p className="text-center">Do not have an account? <Link to='/register'><span className="text-primary font-bold">Register</span></Link></p>
                <SocialLogin></SocialLogin>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;