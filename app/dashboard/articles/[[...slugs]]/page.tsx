import { notFound } from "next/navigation"

const mockArticlesData = [
  {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    genre: "Female",
    nationality: "American",
  },
  {
    id: "2",
    name: "Bob",
    email: "bob@example.com",
    genre: "Male",
    nationality: "Canadian",
  },
  {
    id: "3",
    name: "Charlie",
    email: "charlie@example.com",
    genre: "Male",
    nationality: "British",
  },
  {
    id: "4",
    name: "Diana",
    email: "diana@example.com",
    genre: "Female",
    nationality: "German",
  },
]

const ArticlePage = async ({
  params,
}: {
  params: Promise<{ slugs?: string[] }>
}) => {
  const { slugs } = await params

  let articles = mockArticlesData

  if (slugs?.length) {
    articles = articles.filter((a) =>
      slugs.every((slug) => Object.values(a).some((value) => value === slug))
    )
  }

  if (!articles.length) notFound()

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      {articles.map((article) => (
        <li key={article.id} className="shadow-md rounded-lg p-6 m-4">
          <h1 className="text-4xl font-bold">Article ID: {article.id}</h1>
          <h2 className="text-2xl mt-4">Article Name: {article.name}</h2>
          <p className="text-lg mt-2">Article Email: {article.email}</p>
          <p className="text-lg mt-2">Article Genre: {article.genre}</p>
          <p className="text-lg mt-2">
            Article Nationality: {article.nationality}
          </p>
        </li>
      ))}
    </div>
  )
}

export default ArticlePage
