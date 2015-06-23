'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.selectSection = selectSection;
var prompt = require('prompt');
var config = require(__dirname + '/config.json');

var sectionRegExps = [];
for (var i = 0; i < config.sections.length; i++) {
    sectionRegExps.push('^' + (i + 1).toString() + '$');
}

var sectionValidator = new RegExp(sectionRegExps.join('|'));

var properties = [{
    name: 'section',
    validator: sectionValidator,
    warning: 'Invalid section '
}];

function selectSection(resolve, reject) {
    prompt.start();

    console.log('Select a section:');
    config.sections.forEach(function (section, i) {
        console.log('' + (i + 1) + ') ' + section.sid + ' (' + section.description + ')');
    });

    prompt.get(properties, function (err, result) {
        if (err) reject(err);

        resolve(result.section - 1);
    });
}
//# sourceMappingURL=/home/quentin/dev/horse-test/user-input.js.map