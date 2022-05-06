
var readline = require('readline');
const fs = require('fs');
const path = '/home/baymax/Desktop/read.txt'
const file = fs.createWriteStream(path);

const path2 = '/home/baymax/Desktop/read2.txt'
const file2 = fs.createWriteStream(path2);
var input = [];


var rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});


rl.prompt();


rl.on('line', function (cmd) {


    input.push(cmd);
    file.write("\n" + cmd)
    let rev = cmd.split('').reverse().join('')
    file2.write("\n" + rev)
});


rl.on('close', function (cmd) {


    console.log(input.join('\n'));

    process.exit(0);

});
