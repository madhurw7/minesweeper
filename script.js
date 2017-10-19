function make2DArray(rows, cols){
	var arr = new Array(rows);
	for (var i = 0; i < arr.length; i++){
		arr[i] = new Array(cols);
		for (var j = 0; j < cols; j++){
			arr[i][j] = {
				trap: false,
				surround: 0,
				revealed: false
			};
		}
	}
	return arr;
}

var grid;

var rows  = 15, cols = 15, w = 20;

var grid = make2DArray(rows, cols);
for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){
			//grid[i][j].revealed = false; //Setting the reveal property to false
			if (Math.random() < 0.3){
				grid[i][j].trap = true; //Planting the traps
			}
		}
	}

for(var i = 0; i < rows; i++){
	for (var j = 0; j < cols; j++){
		for (var t1 = i - 1; t1 <= i + 1; t1++){
			for (var t2 = j - 1; t2 <= j + 1; t2++){
				if (t1 >= 0 && t1 < rows && t2 >= 0 &&t2 < cols ){
					if (grid[t1][t2].trap == true) grid[i][j].surround++;
				}
			}
		}
		if(grid[i][j].trap == true) grid[i][j].surround--;
	}
}

var contain = document.getElementById("cont")

for(var i = 0; i < rows; i++){
	contain.innerHTML += '<div class = "rowy" id = "' + "r" + i +'">';
	for(var j = 0; j < cols; j++){

		document.getElementById("r" + i.toString()).innerHTML += '<div class = "boxy" id = "' + "r" + i + 'c' + j + '">';
	}
}

for(var i = 0; i < rows; i++){
	for(var j = 0; j < cols; j++){
		var temp = document.getElementById("r" + i.toString() + "c" + j.toString())	
		temp.addEventListener("click", function() {doSomething(grid, i, j)}, false); 
	}
}

function doSomething(arr, i, j){
	console.log(arr[i][j].revealed); 
}