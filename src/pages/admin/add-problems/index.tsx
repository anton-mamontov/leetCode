import { auth, firestore } from '@/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';
import { DbProblem } from '@/utils/types/problem';

type AddProblemsProps = {
    
};

const AddProblems:React.FC<AddProblemsProps> = () => {
    const [user, loading, error] = useAuthState(auth);
    const [pageLoading, setPageLoading] = useState(true);
    const [admin, setAdmin] = useState(false);

    const [inputs, setInputs] = useState<DbProblem>({
        id : '',
        title: '',
        category: '',
        difficulty: '',
        videoId: '',
        link: '',
        order: 0,
        likes: 0,
        disLikes: 0
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newProblem = {
            ...inputs,
            order: Number(inputs.order),
        }
        await setDoc(doc(firestore, "problems", inputs.id), newProblem);
        alert("Save to db");
    }

    useEffect(() => {
        if (user && user.email =="anton.mamont.work@gmail.com") {
            setAdmin(true);
            setPageLoading(false)
        }
        if (!loading && !user) setPageLoading(false);
    }, [user, loading]);
    if (pageLoading) return null;
    return (<div className=''>
        {admin && (
            <div className='border-2 border-dark-fill-2 my-2 bg-slate-500 text-black border-solid'>
            <form className='p-6 flex flex-col max-w-sm gap-3' onSubmit={handleSubmit}>
                <input onChange={handleInputChange} type="text" placeholder='problem id' name="id" className='' required/>
                <input onChange={handleInputChange} type="text" placeholder='title' name="title" required/>
                <input onChange={handleInputChange} type="text" placeholder='difficulty' name="difficulty" required/>
                <input onChange={handleInputChange} type="text" placeholder='category' name="category" required/>
                <input onChange={handleInputChange} type="text" placeholder='order' name="order" required/>
                <input onChange={handleInputChange} type="text" placeholder='videoId?' name="videoId"/>
                <input onChange={handleInputChange} type="text" placeholder='link?' name="link"/>
                <button className='bg-dark-fill-3'>Save to firestore</button>
            </form>
            </div>
        )}
    </div>)
}
export default AddProblems;


