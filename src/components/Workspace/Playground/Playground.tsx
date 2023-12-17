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

type PlaygroundProps = {
    problem: LocalProblem
};

const Playground:React.FC<PlaygroundProps> = ({problem}) => {
    const [currentTestCaseId, setcurrentTestCaseId] = useState(0);
    const currentTestCase = problem.examples[currentTestCaseId];
    
    return <div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
        <PreferenceNav/>
        <Split className='h-[calc(100vh-114px)]' direction="vertical"  minSize={60}>
            <div className='w-full overflow-auto'>
                <CodeMirror
                    value={problem.starterCode}
                    theme={vscodeDark}
                    extensions={[javascript(),  EditorView.lineWrapping]}
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
                </div>                {currentTestCase && <TestCaseInfo inputText={currentTestCase.inputText} outputText={currentTestCase.outputText}/>}
            </div>
        </Split>
        <EditorFooter/>
    </div>
}
export default Playground;