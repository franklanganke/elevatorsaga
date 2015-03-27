{
    init: function(elevators, floors) {

        var demand = [false, false, false, false, false];
        
        elevators.forEach(function(e) {
            e.on("idle", function() {
                e.goToFloor(demand.indexOf(true));
            });    
        });

        elevators.forEach(function(e) {
            e.on("passing_floor", function(floorNum, direction) {
                if(demand[floorNum] && e.loadFactor() < 0.4) {
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