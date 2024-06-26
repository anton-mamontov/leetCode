import React, { useEffect, useState } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from 'react-icons/ai';
import { ISettings } from '../Playground';
import SettingsModal from '@/components/Modals/SettingsModal';

type PreferenceNavProps = {
    settings: ISettings,
    setSettings: React.Dispatch<React.SetStateAction<ISettings>>
};

const PreferenceNav:React.FC<PreferenceNavProps> = ({settings, setSettings}) => {
    const [isFullScreen, setFullScreen] = useState<boolean>(false);
    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else{
            document.documentElement.requestFullscreen();
        }
        setFullScreen(prev => !prev);
    };

    useEffect(() => {
        function exitHandler(e: any) {
            if (!document.fullscreenElement) {
                setFullScreen(false);
                return;
            }
            setFullScreen(true);
        }

        if (document.addEventListener) {
            document.addEventListener("fullscreenchange", exitHandler);
            document.addEventListener("webkitfullscreenchange", exitHandler);
            document.addEventListener("mozfullscreenchange", exitHandler);
            document.addEventListener("MSFullscreenChange", exitHandler);
        }

        return () => {
            if (document.removeEventListener) {
              document.removeEventListener("fullscreenchange", exitHandler);
              document.removeEventListener("webkitfullscreenchange", exitHandler);
              document.removeEventListener("mozfullscreenchange", exitHandler);
              document.removeEventListener("MSFullscreenChange", exitHandler);
            }
          };
    }, [isFullScreen])

    const handleSettingsClick = () => {
        setSettings((prev) => ({...prev, settingsModalIsOpen:true}))
    }
    
    return <div className='flex items-center justify-between bg-dark-layer-2 h-11 w-full'>
        <div className='flex items-center'>
            <button className='flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium'>
                <div className='text-xs text-label-2 text-left dark:text-dark-label-2'>JavaScript</div>
            </button>
        </div>

        <div className='flex items-center m-2'>
            <button className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-dark-fill-3 group'
                onClick={handleSettingsClick}
            >
                <div className='text-dark-gray-6 h-4 w-4 text-lg'>
                    <AiOutlineSetting/>              
                </div>
                <div className='absolute w-auto p-2 text-sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rounded-md shadow-md text-dark-layer-2 bg-gray-200 origin-center scale-0
                    transition-all duration-100 ease-linear group-hover:scale-100
                '>
                    Settings
                </div>
            </button>

            <button className='relative rounded px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex ml-auto p-1 mr-2 hover:bg-dark-fill-3 group'
                onClick={handleFullScreen}
            >
                <div className='text-dark-gray-6 h-4 w-4 text-lg'>
                   {isFullScreen ? <AiOutlineFullscreenExit/> : <AiOutlineFullscreen/>}
                </div>
                <div className='absolute w-auto p-2 text-sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rounded-md shadow-md text-dark-layer-2 bg-gray-200 origin-center scale-0
                    transition-all duration-100 ease-linear group-hover:scale-100
                '>
                    {isFullScreen ? `Exit full screen` :`Full screen`}
                    
                </div>
            </button>
        </div>
        {settings.settingsModalIsOpen && <SettingsModal settings={settings} setSettings={setSettings}/>}
    </div>
}
export default PreferenceNav;