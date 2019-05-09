/*
 * routes.js - module to provide routing
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';
var
  configRoutes, encryptVal, decryptVal,
  crud        = require( './crud' ),
  chat        = require( './chat' ),
  util        = require( './util' ),
  fs          = require( 'fs'     ),
  makeMongoId = crud.makeMongoId;
// ------------- END MODULE SCOPE VARIABLES ---------------

encryptVal = function ( object_map ){
  var
    key_name, error;

  for ( key_name in object_map ){
    //if ( object_map.hasOwnProperty( key_name )){
    if ( Object.prototype.hasOwnProperty.call(object_map, key_name) ){
      if ( key_name == 'password' || key_name == 'token'){
        object_map[ key_name ] = util.encrypt( object_map[ key_name ] );
      }
    }
  }
};

decryptVal = function ( object_map ){
  var
    key_name, error;

  for ( key_name in object_map ){
    if ( object_map.hasOwnProperty( key_name )){
      if ( key_name == 'password' || key_name == 'token'){
        object_map[ key_name ] = util.decrypt( object_map[ key_name ] );
      }
    }
  }

  return object_map;
};

// ---------------- BEGIN PUBLIC METHODS ------------------
configRoutes = function ( app, server ) {
  app.get( '/', function ( request, response ) {
    response.redirect( '/authApp/spa.html' );
  });

  app.get( '/app', function ( request, response ) {
    response.redirect( '/labApp/index.html' );
  });

  app.all( '/:obj_type/*?', function ( request, response, next ) {
    response.contentType( 'json' );
    next();
  });

  app.post('/upload/:id', function(req, res) {

      req.pipe(req.busboy);
      req.busboy.on('file', function(fieldname, file, filename) {
          var fstream = fs.createWriteStream('./public/images/' + filename); 
          file.pipe(fstream);
          fstream.on('close', function () {
              //res.send('DONE!');
              crud.update(
                "user",
                { _id: makeMongoId( req.params.id ) },
                { avatar : 'images/' + filename },
                function ( result_map ) { 
                  res.send({
                    status : 1,
                    data : result_map
                  });
                }
              );
          });
      });
  });

  app.get( '/:obj_type/list', function ( request, response ) {
    delete request.query.__proto__;
    encryptVal( request.query );
    var query = request.query;
    crud.read(
      request.params.obj_type,
      query, {},
      function ( map_list ) { 
        var result_list = [];
        for (var i = map_list.length - 1; i >= 0; i--) {
          result_list[i] = decryptVal( map_list[i] );
        }

        response.send( result_list ); }
    );
  });

  app.post( '/:obj_type/create', function ( request, response ) {
    encryptVal( request.body );
    crud.construct(
      request.params.obj_type,
      request.body,
      function ( result_map ) {
        response.send( result_map ); }
    );
  });

  app.get( '/:obj_type/read/:id', function ( request, response ) {
    crud.read(
      request.params.obj_type,
      { _id: makeMongoId( request.params.id ) },
      {},
      function ( map_list ) {
        var 
        response_map = decryptVal( map_list[ 0 ] );
        response.send( response_map ); }
    );
  });

  app.post( '/:obj_type/update/:id', function ( request, response ) {
    encryptVal( request.body );
    crud.update(
      request.params.obj_type,
      { _id: makeMongoId( request.params.id ) },
      request.body,
      function ( result_map ) { 
        response.send( result_map ); }
    );
  });

  app.get( '/:obj_type/delete/:id', function ( request, response ) {
    crud.destroy(
      request.params.obj_type,
      { _id: makeMongoId( request.params.id ) },
      function ( result_map ) { response.send( result_map ); }
    );
  });

  chat.connect( server );
};

module.exports = { configRoutes : configRoutes };
// ----------------- END PUBLIC METHODS -------------------
