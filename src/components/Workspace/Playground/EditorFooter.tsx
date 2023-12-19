import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

type EditorFooterProps = {
    handleSubmit: () => void;
};

const EditorFooter:React.FC<EditorFooterProps> = ({handleSubmit}) => {
    
    return (
    <div className='flex bg-dark-layer-1  font-medium z-10 absolute bottom-0 text-sm w-full px-4'>
        <div className='my-[10px] flex justify-between w-full'>
            <div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
                <button className='px-3 py-1.5 mr-2 text-dark-label-2 bg-dark-fill-3 hover:bg-dark-fill-2 rounded-lg inline-flex items-center pl-3 pr-2'>
                    Console
                    <div className='ml-1 transform transition flex items-center'>
                        <BsChevronUp className='fill-dark-gray-6 mx-1'/>
                    </div>
                </button>
            </div>
        
            <div className='ml-auto flex space-x-4'>
                <button className='px-3 py-1.5 text-dark-label-2 bg-dark-fill-3 hover:bg-dark-fill-2 rounded-lg' onClick={handleSubmit}>
                    Run
                </button>
                <button className='px-3 py-1.5 text-white bg-dark-green-s hover:bg-green-500 rounded-lg' onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    </div>
    );
}
export default EditorFooter;