import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content", "blog")

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) return []
  
  const fileNames = fs.readdirSync(contentDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || "Sin título",
        date: data.date || "",
        excerpt: data.excerpt || "",
        content,
      }
    })

  // Ordenar de más reciente a más antiguo
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || "Sin título",
      date: data.date || "",
      excerpt: data.excerpt || "",
      content,
    }
  } catch (error) {
    return null
  }
}
