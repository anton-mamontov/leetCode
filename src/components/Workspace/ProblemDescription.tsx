import { auth, firestore } from '@/firebase/firebase';
import { DbProblem, LocalProblem } from '@/utils/types/problem';
import { arrayUnion, doc, getDoc, runTransaction } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { AiFillDislike, AiFillLike, AiFillStar, AiOutlineLoading, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import RectangleSkeleton from '../Skeletons/RectangleSkeleton';
import CircleSkeleton from '../Skeletons/CircleSkeleton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

type ProblemDescriptionProps = {
    problem: LocalProblem
};

const ProblemDescription:React.FC<ProblemDescriptionProps> = ({problem}) => {
    const {currentProblem : problemStatistics, loading, problemDifficultyClass, setCurrentProblem} = useGetCurrentProblem(problem.id);
    const {liked, disliked, solved, starred, setData} = useGetUsersDataProblem(problem.id);
    const [user] = useAuthState(auth);
    const [updating, setUpdating] = useState(false);

    const handleClickLike = async () => {
       
        if (!user) {
            toast.error("You must be logged in to like a problem", {position:"top-center", theme:'dark'});
            return;
        }
        if (updating) return;
        setUpdating(true);
        await runTransaction(firestore, async (transaction) => {
            const userRef = doc(firestore, "users", user.uid);
            const problemRef = doc(firestore, "problems", problem.id);

            const userDoc = await transaction.get(userRef);
            const problemDoc = await transaction.get(problemRef);
            
            if (userDoc.exists() && problemDoc.exists()) {
                if (liked) {
                    //remove problemId from user liked problem, decrease counter
                    transaction.update(userRef, {
                        likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id)
                    })
                    transaction.update(problemRef, {
                        likes: problemDoc.data().likes - 1
                    })
                    setCurrentProblem(prev => ({...prev, likes: prev!.likes - 1} as DbProblem))
                    setData(prev => ({...prev, liked:false}));
                } else if (disliked) {
                    transaction.update(userRef, {
                        likedProblems: [...userDoc.data().likedProblems, problem.id],
                        dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id)
                    })
                    transaction.update(problemRef, {
                        disLikes: problemDoc.data().disLikes - 1,
                        likes: problemDoc.data().likes + 1
                    })
                    setCurrentProblem(prev => ({...prev, disLikes: prev!.disLikes - 1, likes: prev!.likes + 1} as DbProblem))
                    setData(prev => ({...prev, disliked:false, liked:true}));
                } else {
                    transaction.update(userRef, {
                        likedProblems: [...userDoc.data().likedProblems, problem.id]
                    })
                    transaction.update(problemRef, {
                        likes: problemDoc.data().likes + 1
                    })
                    setCurrentProblem(prev => ({...prev, likes: prev!.likes + 1} as DbProblem))
                    setData(prev => ({...prev, liked:true}));
                }
            }
        });
        setUpdating(false);
    }


    const handleDislikeClick = async () => {
       
        if (!user) {
            toast.error("You must be logged in to dislike a problem", {position:"top-center", theme:'dark'});
            return;
        }
        if (updating) return;
        setUpdating(true);
        await runTransaction(firestore, async (transaction) => {
            const userRef = doc(firestore, "users", user.uid);
            const problemRef = doc(firestore, "problems", problem.id);

            const userDoc = await transaction.get(userRef);
            const problemDoc = await transaction.get(problemRef);
            
            if (userDoc.exists() && problemDoc.exists()) {
                if (disliked) {
                    transaction.update(userRef, {
                        dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id)
                    })
                    transaction.update(problemRef, {
                        disLikes: problemDoc.data().disLikes - 1
                    })
                    setCurrentProblem(prev => ({...prev, disLikes: prev!.disLikes - 1} as DbProblem))
                    setData(prev => ({...prev, disliked:false}));
                } else if (liked) {
                    transaction.update(userRef, {
                        dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
                        likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id)
                    })
                    transaction.update(problemRef, {
                        likes: problemDoc.data().likes - 1,
                        disLikes: problemDoc.data().disLikes + 1
                    })
                    setCurrentProblem(prev => ({...prev, disLikes: prev!.disLikes + 1, likes: prev!.likes - 1} as DbProblem))
                    setData(prev => ({...prev, disliked:true, liked:false}));
                } else {
                    transaction.update(userRef, {
                        dislikedProblems: [...userDoc.data().dislikedProblems, problem.id]
                    })
                    transaction.update(problemRef, {
                        disLikes: problemDoc.data().disLikes + 1
                    })
                    setCurrentProblem(prev => ({...prev, disLikes: prev!.disLikes + 1} as DbProblem))
                    setData(prev => ({...prev, disliked:true}));
                }
            }
        });
        setUpdating(false);
    }

    const handleStarClicked = async () => {
        if (!user) {
            toast.error("You must be logged in to dislike a problem", {position:"top-center", theme:'dark'});
            return;
        }
        if (updating) return;
        setUpdating(true);

        await runTransaction(firestore, async (transaction) => {
            const userRef = doc(firestore, "users", user.uid);
            const userDoc = await transaction.get(userRef);

            if (userDoc.exists()) {
                if (starred) {
                    transaction.update(userRef, {
                        starredProblems: userDoc.data().starredProblems.filter((id: string) => id !== problem.id)
                    });
                    setData(prev => ({...prev, starred:false}));
                } else {
                    transaction.update(userRef, {
                        starredProblems: arrayUnion(problem.id),
                    });
                    setData(prev => ({...prev, starred:true}));
                }
            }
        });

        setUpdating(false);
    }

    return <div className='bg-dark-layer-1'>
        <div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
            <div className='bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer'>
                Description
            </div>
        </div>

        <div className='flex px-0 py-4 h-[calc(100vh-114px)] overflow-y-auto'>
            <div className='px-5'>
                <div className='w-full'>
                    <div className='flex space-x-4'>
                        <div className='flex-1 mr-2 text-lg text-white font-medium'>{problem.title}</div>
                    </div>
                </div>
                {loading && (
                    <div className='mt-3 flex space-x-2'>
                        <RectangleSkeleton/>
                        <CircleSkeleton/>
                        <RectangleSkeleton/>
                        <RectangleSkeleton/>
                    </div>
                )}
                {!loading && problemStatistics && <div className='flex items-center mt-3'>
                    <div className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}>{problemStatistics?.difficulty}</div>
                    {solved && (
                        <div className='rounded p-[3x] ml-4 text-lg transition-colors duration-200 text-dark-green-s'>
                            <BsCheck2Circle/>
                        </div>
                    )}
                    <div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
                        onClick={handleClickLike}
                    >
                        {updating? (<AiOutlineLoading3Quarters className='animate-spin'/>) 
                        : liked? <AiFillLike className='text-dark-blue-s'/>
                        : <AiFillLike />
                        }
                        <span className='text-xs'>{problemStatistics.likes}</span>
                    </div>
                    <div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
                        onClick={handleDislikeClick}
                    >
                        {updating? (<AiOutlineLoading3Quarters className='animate-spin'/>) 
                        : disliked? <AiFillDislike className='text-dark-blue-s'/>
                        : <AiFillDislike />
                        }
                        <span className='text-xs'>{problemStatistics.disLikes}</span>
                    </div>
                    <div className='cursor-pointer hover:bg-dark-fill-3 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-dark-gray-6'
                        onClick={handleStarClicked}
                    >
                        {updating? (<AiOutlineLoading3Quarters className='animate-spin'/>) 
                        : starred? <AiFillStar className='text-yellow-500'/>
                        : <TiStarOutline/>
                        }
                    </div>
                </div>
                }

                {/* Problem statement */}
                <div className='text-white text-sm'>
                   <div
                        dangerouslySetInnerHTML={{__html: problem.problemStatement}}
                   />
                </div>

                {/* Examples */}
                <div className='mt-4'>
                    {problem.examples.map((example, index) => (
                    <div key={index}>
                        <p className='text-white font-medium'>Example {example.id}:</p>
                        {example.img && <img className='mt-3' src={example.img} alt={`example ${example.id} image`}/>}
                        <div className='example-card'>
                            <pre className='dark-label-2 bg-dark-fill-3 mb-1 mt-1 p-1 whitespace-pre-wrap text-dark-label-2'>
                                <strong className='text-white text-base'>Input:</strong> {example.inputText}<br/>
                                <strong className='text-white text-base'>Output:</strong> {example.outputText}<br/>
                                {example.explanation && (<><strong className='text-white text-base'>Explanation:</strong> {example.explanation}</>)}
                            </pre>
                        </div>
                    </div>
                    ))}             
                </div>

                {/* Constraints */}
                <div className='text-white text-sm my-5 font-medium pb-2'>
                    <div>Constraints</div>
                    <div
                        dangerouslySetInnerHTML={{__html: problem.constraints}}
                   />
                </div>
                
            </div>

        </div>

    </div>
}
export default ProblemDescription;

