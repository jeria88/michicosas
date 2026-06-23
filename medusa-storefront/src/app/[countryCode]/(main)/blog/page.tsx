import { getBlogPosts } from "@/lib/blog"
import Link from "next/link"

export const metadata = {
  title: "Blog Michicosas | Consejos y Curiosidades para Mascotas",
  description: "Descubre tips, cuidados y todo sobre el bienestar de tus michis y perritos.",
}

export default function BlogIndex({ params }: { params: { countryCode: string } }) {
  const posts = getBlogPosts()

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">
        El Blog de Michicosas 🐾
      </h1>
      <p className="text-lg text-gray-600 mb-12">
        Consejos, trucos y guías para consentir a los reyes de la casa.
      </p>
      
      <div className="grid gap-8 lg:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="flex flex-col items-start justify-between bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-x-4 text-xs">
              <time dateTime={post.date} className="text-gray-500">
                {new Date(post.date).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600">
                Mascotas
              </span>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-blue-600">
                <Link href={`/${params.countryCode}/blog/${post.slug}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {post.excerpt}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-x-4">
              <Link href={`/${params.countryCode}/blog/${post.slug}`} className="text-sm font-semibold leading-6 text-blue-600">
                Leer artículo completo &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
