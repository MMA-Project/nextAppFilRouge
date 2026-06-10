"use client"

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-red-400">
          Erreur
        </p>
        <h1 className="font-heading mt-3 text-4xl font-bold tracking-wide text-[#F0E6D3]">
          Une erreur est survenue
        </h1>
        <p className="mt-3 text-[#7A8CA0]">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-sm bg-[#C89B3C] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#010A13] transition hover:bg-[#F0E6D3]"
        >
          Réessayer
        </button>
      </div>
    </div>
  )
}

export default ErrorPage
