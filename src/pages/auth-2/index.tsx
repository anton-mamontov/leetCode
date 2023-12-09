import Navbar from '@/components/Navbar/Navbar';
import AuthModals from '@/components/Modals/AuthModals';
import React from 'react';

type AuthProps = {
    
};

const Auth:React.FC<AuthProps> = () => {
    
    return <div className='bg-black max-w-7xl  mx-auto h-screen'>
        <AuthModals/>
        </div>;
}
export default Auth;