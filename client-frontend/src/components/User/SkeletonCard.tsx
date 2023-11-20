export const SkeletonCard = () => {
    return (
      <>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg animate-pulse">
            <div className='flex flex-col items-center py-5'>
                <div className='w-24 h-24 mb-3 rounded-full bg-gray-300'/>
                <div className="h-6 w-9/12 rounded-md bg-gray-300"/>
            </div>
        </div>
      </>
    );
  };