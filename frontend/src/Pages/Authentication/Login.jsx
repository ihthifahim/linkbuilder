import React, {useState, useEffect, useContext} from 'react';
import axiosInstance from "../../utils/axiosConfig";
import LazySpinner from "../../Components/LazySpinner";
import { useNavigate } from 'react-router-dom';

import UserContext from "../../Context/UserContext";

export default function Login() {
    const [email, setEmail] = useState("maria@ihthishaam.com")
    const [password, setPassword] = useState("abc123@@@")

    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = {
            email,
            password
        }
        const response = await axiosInstance.post('user/login', formData).then((res) => {
            const authToken = res.data.token;
            const userData = res.data.user
            localStorage.setItem('token', authToken)
            localStorage.setItem('user', JSON.stringify(userData))
            login(userData)
            setIsLoading(false)

            navigate('/manage/dashboard');
        }).catch(error => {
            console.error(error);
        })

    }

    return (
        <>



            <div className="flex justify-center items-center min-h-screen bg-gray-100">


                <div
                    className="flex flex-1 flex-col  justify-center space-y-5 max-w-md bg-white rounded-2xl px-10 py-20 shadow-xl">
                    <div className="flex flex-col space-y-2 text-center">
                        <h2 className="text-3xl md:text-3xl font-bold mb-5">Sign in to your account</h2>

                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div className="flex flex-col max-w-md space-y-5">
                            <input type="text" placeholder="Email"
                                   value={email}
                                   onChange={ (e) => setEmail( e.target.value ) }
                                   className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"/>
                            <input type="password" placeholder="Password"
                                   value={password}
                                   onChange={ (e) => setPassword( e.target.value ) }
                                   className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"/>
                            <button
                                className={`${isLoading ? 'bg-gray-300' : 'bg-black border-black border-2'} flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3  rounded-lg font-medium  text-white`}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>

                            <div className="flex justify-center items-center">
                                <span className="w-full border border-black"></span>
                                <span className="px-4">Or</span>
                                <span className="w-full border border-black"></span>
                            </div>
                            <a href="/register"
                               className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
                                <button>Create account here</button>
                            </a>
                        </div>
                    </form>
                </div>

            </div>


        </>

    )
}