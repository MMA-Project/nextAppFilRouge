"use client"

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">An error occurred</h1>
        <p className="mt-4 text-lg text-gray-700">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
