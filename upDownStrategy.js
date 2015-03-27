{
    init: function(elevators, floors) {

        var max = 5;
        
        elevators.forEach(function(e) {
            e["stop"] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        });

        elevators.forEach(function(e) {
            e.on("passing_floor", function(floorNum, direction) {
                if(e.stop[floorNum] > 0) {                    
                    e.goToFloor(floorNum, true);
                }
            });
        });
        
        elevators.forEach(function(e) {
            e.on("floor_button_pressed", function(floorNum) {
                e.stop[floorNum]++;
                console.log(e.stop);
            });
        });
        
        elevators.forEach(function(e) {
            e.on("stopped_at_floor", function(floorNum) {
                if (floorNum == 0) {
                    e.goToFloor(max);
                }
                if (floorNum == max) {
                    e.goToFloor(0);
                }
                e.stop[floorNum] = 0;
                console.log(e.stop);
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