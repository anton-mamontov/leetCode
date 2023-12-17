import { LocalProblem } from '@/utils/types/problem';
import React from 'react';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';

type ProblemDescriptionProps = {
    problem: LocalProblem
};

const ProblemDescription:React.FC<ProblemDescriptionProps> = ({problem}) => {
    
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
                <div className='flex items-center mt-3'>
                    <div className='text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize'>easy</div>
                    <div className='rounded p-[3x] ml-4 text-lg transition-colors duration-200 text-dark-green-s'>
                        <BsCheck2Circle/>
                    </div>
                    <div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6'>
                        <AiFillLike/>
                        <span className='text-xs'>120</span>
                    </div>
                    <div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-dark-gray-6'>
                        <AiFillDislike/>
                        <span className='text-xs'>2</span>
                    </div>
                    <div className='cursor-pointer hover:bg-dark-fill-3 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-dark-gray-6'>
                        <TiStarOutline/>
                    </div>
                </div>

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