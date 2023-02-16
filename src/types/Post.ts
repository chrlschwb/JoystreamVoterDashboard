import { ForumPostFragment } from "@/queries"

export interface ForumPost {
  createAt: string,
  text: string,
  auth: string
}

export const asFroumPost = (data: ForumPostFragment): ForumPost => ({
  createAt: data.node.createdAt,
  text: data.node.text,
  auth: data.node.author.handle
})