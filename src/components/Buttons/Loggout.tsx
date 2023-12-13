import { auth } from '@/firebase/firebase';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from "react-icons/fi";

type LoggoutProps = {
    
};

const Loggout:React.FC<LoggoutProps> = () => {
    const [signOut, loading] = useSignOut(auth);

    const handleLogOut = () => {
        signOut();
    }

    return <button className='bg-dark-fill-3 py-2 px-3 cursor-pointer rounded text-brand-orange' onClick={handleLogOut}>
        <FiLogOut />
    </button>
}
export default Loggout;