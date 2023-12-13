import {atom} from 'recoil';

export type YoutubeModalState = {
    isOpen: boolean;
    videoId: string;
}

const initialAutModalState: YoutubeModalState = {
    isOpen: false,
    videoId: ''
};

export const youtubeModalState = atom<YoutubeModalState>({
    key: 'youtubeModalState',
    default: initialAutModalState
})