import React from 'react';
import ProblemDescription from './ProblemDescription';
import Split from 'react-split';
import Playground from './Playground/Playground';
import { LocalProblem } from '@/utils/types/problem';

type WorkspaceProps = {
    problem: LocalProblem
};

const Workspace:React.FC<WorkspaceProps> = ({problem}) => {

    return <Split className='split' minSize={0}>
        <ProblemDescription problem={problem}/>
        <div className='bg-dark-fill-2'>
            <Playground problem={problem}/>
        </div>
        </Split>
}
export default Workspace;