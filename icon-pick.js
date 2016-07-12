
var fontCarrier = require('font-carrier')
var fs = require('fs')

var font = fontCarrier.transfer('./src/fontawesome-webfont.svg')

var originals = require('./src/fontawesome-list');

function toAscii(code) {
    return '&#' + unescape('%u' + code).charCodeAt(0) + ';';
}
var icons = originals.reduce(function(ret, cur) {
    var key = toAscii(cur[1]);
    ret[key] = cur[0];
    return ret;
}, {});
for(var key in icons) {
    var svg = font.getSvg(key);

    // fix viewBox
    svg = svg.replace(/(viewBox="0 0) \d+\s+\d+/, '$1 100 100');

    fs.writeFileSync('./dist/' + icons[key] +'.svg', svg)
}
console.log('%s icons generated in ./dist', originals.length);
