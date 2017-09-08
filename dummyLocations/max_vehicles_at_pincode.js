module.exports = {
	
	execute : function(jsonContent,result) { 

		var maxVehicleAtAPincode = 0;
		var pincodes = {};
		for ( var i =0 ; i < jsonContent.orders.length ; i++) {
			pincodes[jsonContent.orders[i].pin] = {
				'count' : 0,
				'vehicles' : {}
			}
		}
		// var orderIds = {};
		// for(var i =0 ; i <jsonContent.orders.length ; i++) {
		// 	orderIds[jsonContent.orders[i].orderid] = jsonContent.orders[i];
		// 			console.log(jsonContent.orders[i].orderid);

		// }

		var orderDropKeys = {};
		for( var i =0 ; i < jsonContent.orders.length ; i++) {
			key = "lat" + jsonContent.orders[i].drop.lat + "lng" + jsonContent.orders[i].drop.lng; 
			orderDropKeys[key] = jsonContent.orders[i].pin;
			console.log("order keys :" + orderDropKeys[key]);
		}

		for( var i = 0 ; i < result["bike"].length ; i++) {
				result["bike"][i];
				var vehicleID = result["bike"][i][0];
				// console.log(vehicleID);
				// console.log(i);
				if(result["bike"][i][1]) {
					for( var j =0 ;  j <result["bike"][i][1].length /*ace orders length*/; j++) {

								var orderID = result["bike"][i][1][j][0];

								var OrderPinCode = orderDropKeys[orderID];

								if(!pincodes[OrderPinCode].vehicles[vehicleID]) {
									pincodes[OrderPinCode].vehicles[vehicleID] = 1;
									pincodes[OrderPinCode].count++;
								}
								if(maxVehicleAtAPincode < pincodes[OrderPinCode].count) {
									maxVehicleAtAPincode = pincodes[OrderPinCode].count;
								}
					}
				}
				
		}
		for( var i = 0 ; i < result["t407"].length ; i++) {
				result["t407"][i];
				var vehicleID = result["t407"][i][0];
				if(result["t407"][i][1]) {
					for( var j =0 ;  j <result["t407"][i][1].length /*ace orders length*/; j++) {

								var orderID = result["t407"][i][1][j][0];

								var OrderPinCode = orderDropKeys[orderID];

								if(!pincodes[OrderPinCode].vehicles[vehicleID]) {
									pincodes[OrderPinCode].vehicles[vehicleID] = 1;
									pincodes[OrderPinCode].count++;
								}
								if(maxVehicleAtAPincode < pincodes[OrderPinCode].count) {
									maxVehicleAtAPincode = pincodes[OrderPinCode].count;
								}
					}
				}
				
		}
		for( var i = 0 ; i < result["ace"].length ; i++) {
				result["ace"][i];
				var vehicleID = result["ace"][i][0];
				// console.log(i + "yo");


				var orderIds = {};
				for(var k =0 ; k <jsonContent.orders.length ; k++) {
					orderIds[jsonContent.orders[k].orderid] = jsonContent.orders[k];
							// console.log(jsonContent.orders[i].orderid);
				}

				if(result["ace"][i][1]) {
					for( var j =0 ;  j <result["ace"][i][1].length /*ace orders length*/; j++) {

								var orderID = result["ace"][i][1][j][0];
								// console.log(orderID + "haha");
								// var orderKey = "lat" + jsonContent.orders[] + "lng" + 
								var OrderPinCode = orderDropKeys[orderID];
								console.log(OrderPinCode);

								if(!pincodes[OrderPinCode].vehicles[vehicleID]) {
									pincodes[OrderPinCode].vehicles[vehicleID] = 1;
									pincodes[OrderPinCode].count++;
								}
								if(maxVehicleAtAPincode < pincodes[OrderPinCode].count) {
									maxVehicleAtAPincode = pincodes[OrderPinCode].count;
								}
					}
				}
				
		}

		return maxVehicleAtAPincode;

	}
	
}