function useGetCurrentProblem(problemId:string) {
    const [currentProblem, setCurrentProblem] = useState<DbProblem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [problemDifficultyClass, setproblemDifficultyClass] = useState<string>('');

    useEffect(() => {
        // get problem from DB
        const getCurrentProblem = async () => {
            setLoading(true);
            const docRef = doc(firestore, "problems", problemId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const problem = docSnap.data();
                setCurrentProblem({id:docSnap.id, ...problem} as DbProblem);

                setproblemDifficultyClass(
                    problem.difficulty === "Easy" ? "bg-olive  text-olive" : 
                    problem.difficulty === "Medium" ? "bg-dark-yellow text-dark-yellow" :
                    problem.difficulty === "Hard" ? "bg-dark-pink text-dark-pink" : ""
                )
            }
            setLoading(false);
        }

        getCurrentProblem();
    }, [problemId]) 

    return {currentProblem, loading, problemDifficultyClass, setCurrentProblem}
}

function useGetUsersDataProblem(problemId: string) {
    const [data, setData] = useState({liked:false, disliked:false, starred:false, solved:false})
    const [user] = useAuthState(auth);
    useEffect(() => {
        const getUserDataOnProblem = async () => {
            const userRef = doc(firestore, "users", user!.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const data = userSnap.data();
                const {solvedProblems, likedProblems, dislikedProblems, starredProblems} = data;
                setData({
                    liked:likedProblems.includes(problemId),
                    disliked:dislikedProblems.includes(problemId),
                    starred:starredProblems.includes(problemId),
                    solved:solvedProblems.includes(problemId),
                });
            }
        };

        if (user) getUserDataOnProblem();
        return () => setData({liked:false, disliked:false, starred:false, solved:false});
    }, [problemId, user])

    return {...data, setData}
}