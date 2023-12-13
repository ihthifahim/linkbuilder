import React, {useState, useEffect, useContext} from 'react';
import axiosInstance from "../../utils/axiosConfig";
import LazySpinner from "../../Components/LazySpinner";
import { useNavigate } from 'react-router-dom';

import UserContext from "../../Context/UserContext";
import PageTitle from "../../PageTitle";



export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();
    const { login, getUserData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoginError("");
        setIsLoading( true )

        const formData = {
            email,
            password
        }

        try {
            const res = await axiosInstance.post( 'user/login', formData )
                const authToken = res.data.token;
                localStorage.setItem( 'token', authToken )
                const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                localStorage.setItem('locale', userTimezone);
                getUserData();
                setIsLoading( false )
                navigate( '/manage/dashboard' );

        } catch (error) {
            setIsLoading( false );

            if (error.response) {
                console.log( error.response.data );
                if (error.response.data.error === "Invalid Email") {
                    setLoginError( "We could not find an account with your email" );
                }
            }

        }
    }

    return (
        <>
            <PageTitle title="Login" />


            <div className="flex justify-center items-center min-h-screen bg-gray-100"
            style={{ backgroundImage: 'url(assets/images/bg.webp)', backgroundSize: 'cover'}}>
                <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md bg-white rounded-2xl px-10 py-20 shadow-xl">

                    {loginError && (
                        <div className="py-3 text-center bg-red-500 text-white rounded-lg text-sm">
                            {loginError}
                        </div>
                    )}


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
                            <a href="/register" className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
                                Create account here
                            </a>
                        </div>
                    </form>
                </div>

            </div>


        </>

    )
}