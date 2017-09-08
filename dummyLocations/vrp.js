var tap = require('tap');
var ortools = require('..')


var execute = function (input){

  var solution1;

function manhattanDistance(lhs, rhs) {
  return Math.abs(lhs[0] - rhs[0]) + Math.abs(lhs[1] - rhs[1]);
}


var dayStarts = Hours(0);
var dayEnds = Hours(3);


var seed = 2147483650;

function ParkMillerRNG(seed) {
  var modulus = 2147483647;
  var multiplier = 48271;
  var increment = 0;
  var state = seed;

  return function() {
    state = (multiplier * state + increment) % modulus;
    return state / modulus;
  };
}

var rand = ParkMillerRNG(seed);


function Seconds(v) { return v; };
function Minutes(v) { return Seconds(v * 60); }
function Hours(v)   { return Minutes(v * 60); }





        var depot = 0;


        var fs = require("fs");
        var payload,final;

           
        var jsonContent = input;
        
            var distanceMatrix = new Array(jsonContent.orders.length + 1);
            var dMtrix = require("./distanceMatrix");
            distanceMatrix = dMtrix.DistSetup(jsonContent);
            

            var durationMatrix = new Array(jsonContent.orders.length +1);
            var tMtrix = require("./durationMatrix");
            var durationMatrix  = tMtrix.DurationSetup(jsonContent);
            
            
            var demand = require("./demandMatrix");
            var demandMatrix = demand.DemandSetup(jsonContent);
            
            
            var timeWindows = new Array(jsonContent.orders.length+1);

            for (var at = 0; at < jsonContent.orders.length+1; ++at) {
              
                timeWindows[at] = [dayStarts, dayEnds];
              
            }
            

  var solverOpts = {
    numNodes: jsonContent.orders.length+1,  
    costs: distanceMatrix,          
    durations: durationMatrix,   
    timeWindows: timeWindows,  
    demands: demandMatrix,
    // serviceTimes: serviceTimes      
  };

  var VRP = new ortools.VRP(solverOpts);

  var numVehicles = Number(jsonContent.drivers.length);
  var timeHorizon = dayEnds-dayStarts;


  

  var vehicleCapacity = new Array(numVehicles);
  for (var i = 0; i < numVehicles; ++i) {

    if(jsonContent.drivers[i].vehicletype === "ace")
    vehicleCapacity[i]=800;
    else if(jsonContent.drivers[i].vehicletype === "bike")
    vehicleCapacity[i]=100;
    else if(jsonContent.drivers[i].vehicletype === "t407")
    vehicleCapacity[i]=2400;

  }

 
  var routeLocks = new Array(numVehicles);

  for (var vehicle = 0; vehicle < numVehicles; ++vehicle) {
    if (vehicle === 0)
      routeLocks[vehicle] = [];             
    else
      routeLocks[vehicle] = [];                
  }

  var serviceTimes = new Array(jsonContent.orders.length+1);
  serviceTimes[0] = 0;

            for( var at = 1; at < jsonContent.orders.length+1 ; ++at) {
                if(jsonContent.orders[at-1].ordervolume <= 3)
                  serviceTimes[at] = 15;
                else if(jsonContent.orders[at-1].ordervolume >3 && jsonContent.orders[at-1].ordervolume <= 5)
                  serviceTimes[at] = 15;
                else if(jsonContent.orders[at-1].ordervolume >5 && jsonContent.orders[at-1].ordervolume <= 20)
                  serviceTimes[at] = 25;
                else serviceTimes[at] = 35;
            }



  var searchOpts = {
    computeTimeLimit: 1000000,       
    numVehicles: numVehicles,     
    depotNode: depot,             
    timeHorizon: timeHorizon,         
    vehicleCapacity: vehicleCapacity,
    serviceTimes: serviceTimes,   
    routeLocks: routeLocks,             
    pickups: [],                   
    deliveries: []                 
  };

  VRP.Solve(searchOpts, function (err, solution) {
    
    console.log(JSON.stringify(solution));
    if(err) {
      console.log('Error' + err.message);  
    }
    
    // fs.writeFileSync('final1June.json',JSON.stringify(solution));
    
    var out = require("./output");
    var final = out.output(solution,vehicleCapacity,jsonContent,distanceMatrix,durationMatrix,serviceTimes);
    
    console.log(JSON.stringify(final));
    
    solution1 = solution;

  });
    
    return solution1;
  }
 module.exports = {
   execute: execute
 }