import Topbar from '@/components/Topbar/Topbar';
import Workspace from '@/components/Workspace/Workspace';
import useHasMounted from '@/hooks/useHasMounterd';
import { problems } from '@/utils/problems';
import { LocalProblem } from '@/utils/types/problem';
import React from 'react';

type ProblemPageProps = {
    problem:LocalProblem
};

const ProblemPage:React.FC<ProblemPageProps> = ({problem}) => {
    const hasMounted = useHasMounted();

    if (!hasMounted) return null;

    return <div>
        <Topbar problemPage={true}/>
        <Workspace problem={problem}/>
    </div>
}
export default ProblemPage;

// fetch the local data
// SSG - pages pre generated on the server
// getStaticPaths => it creates the dynamic routes
export async function getStaticPaths() {
    const paths = Object.keys(problems).map((key) => ({
        params:{pid:key}
    }));

    return {
        paths,
        fallback: false
    }
}

// getStaticProps => it fetch data

export async function getStaticProps({params}:{params:{pid:string}}) {
    const {pid} = params;
    const problem = problems[pid];

    if (!problem) {
        return {
            notfound: true
        }
    }

    problem.handlerFunction = problem.handlerFunction.toString();
    return {
        props: {
            problem
        }
    }
}