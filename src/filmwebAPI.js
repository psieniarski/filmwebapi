var emitter    = require( 'emitter-mixin' );
var uuid       = require( './uuid.js' );


var FilmwebAPI = function() {
  var that    = this;
  var callbacks = {};

  this.on( 'response', function( response, id ) {
    var callback = callbacks[id];
    callback( response );
    delete callbacks[id];
  }); 

  this._request = function( type, obj, callback ) {
    var id = uuid();

    callbacks[id] = callback;
    that.emit( 'request', type, obj, id );
  };

  this.movies = {
    list: function( obj ) {
      return {
        execute: function( callback ) {
          that._request( 'search', obj, function( response ) {
            var ids   = [];
            var items = response.items;

            for ( var i = 0; i < items.length; i++ ) {
              ids.push( items[i].id );
            };

            that._request( 'data', { id: ids }, function( data ) {
              callback( data );
            });
          });
        }
      };
    },
  };
};

emitter( FilmwebAPI.prototype );

module.exports = FilmwebAPI; 
