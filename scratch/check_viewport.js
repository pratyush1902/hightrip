const http = require('http');

http.get('http://localhost:3000/', res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('Homepage status:', res.statusCode);
    console.log('Viewport tag in HTML:', html.toLowerCase().includes('viewport'));
    process.exit(0);
  });
});
