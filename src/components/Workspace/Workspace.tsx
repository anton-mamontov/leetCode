import React from 'react';
import ProblemDescription from './ProblemDescription';
import Split from 'react-split';
import Playground from './Playground/Playground';
import { LocalProblem } from '@/utils/types/problem';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';

type WorkspaceProps = {
    problem: LocalProblem
};

const Workspace:React.FC<WorkspaceProps> = ({problem}) => {
    const {width, height} = useWindowSize();

    return <Split className='split' minSize={0}>
        <ProblemDescription problem={problem}/>
        <div className='bg-dark-fill-2'>
            <Playground problem={problem}/>
            <Confetti
                gravity={0.3}
                tweenDuration={4000}
                width={width - 1}
                height={height - 1}
            />
        </div>
        </Split>
}
export default Workspace;