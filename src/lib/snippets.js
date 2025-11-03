import fs from "fs";
import path from "path";

const snippetsDir = path.join(process.cwd(), "content/snippets");
const snippetCache = new Map();

function resolveSnippetPath(name) {
  if (!name || typeof name !== "string") {
    return null;
  }

  const normalizedKey = name.trim().toLowerCase();
  if (!normalizedKey) {
    return null;
  }

  const safeKey = normalizedKey.replace(/[^a-z0-9/_-]/g, "");
  const candidatePath = path.join(snippetsDir, `${safeKey}.md`);
  const normalizedPath = path.normalize(candidatePath);

  if (!normalizedPath.startsWith(snippetsDir)) {
    return null;
  }

  return { key: normalizedKey, path: normalizedPath };
}

function loadSnippetContent(name) {
  const resolved = resolveSnippetPath(name);
  if (!resolved) {
    return null;
  }

  if (snippetCache.has(resolved.key)) {
    return snippetCache.get(resolved.key);
  }

  try {
    const content = fs.readFileSync(resolved.path, "utf8");
    const trimmed = content.trim();
    snippetCache.set(resolved.key, trimmed);
    return trimmed;
  } catch {
    return null;
  }
}

export function replaceSnippetPlaceholders(markdown) {
  if (!markdown || typeof markdown !== "string") {
    return markdown;
  }

  return markdown.replace(/\{\{\s*snippet:([a-z0-9/_-]+)\s*\}\}/gi, (match, rawName) => {
    const snippet = loadSnippetContent(rawName);
    return snippet ?? match;
  });
}
