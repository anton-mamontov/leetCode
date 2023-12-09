import {atom} from 'recoil';

export type AuthModalState = {
    isOpen: boolean;
    type: 'login' | 'register' | 'forgotPassword';
}

const initialAutModalState: AuthModalState = {
    isOpen: false,
    type: 'login'
};

export const authModalState = atom<AuthModalState>({
    key: 'authModalState',
    default: initialAutModalState
})