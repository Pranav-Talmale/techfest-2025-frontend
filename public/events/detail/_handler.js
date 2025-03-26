export default function handler(req, res) {
  // Get the ID from the query parameters
  const { id } = req.query;
  
  if (!id) {
    // If no ID, redirect to events page
    res.redirect('/events');
    return;
  }
  
  try {
    // Serve the pre-generated HTML file
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(`${process.cwd()}/public/events/detail/${id}.html`);
  } catch (error) {
    // If file not found, fall back to index
    res.redirect(`/events/detail?id=${id}`);
  }
} 