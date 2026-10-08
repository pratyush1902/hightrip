const http = require('http');

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, contentType: res.headers['content-type'], length: data.length, snippet: data.slice(0, 300) });
      });
    }).on('error', err => reject(err));
  });
}

async function run() {
  try {
    const robotsRes = await checkUrl('http://localhost:3000/robots.txt');
    console.log('--- ROBOTS.TXT RESULT ---');
    console.log('Status:', robotsRes.status);
    console.log('Content-Type:', robotsRes.contentType);
    console.log('Snippet:\n', robotsRes.snippet);

    const sitemapRes = await checkUrl('http://localhost:3000/sitemap.xml');
    console.log('\n--- SITEMAP.XML RESULT ---');
    console.log('Status:', sitemapRes.status);
    console.log('Content-Type:', sitemapRes.contentType);
    console.log('Snippet:\n', sitemapRes.snippet);
  } catch (err) {
    console.error('Error fetching SEO endpoints:', err.message);
  }
}

run();
