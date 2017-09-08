
module.exports = {

    DistSetup  : function(jsonContent) {
        "use strict";
        
        
        var tempickUpDropId = [];
        
        var i = 0,
            j = 0,
            k = 0;
    
        tempickUpDropId.push("lat" + jsonContent.hubs[0].depot.lat + "lng" + jsonContent.hubs[0].depot.lng);
        
        for (i = 0; i < jsonContent.orders.length; i++) {
            tempickUpDropId.push("lat" + jsonContent.orders[i].drop.lat + "lng" + jsonContent.orders[i].drop.lng);
        }


        var pickUpDropId = tempickUpDropId;
        
        function storeMatrix(locations) {
            var arr = [];
            var i;
            for (i = 0; i < locations; i++) {
                arr[i] = [];
            }
            return arr;
        }

        var distanceMatrix = storeMatrix(pickUpDropId.length);

        
        
        for (j = 0; j < pickUpDropId.length; j++) {
            for (k = 0; k < pickUpDropId.length; k++) {
                distanceMatrix[j][k] = parseInt(jsonContent.matrix[pickUpDropId[j]][pickUpDropId[k]].d);

            }
        }
        // console.log(distanceMatrix);
        
        return distanceMatrix;
    
  }
}
