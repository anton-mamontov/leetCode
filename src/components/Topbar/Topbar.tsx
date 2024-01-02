import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loggout from "../Buttons/Loggout";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import Image from "next/image";
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import { BsList } from "react-icons/bs";
import Timer from "../Timer/Timer";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import { LocalProblem } from "@/utils/types/problem";


type TopbarProps = {
  problemPage? : boolean;
};

const Topbar: React.FC<TopbarProps> = ({problemPage}) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  const onSignInClickHandler = () => (
    setAuthModalState((prev) => ({...prev, isOpen:true, type:'login'}))
  );

  const router = useRouter();
  const handleProblemChange = (isForward:boolean) => {
    const {order} = problems[router.query.pid as string] as LocalProblem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(key => problems[key].order === nextProblemOrder);


    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(key => problems[key].order === 1);
      router.push(`/problems/${firstProblemKey}`)
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(key => problems[key].order === Object.keys(problems).length);
      router.push(`/problems/${lastProblemKey}`)
    } else {
      router.push(`/problems/${nextProblemKey}`)
    }
  };

  return <nav className="relative flex h-[70px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
    <div className="flex w-full items-center justify-between max-w-[1200px] mx-auto">
      <div className="h-[50px] ">
        <Link href='/' >
          <Image src="/code/mammoth1.jpg" alt="Logo Image" width={500} height={500} style={{ height: '100%', width: 'auto' }} quality={100} priority={true}/>
        </Link>
      </div>
      {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center ml-80">
            <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft/>
            </div>
            <Link href="/" className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer">
              <div>
                <BsList/>
              </div>
              <p>Problems list</p>
            </Link>
            <div className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight/>
            </div>
        </div>
      )}
      <div className="flex items-center space-x-4 flex-1 justify-end mr-10">
        <div>
          <a 
            href="https://www.buymeacoffee.com/anton.mamontov"
            target="_blank"
            rel='noreferrer'
            className="bg-dark-fill-3 pt-[5px] pb-[6px] px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
          >
            Buy me a coffe
          </a>
        </div>
        {problemPage && user && <Timer/>}
        {!user && (
          <Link href='/auth'>
            <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded" onClick={onSignInClickHandler}>Sign In</button>
          </Link>
          )}
        {user && (
          <div className="flex flex-row gap-3">
            <div className="cursor-pointer group relative">
              <img src="/code/avatar.png" alt="user profile image" className="h-8 w-8 rounded-full"/>  
              <div className="absolute top-10 left-1/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 shadow-lg
                z-40 group-hover:scale-100 scale-0
                transition-all duration-300 ease-out
              ">
                <p className="text-sm">{user.email}</p>
              </div>        
            </div>
            <Loggout/>
          </div>
        )}
      </div>
    </div>
  </nav>
};
export default Topbar;
 