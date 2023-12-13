import React from 'react';
import ProblemsTableBody from '@/components/ProblemsTable/ProblemsTableBody'

type PorblemsTableProps = {
    
};

const ProblemsTable:React.FC<PorblemsTableProps> = () => {
    
    return <div className='relative overflow-x-auto mx-auto px-6 pb-10'>
    <table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-9/12 w-full max-w-[1200px] mx-auto'>
      <thead className='text-xs uppercase text-gray-400 border-b'>
        <tr>
          <th scope='col' className='px-1 py-3 w-0 font-medium'>
            Status
          </th>
          <th scope='col' className='px-6 py-3 w-0 font-medium'>
            Title
          </th>
          <th scope='col' className='px-6 py-3 w-0 font-medium'>
            Difficulty
          </th>
          <th scope='col' className='px-6 py-3 w-0 font-medium'>
            Category
          </th>
          <th scope='col' className='px-6 py-3 w-0 font-medium'>
            Solution
          </th>
        </tr>
      </thead>
      <ProblemsTableBody/>
    </table>
  </div>
}
export default ProblemsTable;