const SettingsDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div>LAYOUT DASHBOARD</div>
      <div className="w-full rounded-lg p-8 shadow-lg">{children}</div>
    </div>
  )
}

export default SettingsDashboard
