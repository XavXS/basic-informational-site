const http = require('http');
const fs = require('fs/promises');
const url = require('url');

http.createServer(async (request, result) => {
    const myUrl = url.parse(request.url, true);
    
    let filename;
    if(myUrl.pathname === '/') filename = './index.html';
    else filename = '.' + myUrl.pathname + '.html';

    try {
        const data = await fs.readFile(filename, { encoding: 'utf8' });
        result.writeHead(200, {'Content-Type': 'text/html'});
        result.write(data);
    }
    catch(error) {
        const data = await fs.readFile('./404.html', { encoding: 'utf8' });
        result.writeHead(404, {'Content-Type': 'text/html'});
        result.write(data);
    }
}).listen(8080);
