"use strict";

let Horseman      = require('node-horseman')
let fs            = require('fs')
let config        = require(__dirname + '/config.json')
let selectSection = require(__dirname + '/user-input').selectSection

selectSection(sectionIndex => {
    let horseman = new Horseman()

    let html = horseman
        .open('https://webaccess.psu.edu/?cosign-elionnx.ais.psu.edu&https://elionnx.ais.psu.edu/eLionStudent/secure/elionHome.seam')
        .waitForNextPage()
        .type('input[name="login"]', config.username)
        .type('input[name="password"]', config.password)
        // .screenshot('login.png')
        .click('input[value="Log In"]')
        .waitForNextPage()
        // .screenshot('loggedin.png')
        .open('https://elionvw.ais.psu.edu/cgi-bin/elion-student.exe/submit/goRegistration')
        .waitForNextPage()
        .click(`label:contains("${ config.semester }")`)
        .click('input[value="Continue"]')
        .waitForNextPage()
        .type('input[type="password"]', config.password)
        .click('input[type="SUBMIT"]')
        .wait(7*1000)
        .type('input[type="TEXT"]', config.sections[sectionIndex])
        .click('input[value="Add course to schedule"]')
        .waitForNextPage()
        .html()

    horseman.close()

    fs.writeFile(__dirname + '/output/result.html', html, err => {
        if (err) console.log(err)

        console.log('Saved output/result.html')
    })

    console.log('Auto-watchlist complete.')
}, err => {
    console.log(err)
})
