import React, {useEffect, useState} from 'react';
import {IUserRegistrationData} from "../../../models/IUserRegistrationData";
import {useRegisterMutation} from "../../../redux/services/user";
import {NavLink} from "react-router-dom";

const Registration = () => {
    const [formData, setFormData] = useState<IUserRegistrationData>({
        name: '',
        email: '',
        password: ''
    })
    const [registrationSuccess, setRegistrationSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        if(registrationSuccess !== null) {
            const timer = setTimeout(() => {
                setRegistrationSuccess(null)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [registrationSuccess])

    const [registerUser, result] = useRegisterMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        registerUser(formData).unwrap().then(originalPromiseResult => {
            setRegistrationSuccess(true)
            console.log('попало в success')
        }).catch(rejectedValueOrSerializedError => {
            setRegistrationSuccess(false)
            console.log('попало в reject')
        })
        // console.log('registerResult', registerResult?.error)
        // registerResult?.error ?  : ;
    }

    return (
        <div className='p-4 max-w-md mx-auto'>
            <h2 className="text-2xl mb-4">Registration Form</h2>
            {registrationSuccess === true && <p className="text-green-500">Registration successful!</p>}
            {registrationSuccess === false && <p className="text-red-500">Something went wrong!</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block mb-1">Email:</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block mb-1">Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full border rounded px-2 py-1"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                        disabled={result.isLoading}
                    >
                        {result.isLoading ? 'Registering...' : 'Register'}
                    </button>
                    <NavLink to='/login' className='className="ml-4 text-blue-500 font-medium">'>
                        Already have an account? Login
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Registration;