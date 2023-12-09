import React from 'react';
import Image from 'next/image';

type NotFoundProps = {
    
};

const NotFound:React.FC<NotFoundProps> = () => {
    
    return <div>The page was not found <Image src='/robot.png'  width={171} height={213} alt='The image was also not found'/></div>
}
export default NotFound;