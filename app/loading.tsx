const loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-65px)] items-center justify-center">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#C89B3C]">
          Chargement
        </p>
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-[#C89B3C]"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-[#C89B3C]"
            style={{ animationDelay: "150ms" }}
          />
          <div
            className="h-2 w-2 animate-bounce rounded-full bg-[#C89B3C]"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  )
}

export default loading
