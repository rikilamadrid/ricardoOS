import { Desktop } from "@/components/os/Desktop";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  // Post metadata is read from the filesystem here (server) and handed to the
  // client desktop so the Writing app can list posts without bundling node:fs.
  return <Desktop posts={getAllPosts()} />;
}
