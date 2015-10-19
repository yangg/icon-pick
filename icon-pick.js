
var fontCarrier = require('font-carrier')
var fs = require('fs')

var font = fontCarrier.transfer('./fontawesome-webfont.svg')

var originals = [
    ['f014', 'trash'],
    ['f055', 'pluscircle'],
    ['f093', 'upload'],
    ['f107', 'angledown'],
    ['f104', 'angleleft'],
    ['f105', 'angleright'],
    ['f106', 'angleup'],
]
function toAscii(code) {
    return '&#' + unescape('%u' + code).charCodeAt(0) + ';';
}
var icons = originals.reduce(function(ret, cur) {
    var key = toAscii(cur[0]);
    ret[key] = cur[1];
    return ret;
}, {})

for(var key in icons) {
    var svg = font.getSvg(key)

    fs.writeFileSync('./' + icons[key] +'.svg', svg)
}
console.log('Done!');
