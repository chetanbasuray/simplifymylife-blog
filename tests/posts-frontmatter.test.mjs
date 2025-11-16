import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content', 'posts');

const markdownFiles = readdirSync(postsDir).filter((file) => file.endsWith('.md'));

markdownFiles.forEach((file) => {
  test(`frontmatter fields exist for ${file}`, () => {
    const filePath = path.join(postsDir, file);
    const content = readFileSync(filePath, 'utf8');
    const { data } = matter(content);

    assert.equal(typeof data.title, 'string', `title missing in ${file}`);
    assert.ok(data.title.trim().length > 0, `title empty in ${file}`);

    assert.equal(typeof data.date, 'string', `date missing in ${file}`);
    assert.ok(data.date.trim().length > 0, `date empty in ${file}`);
  });
});
