"use client"

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">
          Une erreur est survenue
        </h1>
        <p className="mt-4 text-lg text-zinc-700">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-md bg-zinc-950 px-4 py-2 text-white hover:bg-zinc-800"
        >
          Reessayer
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
