import React, { useEffect, useState } from 'react';
import ProblemsTableBody from '@/components/ProblemsTable/ProblemsTableBody'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/firebase';
import { DbProblem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';

type PorblemsTableProps = {
    
};

const ProblemsTable:React.FC<PorblemsTableProps> = () => {
    const [loadingProblems, setLoadingProblems] = useState(true);
    const [loadingProblemsStatuses, setloadingProblemsStatuses] = useState(true);

    const problems = useGetProblems(setLoadingProblems);
    const solvedProblems = useGetSolvedProblems(setloadingProblemsStatuses);
    return <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
      {loadingProblems && loadingProblemsStatuses && (
        <div className='animate-pulse max-w-[1200px] mx-auto sm:w-7/12 w-full'>
          {[...Array(10)].map((_, idx) => <LoadingSkeleton key={idx}/>)}        
        </div>
      )}
      {!loadingProblems && !loadingProblemsStatuses && (
         <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-9/12 w-full max-w-[1200px] mx-auto'>
         <thead className='text-xs uppercase text-gray-400 border-b'>
           <tr>
             <th scope='col' className='px-1 py-3 w-0 font-medium'>
               Status
             </th>
             <th scope='col' className='px-6 py-3 w-0 font-medium'>
               Title
             </th>
             <th scope='col' className='px-6 py-3 w-0 font-medium'>
               Difficulty
             </th>
             <th scope='col' className='px-6 py-3 w-0 font-medium'>
               Category
             </th>
             <th scope='col' className='px-6 py-3 w-0 font-medium'>
               Solution
             </th>
           </tr>
         </thead>
         <ProblemsTableBody problems={problems} solvedProblems={solvedProblems}/>
       </table>
      )}
   
  </div>
}
export default ProblemsTable;

const LoadingSkeleton = () => {
  return (
    <div className='flex items-center space-x-12 mt-4 px-6'>
      <div className='w-6 h-6 shrink-0 rounded-full bg-dark-layer-1'></div>
      <div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
      <div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
      <div className='h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1'></div>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}


function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
    const [problems, setProblems] = useState<DbProblem[]>([]);

    useEffect(() => {
        const getProblems = async () => {
            setLoadingProblems(true);
            const q = query(collection(firestore, "problems"), orderBy("order", "asc"))
            const querySnapshot = await getDocs(q);
            const tmp: DbProblem[] = [];
            querySnapshot.forEach((doc) => {
              tmp.push({id:doc.id,...doc.data()} as DbProblem);
            })
            setProblems(tmp);
            setLoadingProblems(false);
        }

        getProblems()
    }, [setLoadingProblems])
    return problems;
}

function useGetSolvedProblems(setloadingProblemsStatuses: React.Dispatch<React.SetStateAction<boolean>>) {
  const [solvedProblems, setSolvedProblems] = useState<String[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getSolvedProblems = async () => {
      setloadingProblemsStatuses(true);
      const userRef = doc(firestore, "users", user!.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setSolvedProblems(userDoc.data().solvedProblems);
      }
      setloadingProblemsStatuses(false)
    }
    
    if (user) getSolvedProblems();
    if (!user) {
      setSolvedProblems([])
      setloadingProblemsStatuses(false);
    };
  }, [user, setloadingProblemsStatuses])

  return solvedProblems;
}