import React, {useEffect, useState} from 'react';
import {useLoginMutation} from "../../../redux/services/user";
import {NavLink, useNavigate} from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState<{email: string, password: string}>({email: '', password: ''})
    const navigate = useNavigate()
    const [login, result] = useLoginMutation()

    const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        if(loginSuccess !== null) {
            const timer = setTimeout(() => {
                setLoginSuccess(null)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [loginSuccess])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await login(formData).unwrap()
            .then(originalPromiseResult => {
                    localStorage.setItem('token', originalPromiseResult.token)
                    navigate('/users')
                })
            .catch(rejectedValueOrSerializedError => {
                setLoginSuccess(false)
            })
    }

    return (
        <div className='p-4 max-w-md mx-auto'>
            <h2 className="text-2xl mb-4">Login Form</h2>
            {loginSuccess === false && <p className="text-red-500">Your account has been blocked or invalid user data!</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Email:</label>
                    <input
                        className="w-full border rounded px-2 py-1"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value}
                            )}
                    />
                </div>
                <div>
                    <label className="block mb-1">Password:</label>
                    <input
                        className="w-full border rounded px-2 py-1"
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value}
                            )}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                        disabled={result.isLoading}
                    >
                        Login
                    </button>
                    <NavLink to='/registration' className='className="ml-4 text-blue-500 font-medium">'>
                        Don't have an account? Sign Up
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Login;