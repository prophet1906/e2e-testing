const path = require('path');
const fs = require('fs');
const async = require('async');
const newman = require('newman');

const testDir = path.join(__dirname, "__tests__");
const reportDir = path.join(__dirname, "public", "reports");
const environmentPath = path.join(__dirname, "env.json");

function runTests() {
    fs.readdir(testDir, (err, testCollections) => {
        async.eachSeries(testCollections, (testCollection, next) => {
            const scenarioId = testCollection.split('.')[0];
            const collectionPath = path.join(testDir, testCollection);
            const reportPath = path.join(reportDir, testCollection).replace('json', 'html');
            newman.run({
                collection: collectionPath,
                environment: environmentPath,
                reporters: ['cli', 'htmlextra'],
                reporter: {
                    htmlextra: {
                        export: reportPath,
                        browserTitle: scenarioId,
                        title: scenarioId
                    }
                }
            }).on('start', (err, args) => {
                console.log(`Running collection ${testCollection}.`);
            }).on('done', (err, summary) => {
                if (err || summary.error) {
                    console.error('Collection run encountered error.');
                } else {
                    console.log(`Collection ${testCollection} ran successfully!`)
                }
                next(err, summary);
            })
        }, (err, results) => {
            if (err) console.error(err);
            console.log(results);
        });
    });
}

runTests();