{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        elevator.on("floor_button_pressed", function(floorNum) {
            elevator.goToFloor(floorNum, (elevator.loadFactor() >= 0.6));
        });
        
        floors.forEach( function(f) { 
            f.on("up_button_pressed", function() {
                elevator.goToFloor(f.floorNum());
            });
        
            f.on("down_button_pressed", function() {
                elevator.goToFloor(f.floorNum());
            });
        });

        // Remove current floor form queue
        elevator.on("stopped_at_floor", function(floorNum) {
            var index = elevator.destinationQueue.indexOf(floorNum);
            if (index > -1) {
                elevator.destinationQueue.splice(index, 1);
                elevator.destinationQueue.splice(index, 1);
                elevator.destinationQueue.splice(index, 1);
                elevator.destinationQueue.splice(index, 1);
                elevator.destinationQueue.splice(index, 1);
                elevator.destinationQueue.splice(index, 1);
            }
            elevator.checkDestinationQueue();
        })        
        
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}