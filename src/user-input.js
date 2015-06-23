"use strict";
let prompt = require('prompt')
let config = require(__dirname + '/config.json')

let sectionRegExps = []
for (let i=0; i<config.sections.length; i++) {
    sectionRegExps.push('^'+(i+1).toString()+'$')
}

let sectionValidator = new RegExp(sectionRegExps.join('|'))

let properties = [
    {
        name: 'section',
        validator: sectionValidator,
        warning: 'Invalid section '
    }
]

export function selectSection (resolve, reject) {
    prompt.start()

    console.log('Select a section:')
    config.sections.forEach((section, i) => {
        console.log(`${ i+1 }) ${ section.sid } (${ section.description })`)
    })

    prompt.get(properties, (err, result) => {
        if (err) reject(err)

        resolve(result.section-1)
    })
}
