const fs = require('fs');
const path = require('path');

const repoBase = '/daemonenpartyluder/';
const navPages = ['index.html', 'music.html', 'code.html', 'clubs.html'];

function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  navPages.forEach(page => {
    // Only replace href="page" and not full URLs or already-rooted links
    const regex = new RegExp(`href=["']${page}["']`, 'g');
    content = content.replace(regex, `href="${repoBase}${page}"`);
  });
  // Optionally fix asset/script/image src/href here!
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed: ${filePath}`);
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (f.endsWith('.html')) {
      fixLinksInFile(fullPath);
    }
  });
}

// Start from current directory (repo root)
walkDir(process.cwd());
console.log('All HTML navigation links updated!');
