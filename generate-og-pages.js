import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directory if it doesn't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Load your events data
function loadEvents() {
  try {
    const eventsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/events.json'), 'utf8'));
    return eventsData.events;
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
}

// Generate HTML for an event
function generateEventHtml(event) {
  // Format the page title and description
  const pageTitle = `${event.title} | Technovate 2025`;
  let pageDescription = event.description;
  if (pageDescription.length > 160) {
    pageDescription = pageDescription.substring(0, 157) + '...';
  }
  
  const pageImage = event.image || 'https://www.raittechnovate.co.in/Poster-final.jpg';
  const eventUrl = `https://www.raittechnovate.co.in/events/detail?id=${event.id}`;
  
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/v-logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>${pageTitle}</title>
    <meta name="title" content="${pageTitle}">
    <meta name="description" content="${pageDescription}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="${eventUrl}">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageDescription}">
    <meta property="og:image" content="${pageImage}">
    <meta property="og:site_name" content="Technovate 2025">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="${eventUrl}">
    <meta name="twitter:title" content="${pageTitle}">
    <meta name="twitter:description" content="${pageDescription}">
    <meta name="twitter:image" content="${pageImage}">
    
    <!-- Redirect to the actual SPA route -->
    <meta http-equiv="refresh" content="0;url=/events/detail?id=${event.id}" />
  </head>
  <body>
    <p>Redirecting to <a href="/events/detail?id=${event.id}">${event.title}</a>...</p>
  </body>
</html>`;
}

// Main function to generate all event pages
function generateEventPages() {
  const events = loadEvents();
  if (!events.length) {
    console.error('No events found or error loading events');
    return;
  }
  
  // Create output directory for events
  const outputDir = path.join(__dirname, 'public/events/detail');
  ensureDirectoryExists(outputDir);
  
  // Generate an HTML file for each event
  events.forEach(event => {
    const html = generateEventHtml(event);
    const filePath = path.join(outputDir, `${event.id}.html`);
    fs.writeFileSync(filePath, html);
    console.log(`Generated: ${filePath}`);
  });
  
  console.log(`Successfully generated ${events.length} event pages for OG tags`);
}

// Run the generator
generateEventPages(); 