"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { PostMeta } from "@/lib/posts";

/**
 * Carries the (build-time, filesystem-read) Writing post metadata into the
 * client desktop tree so the in-window Writing app can list posts without
 * touching `node:fs`. The metas are read on the server in `page.tsx` and
 * handed down as a prop. `import type` keeps the fs-backed module out of the
 * client bundle.
 */
const PostsContext = createContext<PostMeta[]>([]);

export function PostsProvider({
  posts,
  children,
}: {
  posts: PostMeta[];
  children: ReactNode;
}) {
  return <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>;
}

export function usePosts(): PostMeta[] {
  return useContext(PostsContext);
}
