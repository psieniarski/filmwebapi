var vows      = require('vows'),
    assert    = require('assert'),
    XMLHttpRequest = require('xhr2'),

    filmwebDB = require('../src/filmwebDB.js');


// Create a Test Suite
vows.describe('Interfejs niskopoziomowy').addBatch({
    'Asynchroniczna funkcja search': {
        topic: function () { 
            var obj = { q: 'oko' }; 
            var that = this;
            
            filmwebDB.search(obj, this.callback);

            // process.on('uncaughtException', function(err) {
            //     console.log('Caught exception: ' + err.stack);
            // });
        },

        'zwraca obiekt xhr': function (err, response) {
            assert.instanceOf(response, XMLHttpRequest);
        },

        'posiada metode responseText, ktora zwraca ciag znakow': function(err, response) {
            assert.isString(response.responseText);
        }
    },

    'Asynchroniczna funkcja getData': {
        topic: function () { 
            
            var obj = {   
                signature: '1.0,afc5f9ef12945c93e11789b43028698f',
                methods: 'getFilmInfoFull [10]\\ngetFilmInfoFull [8]\\ngetFilmInfoFull [7]\\ngetFilmInfoFull [6]\\ngetFilmInfoFull [5]\\ngetFilmInfoFull [4]\\ngetFilmInfoFull [3]\\ngetFilmInfoFull [2]\\ngetFilmInfoFull [1]\\n',
                appId: 'android',
                version: '1.0' 
            };
 
            var that = this;
            
            filmwebDB.getData(obj, this.callback);
        },

        'zwraca obiekt xhr': function (err, response) {
            assert.instanceOf(response, XMLHttpRequest);
        },

        'posiada metode responseText, ktora zwraca ciag znakow': function(err, response) {
            assert.isString(response.responseText);
        }
    },

    'Asynchroniczna funkcja ajax': {

    }

}).run(); // Run it