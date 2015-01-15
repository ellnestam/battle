Game master 
 - handles scripts
 - registration
 - can approve new banks

Server
 - To be implemented by the competitors

* Achievements
* Easy to script
* Visualize

* The bank (i.e server to be implemented) sends an acc for each call (with the ID)


Order of things
---------------
1. A bank registers to the Game Master
2. Game Master orders the script runner to run a script against the registered bank
3. The Script Runner sends messages to the bank
4. The bank answers synchrounously
5. The Script Runner writes to an event log
6. Game Master reads the event log
7. Score Board subscribes to the Game Master event stream (for results)

Concepts
--------
GAME MASTER
     - Handles bank registrations
     - Schedules Script Running
     - Calculates results based on the Script Runners Event Log

SCRIPT RUNNER
     - Reads and parses a script
     - Sends messages to banks
     - Receives answers and stores them in the Event Log

EVENT LOG
     - Contains results to that degree that it can be replayed
     - Acts as communication channel between Script Runner and Game Master

SCORE BOARD
     - Visualizes results published by the Game Master
     - One for audience and one for the facilitators

SCRIPTS
     - The scripts contain customers "orders" to the bank
     - Points are awarded at regular intervals based on how far in the script the bank has come
     - When several teams are competing (multiplayer), the point structure is modified in some way based on the other teams results