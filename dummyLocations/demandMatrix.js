module.exports = {

DemandSetup : function(jsonContent) {
        "use strict";
        //this.init();
        var demandMatrix;
        var tempickUpDropId = [];
        
        var i = 0,
            j = 0,
            k = 0;
    
        tempickUpDropId.push("lat" + jsonContent.hubs[0].depot.lat + "lng" + jsonContent.hubs[0].depot.lng);
        
        for (i = 0; i < jsonContent.orders.length; i++) {
            tempickUpDropId.push("lat" + jsonContent.orders[i].drop.lat + "lng" + jsonContent.orders[i].drop.lng);
        }

 //       var pickUpDropId = tempickUpDropId.filter(function (elem, pos) {
 //           return tempickUpDropId.indexOf(elem) === pos;
 //       });

        var pickUpDropId = tempickUpDropId;
        
        function storeMatrix(locations) {
            var arr = [];
            var i;
            for (i = 0; i < locations; i++) {
                arr[i] = [];
            }
            return arr;
        }

        var demandMatrix = storeMatrix(pickUpDropId.length);

        
        for( i =0 ;i < pickUpDropId.length ; i++ ) {
            demandMatrix[0][i] = 0;
        }
        for (j = 1; j < pickUpDropId.length; j++) {
            for (k = 0; k < pickUpDropId.length; k++) {
                demandMatrix[j][k] = parseInt(jsonContent.orders[j-1].ordervolume);
            }
        }
        return demandMatrix;
    
                
}
    

};
