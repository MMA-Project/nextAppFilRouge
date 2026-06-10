const NotFoundPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#C89B3C]">
          Erreur 404
        </p>
        <h1 className="font-heading mt-3 text-5xl font-bold tracking-wide text-[#F0E6D3]">
          Champion introuvable
        </h1>
        <p className="mt-3 text-[#7A8CA0]">
          Cette invocation n&apos;a renvoyé aucun champion dans Runeterra.
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
