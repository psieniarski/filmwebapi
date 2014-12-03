var vows           = require('vows');
var assert         = require('assert');
var XMLHttpRequest = require('xhr2');
var filmwebDB      = require('filmwebDB');


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
        topic: function() {
            filmwebDB.ajax('unsupported', {}, this.callback);
        },

        'zglasza blad dla niebslugiwanego typu' : function(err, response) {
            assert.isNotNull(err);
        }
    }

}).run(); // Run it