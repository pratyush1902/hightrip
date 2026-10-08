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
    const sitemapHtmlRes = await checkUrl('http://localhost:3000/sitemap');
    console.log('--- VISUAL /sitemap PAGE RESULT ---');
    console.log('Status:', sitemapHtmlRes.status);
    console.log('Content-Type:', sitemapHtmlRes.contentType);
    console.log('Length:', sitemapHtmlRes.length);

    const robotsRes = await checkUrl('http://localhost:3000/robots.txt');
    console.log('\n--- ROBOTS.TXT RESULT ---');
    console.log('Status:', robotsRes.status);
    console.log('Content-Type:', robotsRes.contentType);

    const sitemapXmlRes = await checkUrl('http://localhost:3000/sitemap.xml');
    console.log('\n--- SITEMAP.XML RESULT ---');
    console.log('Status:', sitemapXmlRes.status);
    console.log('Content-Type:', sitemapXmlRes.contentType);
  } catch (err) {
    console.error('Error fetching endpoints:', err.message);
  }
}

run();
