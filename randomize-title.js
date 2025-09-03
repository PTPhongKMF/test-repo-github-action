import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Change this path to your JSON file location
const filePath = resolve(__dirname, '.github/release-please-config.json');

// Step 1: Create array
const titles = ["title 1", "title 2", "title 3", "title 4", "title 5"];

// Step 2: Pick random title
const randomTitle = titles[Math.floor(Math.random() * titles.length)];

try {
  // Step 3: Read JSON file
  const fileContent = await readFile(filePath, 'utf-8');
  const data = JSON.parse(fileContent);

  // Step 4: Modify JSON (ensure structure exists)
  if (!data.packages) data.packages = {};
  if (!data.packages["."]) data.packages["."] = {};
  data.packages["."]["pull-request-header"] = randomTitle;

  // Step 5: Write back to file
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Updated pull-request-header with "${randomTitle}"`);
} catch (err) {
  console.error("❌ Error:", err);
}
