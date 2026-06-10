import { notFound } from "next/navigation"

const mockUserData = [
  { id: "1", name: "Alice", email: "alice@example.com", genre: "Female" },
  { id: "2", name: "Bob", email: "bob@example.com", genre: "Male" },
  { id: "3", name: "Charlie", email: "charlie@example.com", genre: "Male" },
]

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = mockUserData.find((u) => u.id === id)
  if (!user) {
    notFound()
  }

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-4xl font-bold">User ID: {id}</h1>
      <h2 className="text-2xl mt-4">User Name: {user.name}</h2>
      <p className="text-lg mt-2">User Email: {user.email}</p>
      <p className="text-lg mt-2">User Genre: {user.genre}</p>
    </div>
  )
}

export default UserPage
