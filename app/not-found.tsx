const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-zinc-950">
          Champion introuvable
        </h1>
        <p className="mt-3 text-zinc-600">
          La page demandee n&apos;existe pas dans League Tracker.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
