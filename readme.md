*Steps*

__Step 1__
Create the grid

__Step 2__
Set up Mines
use x = Math.random, if x < 0.3, put mine = true


On Clicking the box,
2 Cases:

Case 1: It contains a trap
	Show all the traps and game over
	
Case 2: It does not contain a trap
	Show the number of traps surrounding this box
	If the number of traps surrounding this box is zero
		Open the surrounding boxes (Same as Clicking on all of them)
			Call this Case 2 code again.

