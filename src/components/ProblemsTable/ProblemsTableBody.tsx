import {BsCheckCircle} from 'react-icons/bs'
import {AiFillYoutube} from 'react-icons/ai'
import React from 'react';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { youtubeModalState } from '@/atoms/youtubeModalAtom';
import { DbProblem } from '@/utils/types/problem';

type ProblemsTableBodyProps = {
    problems: DbProblem[];
};

const ProblemsTableBody:React.FC<ProblemsTableBodyProps> = ({problems}) => {
    const setYoutubeModalState = useSetRecoilState(youtubeModalState);
    const handleClick = (videoId: string) => {
        setYoutubeModalState((prev) => ({...prev, isOpen:true, videoId:videoId}))
    }

    return (
        <>
            <tbody className='text-white'>
                {problems.map((problem, idx) => {
                    const difficultyColor = problem.difficulty === 'Easy' ? 'text-green-500' 
                    : problem.difficulty === 'Medium' ? 'text-yellow-500' 
                    : problem.difficulty === 'Hard' ? 'text-red-700' : '';
                    return(
                        <tr key={problem.id} className={`${idx % 2 == 1 ? 'bg-dark-layer-1' : ''}`}>
                            <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                                <BsCheckCircle fontSize={"18"} width="18"/>
                            </th>
                            <td className='px-6 py-4'>
                                {problem.link? (
                                <Link className='hover:text-blue-600 cursor-pointer' target='_blank'  rel='noreferrer' href={problem.link}>
                                    {problem.title} 
                                </Link>
                                ) : (
                                <Link className='hover:text-blue-600 cursor-pointer' href={`/problems/${problem.id}`}>
                                    {problem.title} 
                                </Link>
                                )
                                }
                                
                            </td>
                            <td className={`px-6 py-4 ${difficultyColor}`}>{problem.difficulty}</td>
                            <td className='px-6 py-4'>{problem.category}</td>
                            <td className='px-6 py-4'>
                                { problem.videoId ? (
                                    <AiFillYoutube  fontSize={"25"} className='cursor-pointer hover:text-red-600' onClick={() => handleClick(problem.videoId || '')}/>
                                ) 
                                : <p className='text-gray-400'>Coming soon</p>}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </>
    )
}
export default ProblemsTableBody;