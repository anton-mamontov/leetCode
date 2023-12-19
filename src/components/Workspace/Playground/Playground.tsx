import React, { useState } from 'react';

import PreferenceNav from './PreferenceNavBar/PreferenceNav';
import Split from 'react-split';
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
import { EditorView as EditorView } from "@codemirror/view";
import { LocalProblem } from '@/utils/types/problem';
import TestCaseInfo from './TestCaseInfo';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { problems } from '@/utils/problems';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

type PlaygroundProps = {
    problem: LocalProblem,
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>
    setSolved: React.Dispatch<React.SetStateAction<boolean>>
};

const Playground:React.FC<PlaygroundProps> = ({problem, setSuccess, setSolved}) => {
    const [currentTestCaseId, setcurrentTestCaseId] = useState(0);
    const currentTestCase = problem.examples[currentTestCaseId];
    const [userCode, setUserCode] = useState<string>(problem.starterCode);
    const [user] = useAuthState(auth);
    const {query : {pid}} = useRouter();

    const handleSubmit = async () => {
        if (!user) {
            toast.error("Please login to submit you code", {
                position:"top-center",
                theme: 'dark',
                autoClose: 3000
            })
            return;
        }
        try {
            const cb = new Function(`return ${userCode}`)();
            const success = problems[pid as string].handlerFunction(cb);
            if (success) {
                const userRef = doc(firestore, "users", user.uid);
                await updateDoc(userRef, {
                    solvedProblems: arrayUnion(pid)
                });
                toast.success("Congrats! All tests passed!!", {
                    position:"top-center",
                    theme: 'dark',
                    autoClose: 3000
                });
                setSolved(true);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 4000)
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:")) {
                    toast.error("Ooops! One or more test casses failed", {
                        position:"top-center",
                        theme: 'dark',
                        autoClose: 3000
                    })
                } else {
                    toast.error(error.message, {
                        position:"top-center",
                        theme: 'dark',
                        autoClose: 3000
                    })
                }
            } else {
                toast.error("Ooops, something went wrong", {
                    position:"top-center",
                    theme: 'dark',
                    autoClose: 3000
                })
            }
        }
    }



    const onChange = (value:string) => {
        setUserCode(value);
    }
    
    return <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
        <PreferenceNav/>
        <Split className='h-[calc(100vh-114px)]' direction="vertical"  minSize={60}>
            <div className='w-full overflow-auto'>
                <CodeMirror
                    value={problem.starterCode}
                    theme={vscodeDark}
                    extensions={[javascript(),  EditorView.lineWrapping]}
                    onChange={onChange}
                    style={{fontSize:16}}
                />
            </div>
            <div className='w-full px-5 overflow-auto pb-10'>
                <div className='flex h-10 items-center space-x-6'>
                    <div className='relative flex h-full flex-col justify-center cursor-pointer'>
                        <div className='text-small font-medium leading-5 text-white'>Test Cases</div>
                        <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white'/>
                    </div>
                </div>
                <div className='flex'>
                {problem.examples.map((example, id) => {
                    return (
                    <div className='mr-2 items-start mt-2 ' key={id} onClick={() => setcurrentTestCaseId(id)}>
                        <div className='flex flex-wrap items-center gap-y-4'>
                            <div className={`font-medium items-center transition-all focus:outline-none inline-flex
                                hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                                ${currentTestCaseId === id ? 'bg-dark-fill-2 text-white' : ' bg-dark-fill-3 text-gray-400'}
                            `}>
                                Case {example.id}
                            </div>
                        </div>
                    </div>
                    )})}
                </div>
                {currentTestCase && <TestCaseInfo inputText={currentTestCase.inputText} outputText={currentTestCase.outputText}/>}
            </div>
        </Split>
        <EditorFooter handleSubmit={handleSubmit}/>
    </div>
}
export default Playground;