const fs = require('fs');
let content = fs.readFileSync('server/server.js', 'utf8');
content = content.replace(/\\\`/g, '`');
content = content.replace(/\\\$/g, '$');
const weirdQuotes = "`" + " " + "+" + " " + '"`"' + " " + "+" + " " + "`";
content = content.split(weirdQuotes).join('`');
fs.writeFileSync('server/server.js', content);
console.log('Fixed server.js!');
