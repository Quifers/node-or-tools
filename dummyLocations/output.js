module.exports = {

	init : function() {
			this.totalOverallDistance = 0;
 			this.totalOverallTime = 0;
	},
 	
	BikeRouteMapping : function(solution,vehicleCapacityArray,jsonContent,distanceMatrix,durationMatrix,serviceTimes) { 

				"use strict";
				var orders = jsonContent.orders;
				var aceResult = [];
				var aces = []; 
				var aceRoutesArray = [];
				var aceTimesArray = [];
				var flag = false;
				for( var i = 0 ; i < vehicleCapacityArray.length ; i++) {
					
					if(vehicleCapacityArray[i] === 100) {
						aceRoutesArray.push(solution.routes[i]);
						aceTimesArray.push(solution.times[i]);
						var Id = jsonContent.drivers[i].driverid;
						aces.push(Id);
					}
					if(solution.routes[i].length>0) {
						flag = true;
					}
				}

				if(flag) {

				for(var i =0 ;i < aceRoutesArray.length ; i++) {


					var aceOrders = [];
					var aceId = aces[i];
					var totalDistanceTrav = null;
					var totalVolume = null;

					var aceOrders =null;
					var distTravYet = null;
					var timeElapsYet = null;
					if(aceRoutesArray[i].length > 0) {
						aceOrders = [];

					}
					var j, lunchflag =0 ;
					if(aceRoutesArray[i].length > 0)
					distTravYet +=   distanceMatrix[0][aceRoutesArray[i][0]];
					if(aceRoutesArray[i].length > 0)
					timeElapsYet +=  durationMatrix[0][aceRoutesArray[i][0]];
					var idx =0;
					for( j = 0 ;j < aceRoutesArray[i].length ; j++) {
							
						
							var orderID = aceRoutesArray[i][j];
							
							
							
							var orderVol = jsonContent.orders[orderID-1].ordervolume;
							
							
							orderID = jsonContent.orders[orderID-1].orderid;
	                        orderID = orderID.toString();
							aceOrders[idx] = [];
							aceOrders[idx].push(orderID);
							aceOrders[idx].push(timeElapsYet);
							aceOrders[idx].push(distTravYet);
							aceOrders[idx].push(orderVol);
							totalVolume += orderVol;
							if(aceRoutesArray[i].length === 0) {
								aceOrders[idx] = null;
							}

							if(j< aceRoutesArray[i].length-1) {
								//dist travelled;
								var orderID2 = aceRoutesArray[i][j+1]; 
								// console.log(orderID2);
								var keyfrom = "lat" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lat + "lng" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lng;
								var keyto = "lat" + jsonContent.orders[orderID2-1].drop.lat + "lng" + jsonContent.orders[orderID2-1].drop.lng;
	                            distTravYet +=   jsonContent.matrix[keyfrom][keyto].d;
	                        
	                            // time elapsed    
	                            var serviceTime;
	                            if(jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume <= 3)
	                            	serviceTime = 15;
	                            	else if(jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume >3 && jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume <= 20)
	                            		serviceTime = 15;
	                            		else if(jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume >5 && jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume <= 20)
	                            			serviceTime = 25;
	                            			else
	                            				serviceTime = 35;

	                            var orderID2 = aceRoutesArray[i][j+1] ; 
								var keyfrom = "lat" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lat + "lng" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lng;
								var keyto = "lat" + jsonContent.orders[orderID2-1].drop.lat + "lng" + jsonContent.orders[orderID2-1].drop.lng;
	                            timeElapsYet +=   jsonContent.matrix[keyfrom][keyto].t + serviceTime;//s[aceRoutesArray[i][j]];// + aceTimesArray[i][j][0])/120;
                            }
                            if(timeElapsYet > 4*60  && lunchflag===0) {
                            		idx++;
                            		orderID = "LUNCHTIME";
                            		orderVol = 0;
                            		aceOrders[idx] = [];
                            		aceOrders[idx].push(orderID);
                            		aceOrders[idx].push(timeElapsYet+30);
                            		aceOrders[idx].push(distTravYet);
                            		aceOrders[idx].push(orderVol);
                            		lunchflag =1;
                            }

                            

							idx++;

					}
					this.totalOverallDistance += distTravYet;
                            this.stotalOverallTime += timeElapsYet;

					if(aceRoutesArray[i].length > 0) {
						
							distTravYet += distanceMatrix[aceRoutesArray[i][j-1]][0];
							timeElapsYet += durationMatrix[aceRoutesArray[i][j-1]][0];
					}

					aceResult[i] = [];
					aceResult[i].push(aceId);
					aceResult[i].push(aceOrders);
					if(distTravYet)aceResult[i].push([distTravYet]);
					else aceResult[i].push(distTravYet);
					if(totalVolume)aceResult[i].push([totalVolume]);
					else aceResult[i].push(totalVolume);
				}
				return aceResult;
			}
				else return null;
	},
				
	
	TataRouteMapping : function(solution,vehicleCapacityArray,jsonContent,distanceMatrix,durationMatrix,serviceTimes) {

				"use strict";
				var orders = jsonContent.orders;
				var aceResult = [];
				var aces = []; 
				var aceRoutesArray = [];
				var aceTimesArray = [];
				var flag = false;
				for( var i = 0 ; i < vehicleCapacityArray.length ; i++) {
					
					if(vehicleCapacityArray[i] === 2400) {
						aceRoutesArray.push(solution.routes[i]);
						aceTimesArray.push(solution.times[i]);
						var Id = jsonContent.drivers[i].driverid;
						aces.push(Id);
					}
					if(solution.routes[i].length>0) {
						flag = true;
					}
				}

				if(flag) {

				for(var i =0 ;i < aceRoutesArray.length ; i++) {


					var aceOrders = [];
					var aceId = aces[i];
					var totalDistanceTrav = null;
					var totalVolume = null;

					var aceOrders =null;
					var distTravYet = null;
					var timeElapsYet = null;
					if(aceRoutesArray[i].length > 0) {
						aceOrders = [];

					}
					var j, lunchflag =0 ;
					if(aceRoutesArray[i].length > 0)
					distTravYet +=   distanceMatrix[0][aceRoutesArray[i][0]];
					if(aceRoutesArray[i].length > 0)
					timeElapsYet +=  durationMatrix[0][aceRoutesArray[i][0]];
					var idx =0;
					for( j = 0 ;j < aceRoutesArray[i].length ; j++) {
							
						
							var orderID = aceRoutesArray[i][j];
							
							
							
							var orderVol = jsonContent.orders[orderID-1].ordervolume;
							
							
							orderID = jsonContent.orders[orderID-1].orderid;
	                        orderID = orderID.toString();
							aceOrders[idx] = [];
							aceOrders[idx].push(orderID);
							aceOrders[idx].push(timeElapsYet);
							aceOrders[idx].push(distTravYet);
							aceOrders[idx].push(orderVol);
							totalVolume += orderVol;
							if(aceRoutesArray[i].length === 0) {
								aceOrders[idx] = null;
							}

							if(j< aceRoutesArray[i].length-1) {
								//dist travelled;
								var orderID2 = aceRoutesArray[i][j+1]; 
								// console.log(orderID2);
								var keyfrom = "lat" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lat + "lng" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lng;
								var keyto = "lat" + jsonContent.orders[orderID2-1].drop.lat + "lng" + jsonContent.orders[orderID2-1].drop.lng;
	                            distTravYet +=   jsonContent.matrix[keyfrom][keyto].d;
	                        
	                            // time elapsed    
	                            var serviceTime;
	                            if(jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume <= 3)
	                            	serviceTime = 15;
	                            	else if(jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume >3 && jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume <= 20)
	                            		serviceTime = 15;
	                            		else if(jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume >5 && jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume <= 20)
	                            			serviceTime = 25;
	                            			else
	                            				serviceTime = 35;

	                            var orderID2 = aceRoutesArray[i][j+1] ; 
								var keyfrom = "lat" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lat + "lng" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lng;
								var keyto = "lat" + jsonContent.orders[orderID2-1].drop.lat + "lng" + jsonContent.orders[orderID2-1].drop.lng;
	                            timeElapsYet +=   jsonContent.matrix[keyfrom][keyto].t + serviceTime;//s[aceRoutesArray[i][j]];// + aceTimesArray[i][j][0])/120;
                            }
                            if(timeElapsYet > 4*60  && lunchflag===0) {
                            		idx++;
                            		orderID = "LUNCHTIME";
                            		orderVol = 0;
                            		aceOrders[idx] = [];
                            		aceOrders[idx].push(orderID);
                            		aceOrders[idx].push(timeElapsYet+30);
                            		aceOrders[idx].push(distTravYet);
                            		aceOrders[idx].push(orderVol);
                            		lunchflag =1;
                            }

                            

							idx++;

					}
					this.totalOverallDistance += distTravYet;
                            this.totalOverallTime += timeElapsYet;

					if(aceRoutesArray[i].length > 0) {
						
							distTravYet += distanceMatrix[aceRoutesArray[i][j-1]][0];
							timeElapsYet += durationMatrix[aceRoutesArray[i][j-1]][0];
					}

					aceResult[i] = [];
					aceResult[i].push(aceId);
					aceResult[i].push(aceOrders);
					if(distTravYet)aceResult[i].push([distTravYet]);
					else aceResult[i].push(distTravYet);
					if(totalVolume)aceResult[i].push([totalVolume]);
					else aceResult[i].push(totalVolume);
				}
				return aceResult;
			}
				else return null;
	},
	
	AceRouteMapping : function(solution,vehicleCapacityArray,jsonContent,distanceMatrix,durationMatrix,serviceTimes) {
				"use strict";
				var orders = jsonContent.orders;
				var aceResult = [];
				var aces = []; 
				var aceRoutesArray = [];
				var aceTimesArray = [];
				var flag = false;
				for( var i = 0 ; i < vehicleCapacityArray.length ; i++) {
					
					if(vehicleCapacityArray[i] === 800) {
						aceRoutesArray.push(solution.routes[i]);
						aceTimesArray.push(solution.times[i]);
						var Id = jsonContent.drivers[i].driverid;
						aces.push(Id);
					}
					if(solution.routes[i].length>0) {
						flag = true;
					}
				}

				if(flag) {

				for(var i =0 ;i < aceRoutesArray.length ; i++) {


					var aceOrders = [];
					var aceId = aces[i];
					var totalDistanceTrav = null;
					var totalVolume = null;

					var aceOrders =null;
					var distTravYet = null;
					var timeElapsYet = null;
					if(aceRoutesArray[i].length > 0) {
						aceOrders = [];

					}
					var j, lunchflag =0 ;
					if(aceRoutesArray[i].length > 0)
					distTravYet +=   distanceMatrix[0][aceRoutesArray[i][0]];
					if(aceRoutesArray[i].length > 0)
					timeElapsYet +=  durationMatrix[0][aceRoutesArray[i][0]];
					var idx =0;
					for( j = 0 ;j < aceRoutesArray[i].length ; j++) {
							
						
							var orderID = aceRoutesArray[i][j];
							
							
							
							var orderVol = jsonContent.orders[orderID-1].ordervolume;
							
							
							orderID = jsonContent.orders[orderID-1].orderid;
	                        orderID = orderID.toString();
							aceOrders[idx] = [];
							aceOrders[idx].push(orderID);
							aceOrders[idx].push(timeElapsYet);
							aceOrders[idx].push(distTravYet);
							aceOrders[idx].push(orderVol);
							totalVolume += orderVol;
							if(aceRoutesArray[i].length === 0) {
								aceOrders[idx] = null;
							}

							if(j< aceRoutesArray[i].length-1) {
								//dist travelled;
								var orderID2 = aceRoutesArray[i][j+1]; 
								// console.log(orderID2);
								var keyfrom = "lat" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lat + "lng" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lng;
								var keyto = "lat" + jsonContent.orders[orderID2-1].drop.lat + "lng" + jsonContent.orders[orderID2-1].drop.lng;
	                            distTravYet +=   jsonContent.matrix[keyfrom][keyto].d;
	                        
	                            // time elapsed    
	                            var serviceTime;
	                            if(jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume <= 3)
	                            	serviceTime = 15;
	                            	else if(jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume >3 && jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume <= 20)
	                            		serviceTime = 15;
	                            		else if(jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume >5 && jsonContent.orders[aceRoutesArray[i][j]-1].ordervolume <= 20)
	                            			serviceTime = 25;
	                            			else
	                            				serviceTime = 35;

	                            var orderID2 = aceRoutesArray[i][j+1] ; 
								var keyfrom = "lat" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lat + "lng" + jsonContent.orders[aceRoutesArray[i][j]-1].drop.lng;
								var keyto = "lat" + jsonContent.orders[orderID2-1].drop.lat + "lng" + jsonContent.orders[orderID2-1].drop.lng;
	                            timeElapsYet +=   jsonContent.matrix[keyfrom][keyto].t + serviceTime;//s[aceRoutesArray[i][j]];// + aceTimesArray[i][j][0])/120;
                            }
                            if(timeElapsYet > 4*60 && lunchflag===0) {
                            		idx++;
                            		orderID = "LUNCHTIME";
                            		orderVol = 0;
                            		aceOrders[idx] = [];
                            		aceOrders[idx].push(orderID);
                            		aceOrders[idx].push(timeElapsYet+30);
                            		aceOrders[idx].push(distTravYet);
                            		aceOrders[idx].push(orderVol);
                            		lunchflag =1;
                            }

                            

							idx++;

					}
					this.totalOverallDistance += distTravYet;
                            this.totalOverallTime += timeElapsYet;


					if(aceRoutesArray[i].length > 0) {
						
							distTravYet += distanceMatrix[aceRoutesArray[i][j-1]][0];
							timeElapsYet += durationMatrix[aceRoutesArray[i][j-1]][0];
					}

					aceResult[i] = [];
					aceResult[i].push(aceId);
					aceResult[i].push(aceOrders);
					if(distTravYet)aceResult[i].push([distTravYet]);
					else aceResult[i].push(distTravYet);
					if(totalVolume)aceResult[i].push([totalVolume]);
					else aceResult[i].push(totalVolume);
				}

				return aceResult;
			}
				else return null;
	},
	output : function(solution,vehicleCapacityArray,jsonContent,distanceMatrix,durationMatrix,serviceTimes) {

			this.init();
			var result = {
                bike: this.BikeRouteMapping(solution,vehicleCapacityArray,jsonContent,distanceMatrix,durationMatrix,serviceTimes),
                t407: this.TataRouteMapping(solution,vehicleCapacityArray,jsonContent,distanceMatrix,durationMatrix,serviceTimes),
                ace: this.AceRouteMapping(solution,vehicleCapacityArray,jsonContent,distanceMatrix,durationMatrix,serviceTimes),
                message : {
                    status : false,
                    bike : {
                        shortage : 0,
                        MsgStatus : false
                    },
                    ace : {
                        shortage : 0,
                        MsgStatus : false
                    },
                    t407 : {
                        shortage : 0,
                        MsgStatus : false
                    }
                }
            }
            // var maxVehAtPin = require("./max_vehicles_at_pincode");
            // var PinResult = maxVehAtPin.execute(jsonContent,result);
            // console.log(PinResult);

            console.log("total distance covered : " + this.totalOverallDistance);
            console.log("total overall time taken :" + this.totalOverallTime);
            return result;
	}

}