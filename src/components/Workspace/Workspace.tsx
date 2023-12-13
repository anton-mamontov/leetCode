import React from 'react';
import ProblemDescription from './ProblemDescription';
import Split from 'react-split';

type WorkspaceProps = {
    
};

const Workspace:React.FC<WorkspaceProps> = () => {
    
    return <Split className='split'>
         <ProblemDescription/>
        <div>
            Code editor
        </div>
       
    </Split>
}
export default Workspace;