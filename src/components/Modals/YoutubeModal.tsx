import { YoutubeModalState, youtubeModalState } from '@/atoms/youtubeModalAtom';
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';
import { useSetRecoilState } from 'recoil';

type YoutubeModalProps = {
    videoId: YoutubeModalState["videoId"]
};

const YoutubeModal:React.FC<YoutubeModalProps> = (props) => {
    const closeModal = useCloseModal();
    
    return (
        <div className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
            <div className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute' onClick={closeModal}></div>
            <div className='w-full z-50 h-full  px-6 relative max-w-4xl'>
                <div className='w-full h-full flex items-center justify-center relative'>
                    <div className='w-full relative'>
                        <IoClose fontSize={"35"} className='cursor-pointer absolute  right-0' onClick={closeModal}/>
                        <YouTube videoId={props.videoId} loading='lazy' iframeClassName='w-full min-h-[500px]'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default YoutubeModal;

function useCloseModal() {
    const setAuthModalState = useSetRecoilState(youtubeModalState)
    const closeModal = () => {
        setAuthModalState((prev) => ({...prev, isOpen:false}))
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key ==="Escape")  closeModal();
        };

        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [])

    return closeModal;
}