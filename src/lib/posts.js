import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { replaceSnippetPlaceholders } from "./snippets";

const postsDirectory = path.join(process.cwd(), "content/posts");

function parsePublishDate(value) {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    return null;
  }

  return timestamp;
}

function isPublished(dateValue, referenceTime = Date.now()) {
  const timestamp = parsePublishDate(dateValue);

  if (timestamp === null) {
    return true;
  }

  return timestamp <= referenceTime;
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const now = Date.now();

  const allPostsData = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      const processedContent = replaceSnippetPlaceholders(matterResult.content);

      const time = readingTime(processedContent);
      const publishDate = matterResult.data.date
        ? new Date(matterResult.data.date)
        : null;

      return {
        slug,
        ...matterResult.data,
        readingTime: time.text,
        date: publishDate ? publishDate.toISOString() : null,
        publishTimestamp: publishDate ? publishDate.getTime() : null,
      };
    })
    .filter((post) => isPublished(post.publishTimestamp ?? null, now))
    .sort((a, b) => {
      const aTime = a.publishTimestamp ?? 0;
      const bTime = b.publishTimestamp ?? 0;

      if (aTime === bTime) {
        return 0;
      }

      return bTime - aTime;
    })
    .map(({ publishTimestamp, ...post }) => {
      void publishTimestamp;
      return post;
    });

  return allPostsData;
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = replaceSnippetPlaceholders(matterResult.content);
  const time = readingTime(processedContent);

  return {
    slug,
    ...matterResult.data,
    readingTime: time.text,
    content: processedContent,
  };
}
