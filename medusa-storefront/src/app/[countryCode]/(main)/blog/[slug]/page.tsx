import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import Link from "next/link"

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return { title: "Artículo no encontrado" }
  return {
    title: `${post.title} | Michicosas Blog`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: { params: { slug: string, countryCode: string } }) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <Link href={`/${params.countryCode}/blog`} className="text-sm font-semibold text-blue-600 hover:text-blue-500 mb-8 inline-block">
        &larr; Volver al blog
      </Link>
      <article className="prose prose-slate prose-lg lg:prose-xl mx-auto">
        <header className="mb-10 pb-8 border-b border-gray-200">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">{post.title}</h1>
          <time dateTime={post.date} className="text-gray-500 text-base">
            Publicado el {new Date(post.date).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </header>
        <main className="mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4">
          <MDXRemote source={post.content} />
        </main>
      </article>
    </div>
  )
}
