# elevatorsaga
Playing http://play.elevatorsaga.com/

I suck writing JS, don't judge me.

### [Challenge 01] (challenge01.js)
Plain stupid.

### [Challenge 02] (challenge02.js)
* Go to floors on demand
* Elevator skips requests when full and unloads first
* Destination queue is purged when stopping at a floor
* Challenge success rate 7 out of 10
 
### [Challenge 03] (challenge03.js)
* Same as 02
* Better success rate: 10/10

### [Challenge 04] (challenge04.js)
* Transport requests are served randomly by one of the elevators
* Destination queue is purged when stopping at a floor for both elevators
* Success rate: 9/10

### [Challenge 05] (challenge05.js)
* Elevators go to destination floors on demand
* On the way they stop if they have capacity and there is someone waiting at the floor
* Demand from floors is managed via global demand map
* High success rate for challenges 1 to 5

### [Up Down Strategy] (upDownStrategy.js)
* Elavators constantly go from bottom to top and return, using indicators
* Stop at floors to unload or to pickup passengers (if evevator has capacity)
* Passengers waiting at floors are managed using two state machines (up/down)
* Works for all challenges up to 10. Waitings times are too high for higher challenges.
![Up Down Strategy Stats](img/UpDownStrategyStats.PNG?raw=true)


