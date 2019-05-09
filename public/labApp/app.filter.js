angular.module('spa')
.filter( 'byCriteria', function () {

  return function ( items, filter_obj ) {
    var 
      filtered = [];
    
    if( filter_obj == undefined || filter_obj == null ){
      filtered = items;
    }
    else{
      angular.forEach( filter_obj, function( obj, key ){

        var _filter = filter_obj[ key ];
        
        angular.forEach( items, function( item, item_key ){

          if ( item[ key ]._id == _filter._id ) {
            filtered.push( item );
          }

        });

      });
    }

    return filtered;
  };
})
.filter( 'groupCount', function () {

  return function ( items, obj_name, filter_obj ) {
    var 
      filtered = [];

    
    if( filter_obj == undefined || filter_obj == null ){
      filtered = items;
    }
    else{
      var _filter = filter_obj;
      
      angular.forEach( items, function( item, item_key ){
        
        if(item[obj_name] == undefined ){
          return false;
        }

        if ( item[ obj_name ]._id == _filter._id ) {
          filtered.push( item );
        }

      });
    }

    return filtered.length;
  };
});