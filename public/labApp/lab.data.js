angular.
  module('labApp').
  factory('DB', [ '$rootScope', '$http', '$q', '$resource',
    function( $rootScope, $http, $q, $resource ) {
      
      var customer = (function(){
        return $resource('/customer', {}, {
            query  : { method: 'GET', url: '/customer/list', isArray: true },
            create : { method: 'POST', url: '/customer/create' },
            get    : { method: 'GET', url: '/customer/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/customer/delete/:id', params : { id : 'id'}  },
            update : { method: 'POST', url: '/customer/update/:id', params : { id : 'id'}  }
       });
      })();

      var sample_type = (function(){
        return $resource('/sample_type', {}, {
            query  : { method: 'GET', url: '/sample_type/list', isArray: true },
            create : { method: 'POST', url: '/sample_type/create' },
            get    : { method: 'GET', url: '/sample_type/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/sample_type/delete/:id', params : { id : 'id'}  },
            update : { method: 'POST', url: '/sample_type/update/:id', params : { id : 'id'}  }
       });
      })();

      var order = (function(){
        return $resource('/order', {}, {
            query  : { method: 'GET', url: '/order/list', isArray: true },
            create : { method: 'POST', url: '/order/create' },
            get    : { method: 'GET', url: '/order/read/:id', params : { id : 'id'} },
            remove : { method: 'GET', url: '/order/delete/:id', params : { id : 'id'}  },
            update : { method: 'POST', url: '/order/update/:id', params : { id : 'id'}  }
       });
      })();

      var mois = (function(){
        return $resource('/mois', {}, {
            query  : { method: 'GET', url: '/mois/list', isArray: true },
            create : { method: 'POST', url: '/mois/create' },
            get    : { method: 'GET', url: '/mois/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/mois/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/mois/update/:id', params : { id : 'id'} }
       });
      })();

      var jour = (function(){
        return $resource('/jour', {}, {
            query  : { method: 'GET', url: '/jour/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/jour/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/jour/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/jour/update/:id', params : { id : 'id'} }
       });
      })();

      var annee = (function(){
        return $resource('/annee', {}, {
            query  : { method: 'GET', url: '/annee/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/annee/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/annee/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/annee/update/:id', params : { id : 'id'} }
       });
      })();

      var commune = (function(){
        return $resource('/commune', {}, {
            query  : { method: 'GET', url: '/commune/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/commune/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/commune/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/commune/update/:id', params : { id : 'id'} }
       });
      })();

      var ville = (function(){
        return $resource('/ville', {}, {
            query  : { method: 'GET', url: '/ville/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/ville/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/ville/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/ville/update/:id', params : { id : 'id'} }
       });
      })();

      var pays = (function(){
        return $resource('/pays', {}, {
            query  : { method: 'GET', url: '/pays/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/pays/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/pays/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/pays/update/:id', params : { id : 'id'} }
       });
      })();

      var type_piece = (function(){
        return $resource('/type_piece', {}, {
            query  : { method: 'GET', url: '/type_piece/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/type_piece/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/type_piece/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/type_piece/update/:id', params : { id : 'id'} }
       });
      })();

      var type_customer = (function(){
        return $resource('/type_customer', {}, {
            query  : { method: 'GET', url: '/type_customer/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/type_customer/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/type_customer/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/type_customer/update/:id', params : { id : 'id'} }
       });
      })();

      var societe = (function(){
        return $resource('/societe', {}, {
            query  : { method: 'GET', url: '/societe/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/societe/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/societe/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/societe/update/:id', params : { id : 'id'} }
       });
      })();

      var contrat = (function(){
        return $resource('/contrat', {}, {
            query  : { method: 'GET', url: '/contrat/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/contrat/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/contrat/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/contrat/update/:id', params : { id : 'id'} }
       });
      })();

      var medecin_service = (function(){
        return $resource('/medecin_service', {}, {
            query  : { method: 'GET', url: '/medecin_service/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/medecin_service/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/medecin_service/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/medecin_service/update/:id', params : { id : 'id'} }
       });
      })();
      
      var medecin_etablissement = (function(){
        return $resource('/medecin_etablissement', {}, {
            query  : { method: 'GET', url: '/medecin_etablissement/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/medecin_etablissement/read/:id' },
            remove : { method: 'DELETE', url: '/medecin_etablissement/delete/:id' },
            update : { method: 'PUT', url: '/medecin_etablissement/update/:id' }
       });
      })();

      var user = (function(){
        return $resource('/user', {}, {
            query  : { method: 'GET', url: '/user/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/user/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/user/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/user/update/:id', params : { id : 'id'} }
       });
      })();

      var mode_paiement = (function(){
        return $resource('/mode_paiement', {}, {
            query  : { method: 'GET', url: '/mode_paiement/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/mode_paiement/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/mode_paiement/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/mode_paiement/update/:id', params : { id : 'id'} }
       });
      })();

      var facture = (function(){
        return $resource('/facture', {}, {
            query  : { method: 'GET', url: '/facture/list', isArray: true },
            create : { method: 'POST', url: '/facture/create' },
            get    : { method: 'GET', url: '/facture/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/facture/delete/:id', params : { id : 'id'}  },
            update : { method: 'POST', url: '/facture/update/:id', params : { id : 'id'}  }
       });
      })();

      var prestation = (function(){
        return $resource('/prestation', {}, {
            query  : { method: 'GET', url: '/prestation/list', isArray: true },
            create : { method: 'POST', url: '/prestation/create' },
            get    : { method: 'GET', url: '/prestation/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/prestation/delete/:id', params : { id : 'id'} },
            update : { method: 'POST', url: '/prestation/update/:id', params : { id : 'id'} }
       });
      })();

      // new
      var method = (function(){
        return $resource('/method', {}, {
            query  : { method: 'GET', url: '/method/list', isArray: true },
            create : { method: 'POST', url: '/method/create' },
            get    : { method: 'GET', url: '/method/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/method/delete/:id', params : { id : 'id'} },
            update : { method: 'POST', url: '/method/update/:id', params : { id : 'id'} }
       });
      })();

      var counter = (function(){
        return $resource('/counter', {}, {
            query  : { method: 'GET', url: '/counter/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/counter/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/counter/delete/:id', params : { id : 'id'} },
            update : { method: 'PUT', url: '/counter/update/:id', params : { id : 'id'} }
       });
      })();

      var unite = (function(){
        return $resource('/unite', {}, {
            query  : { method: 'GET', url: '/unite/list', isArray: true },
            create : { method: 'POST' },
            get    : { method: 'GET', url: '/unite/read/:id', params : { id : 'id'} },
            remove : { method: 'DELETE', url: '/unite/delete/:id', params : { id : 'id'} },
            update : { method: 'POST', url: '/unite/update/:id', params : { id : 'id'} }
       });
      })();

      return {
        customer       : customer,
        sample_type    : sample_type,
        order          : order,
        facture        : facture,
        mois           : mois,
        jour           : jour,
        annee          : annee,
        user           : user,
        mode_paiement  : mode_paiement,
        unite          : unite,
        counter        : counter,
        prestation     : prestation,
        method         : method,
        etablissement  : medecin_etablissement,
        medecin_service: medecin_service,
        contrat        : contrat,
        societe        : societe,
        type_customer    : type_customer,
        type_piece     : type_piece,
        annee          : annee,
        pays           : pays,
        ville          : ville,
        commune        : commune
      };
    }
  ]);