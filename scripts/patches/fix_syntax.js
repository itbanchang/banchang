const fs = require('fs');

const files = ['dental.js', 'thaimedicine.js', 'physicaltherapy.js', 'ncd.js', 'er.js'];

files.forEach(f => {
    const p = 'server/routes/' + f;
    if (!fs.existsSync(p)) return;
    let text = fs.readFileSync(p, 'utf8');

    // Strip backslashes before backticks and dollar signs from earlier incorrect write_to_file calls
    text = text.replace(/\\`/g, '`');
    text = text.replace(/\\\$/g, '$');

    fs.writeFileSync(p, text);
});

console.log('Fixed syntax templates.');
