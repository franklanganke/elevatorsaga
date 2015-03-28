{
    init: function(elevators, floors) {

        var max = floors.length - 1;
        
        elevators.forEach(function(e) {
            e["stop"] = [false, false, false];
        });

        elevators.forEach(function(e) {
            e.on("passing_floor", function(floorNum, direction) {
                if(e.stop[floorNum]) {                    
                    e.goToFloor(floorNum, true);
                }
            });
        });
        
        elevators.forEach(function(e) {
            e.on("floor_button_pressed", function(floorNum) {
                e.stop[floorNum] = true;
                // console.log(e.stop);
            });
        });
        
        elevators.forEach(function(e) {
            e.on("stopped_at_floor", function(floorNum) {
                if (floorNum == 0) {
                    e.goToFloor(max);
					e.goingDownIndicator(false);
					e.goingUpIndicator(true);
                }
                if (floorNum == max) {
                    e.goToFloor(0);
					e.goingDownIndicator(true);
					e.goingUpIndicator(false);					
                }
                e.stop[floorNum] = false;
                // console.log(e.stop);
            });
        });
        
        floors.forEach(function(f) {
            f.on("up_button_pressed", function() {
                // demand[f.floorNum()] = true;
            });

            f.on("down_button_pressed", function() {
                // demand[f.floorNum()] = true;
            });            
        });

        
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
    
    
}