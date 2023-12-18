import React, {useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil'
import {AuthModalState, authModalState } from '@/atoms/authModalAtom';
import { auth, firestore } from '@/firebase/firebase';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';

type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {
    const setAuthModalType = useSetRecoilState(authModalState)

    const handleClick = (type: AuthModalState["type"]) => {
        setAuthModalType((prev) => ({...prev, type:type}))
    }
    const [inputs, setInputs] = useState({email:'', displayName:'', password:''})
    const router = useRouter()
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth);
    
    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    };

    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!inputs.email || !inputs.displayName || !inputs.displayName) {
            toast.warn("Please fill all fields", {position: 'top-center', autoClose: 3000, theme:'dark'});
            return;
        }
        try {
            toast.loading("Creating your account", {
                position: 'top-center',
                theme:'dark',
                toastId: 'accountCreationToast'
            })
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if (!newUser) return;
            const userData = {
                uid: newUser.user.uid,
                email: newUser.user.email,
                displayName: inputs.displayName,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                likedProblems: [],
                dislikedProblems: [],
                solvedProblems: [],
                starredProblems: []
            }
            await setDoc(doc(firestore, "users", newUser.user.uid), userData)
            router.push('/')
        } catch (error: any) {
            toast.error(error.message, {position: 'top-center', autoClose: 2000, theme:'dark'});
        } finally {
            toast.dismiss('accountCreationToast');
        }
    };

    useEffect(() => {
        if (error)  toast.error(error.message, {position: 'top-center', autoClose: 3000, theme:'dark'});
    }, [error])

    return <form className='space-y-6 px-6 pb-4' onSubmit={handleRegister}>
           <h3 className='text-xl font-medium text-white'>Register to Mammoth Code</h3>
           <div>
                <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
                    Email
                </label>
                <input
                onChange={handleChangeInput}
                type="email" name="email" id="email" className='border-2 outline-none sm:text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                    '
                    placeholder='name@domain.com'
                />
           </div>
           <div>
                <label htmlFor='displayName' className='text-sm font-medium block mb-2 text-gray-300'>
                    Display Name
                </label>
                <input
                onChange={handleChangeInput}
                type="text" name="displayName" id="displayName" className='border-2 outline-none sm:text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                    '
                    placeholder='John doe'
                />
           </div>
           <div>
                <label htmlFor='password' className='text-sm font-medium block mb-2 text-gray-300'>
                    Password
                </label>
                <input
                onChange={handleChangeInput}
                type="password" name="password" id="password" className='border-2 outline-none sm:text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
                    '
                    placeholder='*****'
                />
           </div>
           <button type='submit' className='w-full text-white focus:ring-blue-300 font-medium rounded-lg
                text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s
           '>
                {loading ? "Registering..." : "Register"}
           </button>
           <button className='flex w-full justify-end'>
                <div className='text-sm font-medium text-gray-300'>
                    Already have an account?{" "}
                    <a href='#' className='text-blue-700 hover:underline' onClick={() => handleClick('login')}>
                        Log in
                    </a>
                </div>
           </button>
    </form>
}
export default Signup;