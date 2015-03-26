{
    init: function(elevators, floors) {
        var elevator01 = elevators[0]; // Let's use the first elevator
        var elevator02 = elevators[1]; // Let's use the first elevator

        elevator01.on("floor_button_pressed", function(floorNum) {
            elevator01.goToFloor(floorNum, (elevator01.loadFactor() >= 0.6));
        });

        elevator02.on("floor_button_pressed", function(floorNum) {
            elevator02.goToFloor(floorNum, (elevator02.loadFactor() >= 0.6));
        });

        floors.forEach( function(f) { 
            f.on("up_button_pressed", function() {
                if (Math.random()<.5) {
                    elevator01.goToFloor(f.floorNum());
                } else {
                    elevator02.goToFloor(f.floorNum());
                }
            });
        
            f.on("down_button_pressed", function() {
                if (Math.random()<.5) {
                    elevator01.goToFloor(f.floorNum());
                } else {
                    elevator02.goToFloor(f.floorNum());
                }
            });
        });
        
        // Remove current floor form queue
        elevator01.on("stopped_at_floor", function(floorNum) {
            var index = elevator01.destinationQueue.indexOf(floorNum);
            if (index > -1) {
                elevator01.destinationQueue.splice(index, 1);
                elevator01.destinationQueue.splice(index, 1);
                elevator01.destinationQueue.splice(index, 1);
            }
            elevator01.checkDestinationQueue();

            var index02 = elevator02.destinationQueue.indexOf(floorNum);
            if (index02 > -1) {
                elevator02.destinationQueue.splice(index02, 1);
                elevator02.destinationQueue.splice(index02, 1);
                elevator02.destinationQueue.splice(index02, 1);
            }
            elevator02.checkDestinationQueue();
            
        })
        
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}