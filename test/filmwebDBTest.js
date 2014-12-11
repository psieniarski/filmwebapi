var vows           = require('vows');
var assert         = require('assert');
var XMLHttpRequest = require('xhr2');
var events         = require('events');
var filmwebDB      = require('filmwebDB');

function request() {
    var emitter = new events.EventEmitter(); 
    var obj     = { q: 'oko' };
    var fdb     = new filmwebDB(emitter);

    emitter.emit('request', 'search', obj, 1234567 );
    return fdb;
}


// Create a Test Suite
vows.describe('Interfejs niskopoziomowy').addBatch({
    'Emisja zdarzenia request przez emiter': {
        topic: function () {
            var fdb = request();

            // process.on('uncaughtException', function(err) {
            //     console.log('Caught exception: ' + err.stack);
            // });
        },

        'skutkuje emisja zdarzenia response': {
            topic: function(topic) {
                console.log(topic)
                emitter.on('response', this.callback);    
            }, 

            'ktorego parametr response jest obiektem': function(response, id) {
               assert.isObject(response); 
            },

            'ktorego parametr id jest liczba:': function(response, id) {
                console.log(response, id)
                assert.isNumber(id);
            }, 
            
            
        },

        // 'ktorego parametr response jest obiektem': function (response, id) {
        //     assert.isObject(response);
        // },

        // 'a parametr id jest liczba ': function(response, id) {
        //     assert.isNumber(id);
        // }  
    }
    
    }).addBatch({ 
        'Metoda _prepareMethods': {
            topic: function() {
                var emitter    = new events.EventEmitter(); 
                var fdb        = new filmwebDB(emitter);
                var obj        = { id: [1,2,3,4,5] };
                var methodName = 'getFilmInfoFull';

                return fdb._prepareMethods(methodName, obj);
            },

            'zwraca ciag znakow': function(topic) {
                assert.isString(topic);
            }
        }
    }).run(); // Run it