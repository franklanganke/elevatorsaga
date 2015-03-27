{
    init: function(elevators, floors) {

        var demand = [false, false, false, false, false, false];
        
        elevators.forEach(function(e) {
            e.on("idle", function() {
                e.goToFloor(demand.indexOf(true));
            });    
        });

        elevators.forEach(function(e) {
            e.on("passing_floor", function(floorNum, direction) {
                if(demand[floorNum] && e.loadFactor() < 0.6) {
                    e.goToFloor(floorNum, true);
                }
            });
        });
        
        elevators.forEach(function(e) {
            e.on("floor_button_pressed", function(floorNum) {
                e.goToFloor(floorNum);
            });
        });
        
        elevators.forEach(function(e) {
            e.on("stopped_at_floor", function(floorNum) {
                 demand[floorNum] = false;
                 console.log (demand);
                 
                console.log ("before " + e.destinationQueue);
                var index = e.destinationQueue.indexOf(floorNum);
                if (index > -1) {
                    e.destinationQueue.splice(index, 1);
                    e.checkDestinationQueue();
                }
                console.log ("after " + e.destinationQueue);

            });
        });
        
        floors.forEach(function(f) {
            f.on("up_button_pressed", function() {
                demand[f.floorNum()] = true;
            });

            f.on("down_button_pressed", function() {
                demand[f.floorNum()] = true;
            });            
        });

        
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
    
    
}