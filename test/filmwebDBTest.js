var vows      = require('vows'),
    assert    = require('assert'),

    filmwebDB = require('../src/filmwebDB.js');


// Create a Test Suite
vows.describe('Interfejs niskopoziomowy').addBatch({
    'kiedy wyszukamy fraze oko': {
        topic: function () { 
            var obj = { q: 'oko' }; 
            // filmwebDB.search(obj, this.callback);
            var that = this;
            
            filmwebDB.search(obj,function(response, err){
                that.callback(err, response);
            });

            // process.on('uncaughtException', function(err) {
            //     console.log('Caught exception: ' + err.stack);
            // });
        },

        'Tekst odpowiedzi bedzie ciagiem znakow': function (err, response) {
            console.log(response);
            //assert.isString(response.responseText);
            assert.isString(response);
        }
    },
    'but when dividing zero by zero': {
        topic: function () { return 0 / 0 },

        'we get a value which': {
            'is not a number': function (topic) {
                assert.isNaN (topic);
            },
            'is not equal to itself': function (topic) {
                assert.notEqual (topic, topic);
            }
        }
    }
}).run(); // Run it