angular.
  module('lab-report').
  component('labReport', {
    templateUrl: 'lab-report/lab-report.template.html',
    controller: [ '$rootScope', '$scope', 'moment', 'DB', 'filterFilter', function LabReportController( $rootScope, $scope, moment, db, filterFilter ) {
      var ctrl = this;

      ctrl.search = {};

      var today = new Date(Date.now()).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0,10);

      ctrl.prestations = db.prestation.query();
      ctrl.methods = db.method.query();
      ctrl.search_1 = today;
      ctrl.search_2 = '';

      ctrl.generate = function(){
        var _content = [];
        db.order.query({updated_at:ctrl.search_1}).$promise.then( function( data ){
          ctrl.list = data;

          var number = ctrl.list.lenght;

          angular.forEach(ctrl.list, function(value, key) {
            logo = {
                image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACyCAYAAAAH4YA5AAAAbnpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjaVYzRDYAwCET/mcIRDoq0jKOmJm7g+GKtafoS4LjAUb2vk5ZGVtI1F3MzBOrqsoUo+BCABYwUmrvXp3nJ0LGTGGbkrUjzcXT8wWn2dxlv1NoDt1Ugfg8JNssAAAoGaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICBleGlmOlBpeGVsWERpbWVuc2lvbj0iMjAwIgogICBleGlmOlBpeGVsWURpbWVuc2lvbj0iMTc4IgogICB0aWZmOkltYWdlV2lkdGg9IjIwMCIKICAgdGlmZjpJbWFnZUhlaWdodD0iMTc4IgogICB0aWZmOk9yaWVudGF0aW9uPSIxIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAg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",
                width: 50,
                height: 50,
                alignment: 'center'
              };

              header_text = {
                text: [
                  'Institut pasteur de côte d\'ivoire\n',
                  'Platforme de Biologie Moléculaire\n',
                  'Tel : 22 44 91 00 / Fax : 22 48 53 05\n',
                  'Professeur KAKOU Solange\n',
                  'Fiche de rendu des resultats\n'
                ],
                style: 'header',
                alignment: 'center'
              };

            _content.push( logo );
            _content.push( header_text );

            //patient infor
            patient_text = {
                text: [
                  'NOM : ' + value.patient.first_name  +'\n',
                  'PRENOMS : ' + value.patient.last_name +'\n',
                  'AGE : '+ value.patient.age +'\n',
                  'SEXE : '+ value.patient.gender +'\n',
                  'PROVENANCE : '+ value.patient.provenance +'\n',
                  'MEDECIN DEMANDEUR : '+ value.patient.provenance +'\n' +'\n'+'\n',
                ]
              };

              _content.push( patient_text );
              resultat_header = {text: 'RESULTATS',  style: 'header',
                alignment: 'center'};
              _content.push( resultat_header );



            table_text = {
              style: 'tableExample',
              table: {
                widths: [100, '*', 200, '*'],
                body: [
                  ['Numero echantillon', 'Analyse', 'Méthodes', 'resultats']
                ]
              }
            };

            for (var i = 0; i < value.prestations.length; i++) {
              var info = [];

              
              console.log( value.prestations[i].analyse );

              info.push(value.prestations[i].sample_number);
              info.push( (filterFilter(ctrl.prestations, {_id:value.prestations[i].analyse}))[0].nom );
              info.push( (filterFilter(ctrl.methods, {_id:value.prestations[i].method}))[0].nom );
              info.push(value.prestations[i].result_data + '  (' + value.prestations[i].conclusion + ')');
              table_text.table.body.push(info);
            }

            _content.push( table_text );
            _content.push( {text: '\n'+'\n'+'Validation par contrôle positif ADN :'} );
            _content.push( {text: '\n'+'\n'+'CONCLUSION AU CAS OU LE RESULTAT EST POSITIF (ADN bactérien)'+'\n' +'\n', style: 'header'} );




            interpretation_text = { 
              ul: [
                'Très faible 31-35',
                'Faible 27-30',
                'Elevée 23-26',
                'Très elevée 15-22'+'\n' +'\n'+'\n'
              ]
            }

            date = { text : 'Date : ' +moment().format('LL') +'\n' +'\n'+'\n', style : 'header'}
            signature = { text : ['Signature du biologiste'+'\n' +'\n'+'\n'], style : 'header', alignment: 'right', pageBreak: 'after'}

            _content.push( interpretation_text );
            _content.push( date );
            _content.push( signature );

            number--;

          });


          html2canvas(document.querySelector("#exportthis")).then(canvas => {
              var data = canvas.toDataURL();
              var docDefinition = {
                  content: _content,
                  styles: {
                      header: {
                          bold: true,
                          fontSize: 15
                      }
                  },
                  defaultStyle: {
                      fontSize: 12,
                  }   
              };
              pdfMake.createPdf(docDefinition).download(ctrl.search_1  + " " +ctrl.search_2 + ".pdf");
          });

        });

        

      }

    }]
  });