'use client' // Error components must be Client Components
 
import Link from 'next/link'
import { useEffect } from 'react'
 
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    
    return (
        <main className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
            <div className='text-center'>
                <p className='text-base font-semibold text-gray-700 dark:text-gray-500'>
                    There was a problem
                </p>
                <h1 className='mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
                    {error.message || 'Something went wrong!'}
                </h1>
                <div className='mt-10 flex items-center justify-center gap-x-6'>
                    <button
                        className='btn bg-red-600 hover:bg-red-500'
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                    > Try again </button>
                    <Link 
                        href='/'
                        className='text-lg font-bold text-white bg-primary hover:bg-secondary px-5 py-2 h-10 rounded-full'
                    > Go back home </Link>
                </div>
            </div>
        </main>
    )
}