import Navbar from '@/components/Navbar/Navbar';
import AuthModals from '@/components/Modals/AuthModals';
import React, {useEffect, useState} from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import {useRecoilValue} from 'recoil'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import Image from 'next/image';

type AuthProps = {
    
};

const Auth:React.FC<AuthProps> = () => {
    const authModal = useRecoilValue(authModalState)

    const [user, loading, error] = useAuthState(auth)
    const [pageLoading, setPageLoading] = useState(true);

    const router = useRouter();
    useEffect(() => {
        if (user) router.push('/')
        if (!loading && !user) setPageLoading(false);
    }, [user, router, loading]);
    if (pageLoading) return null;

    return <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
        <div className='max-w-7xl mx-auto'></div>
            <Navbar/>
            <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
                    <Image src='/code/hero.png' alt="Hero img" width={639} height={391} priority={true}/>
            </div>
            {authModal.isOpen && <AuthModals/>}
    </div>
}
export default Auth;