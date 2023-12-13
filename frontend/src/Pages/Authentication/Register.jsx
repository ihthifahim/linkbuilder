import PageTitle from "../../PageTitle";
import React, {useContext, useState} from "react";
import axiosInstance from "../../utils/axiosConfig";
import UserContext from "../../Context/UserContext";
import { useNavigate } from 'react-router-dom';


export default function Register(){
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();
    const { getUserData } = useContext(UserContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading( true )

        const formData = {
            firstname,
            lastname,
            email,
            password
        }

        try{
            const res = await axiosInstance.post('user/signup', formData)
            const authToken = res.data.token;
            localStorage.setItem( 'token', authToken )
            const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            localStorage.setItem('locale', userTimezone);
            getUserData();
            setIsLoading( false )
            navigate( '/manage/dashboard' );
        } catch(error){

        }
    }
    return(
        <>
            <PageTitle title="Register"/>

            <div className="flex justify-center items-center min-h-screen bg-gray-100"
                 style={{ backgroundImage: 'url(assets/images/bg.webp)', backgroundSize: 'cover'}}>
                <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md bg-white rounded-2xl px-10 py-20 shadow-xl">


                    <div className="flex flex-col space-y-2 text-center">
                        <h2 className="text-3xl md:text-3xl font-bold mb-5">Let's create an account</h2>
                    </div>
                    <form onSubmit={ handleSubmit }>
                        <div className="flex flex-col max-w-md space-y-5">
                            <input type="text" placeholder="First Name"
                                   value={firstname}
                                onChange={ (e) => setFirstname( e.target.value ) }
                                   className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"/>
                            <input type="text" placeholder="Last Name"
                                   value={lastname}
                                onChange={ (e) => setLastname( e.target.value ) }
                                   className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"/>
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
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>

                            <span className="text-center"><a href="/login">Have an account? Login</a></span>


                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}