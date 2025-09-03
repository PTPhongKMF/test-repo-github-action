import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Change this path to your JSON file location
const filePath = resolve(__dirname, '.github/release-please-config.json');

try {
  // Read JSON file
  const fileContent = await readFile(filePath, 'utf-8');
  const data = JSON.parse(fileContent);

  // Get the value
  const value = data?.packages?.["."]?.["pull-request-header"];

  if (value) {
    console.log(`📌 pull-request-header: "${value}"`);
  } else {
    console.log("⚠️  pull-request-header not found in packages[\".\"]");
  }
} catch (err) {
  console.error("❌ Error reading JSON file:", err);
}
