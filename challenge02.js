{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator

        elevator.on("idle", function() {
            // nothing to do
        });
        
        floors.forEach( function(f) { 
            f.on("up_button_pressed", function() {
                elevator.goToFloor(f.floorNum());
            });
        
            f.on("down_button_pressed", function() {
                elevator.goToFloor(f.floorNum());
            });
        });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}