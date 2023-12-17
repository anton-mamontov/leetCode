import React from 'react';

type TestCaseInfoProps = {
    inputText: string,
    outputText: string
};

const TestCaseInfo:React.FC<TestCaseInfoProps> = ({inputText, outputText}) => {
    
    return <div className='font-semibold my-4'>
        <p className='tsxt-sm font-medium mt-4 text-white'>Input:</p>
        <div className='w-full cursor-text rounded-lg border border-transparent px-3 py-[10px] bg-dark-fill-3  text-white mt-2'>
            {inputText}
        </div>
        <p className='tsxt-sm font-medium mt-4 text-white'>Output:</p>
        <div className='w-full cursor-text rounded-lg border border-transparent px-3 py-[10px] bg-dark-fill-3  text-white mt-2'>
            {outputText}
        </div>
    </div>
}
export default TestCaseInfo;