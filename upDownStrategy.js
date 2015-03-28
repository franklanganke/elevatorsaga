{
    init: function(elevators, floors) {

        var max = floors.length - 1;
        
        elevators.forEach(function(e) {
            e["unloading"] = [false, false, false];
        });

        elevators.forEach(function(e) {
            e.on("passing_floor", function(floorNum, direction) {
                if(e.unloading[floorNum]) {                    
                    e.goToFloor(floorNum, true);
                } else if (e.loadFactor() < 0.6 && Math.random() < 0.5){
					e.goToFloor(floorNum, true);
				}
				console.log(e.loadFactor());
				console.log(e.destinationQueue);
            });
        });
        
        elevators.forEach(function(e) {
            e.on("floor_button_pressed", function(floorNum) {
                e.unloading[floorNum] = true;
                // console.log(e.unloading);
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
                e.unloading[floorNum] = false;
                // console.log(e.unloading);
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