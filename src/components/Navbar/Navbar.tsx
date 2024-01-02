import { authModalState } from '@/atoms/authModalAtom';
import Link from 'next/link';
import React from 'react';
import {useSetRecoilState} from 'recoil';

type NavbarProps = {
    
};

const Navbar:React.FC<NavbarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = () => {
        setAuthModalState((prev) => ({...prev, isOpen:true, type:'login'}))
    }
    
    return <div className='h-[70px] flex items-center justify-between sm:px-12 px-2 md:px-24'>
            <Link href="/" className='flex-item-center justify-normal'>
                <img src='/code/mammoth1.jpg' alt='Mamont Lab' width='h-[50x]' className='flex items-center h-[50px]'/>
            </Link>
            <div className="flex items-center">
                <button
                    className='bg-brand-orange text-white px-2 sm:px-4 rounded-lg text-sm font-medium border-2 border-transparent
                    hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange
                    transition duration-300 ease-in-out
                    '
                    onClick={handleClick}
                >Sign In</button>
            </div>
    </div>
}
export default Navbar;