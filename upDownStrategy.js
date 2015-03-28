{
    init: function(elevators, floors) {

        var max = floors.length - 1;
    
        // kickstart one to balance elevators going up and down at a time
        elevators[Math.floor(Math.random()*elevators.length)].goToFloor(max, true);
        
        var upDemand = [];
        var downDemand = []
        for (var i = 0; i < floors.length; i++) {
            upDemand[i] = false;
            downDemand[i] = false;
        }
                
        elevators.forEach(function(e) {
            // how do I dynamically init arrays?
            e["unloading"] = [false, false, false];
        });

        elevators.forEach(function(e) {
            e.on("passing_floor", function(floorNum, direction) {
            
                if(e.unloading[floorNum]) {                    
                    e.goToFloor(floorNum, true);
                    return;
                }
                
                if (e.loadFactor() > 0.2) {
                    return;
                }
                
                if ("up" === direction && upDemand[floorNum]) {
                    e.goToFloor(floorNum, true);
                } else if ("down" === direction && downDemand[floorNum]){
                    e.goToFloor(floorNum, true);
                }
            });
        });
        
        elevators.forEach(function(e) {
            e.on("floor_button_pressed", function(floorNum) {
                e.unloading[floorNum] = true;
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
                
                if(e.goingUpIndicator()) {
                    upDemand[floorNum] = false;
                } else {
                    downDemand[floorNum] = false;               
                }
            });
        });
        
        floors.forEach(function(f) {
            f.on("up_button_pressed", function() {
                upDemand[f.floorNum()] = true;
            });
            

            f.on("down_button_pressed", function() {
                downDemand[f.floorNum()] = true;
            });            
        });

        
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
    
    
}