function make2DArray(rows, cols) {
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

var rows  = 15, cols = 15;

var grid = make2DArray(rows, cols);
for(var i = 0; i < rows; i++){
		for(var j = 0; j < cols; j++){
			//grid[i][j].revealed = false; //Setting the reveal property to false
			if (Math.random() < 0.1){
				grid[i][j].trap = true; //Planting the traps
			}
		}
	}
//Counting the number of traps around it
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
		temp.addEventListener("click", doSomething, false);
		temp.addEventListener("contextmenu", mark, false);
	}
}

function doSomething(e){
	var x = e.target.id;
	var rn = "";
	var cn = "";
	for(var t = 1; t < 3; t++){
		if (x[t] != "c"){
			rn += x[t];
		}
		
	}
	if (x[2] == "c")
		for(var t = 3; t < x.length; t++){cn += x[t]}
	else for(var t = 4; t < x.length; t++){cn += x[t]};
		
	var rowNum = eval(rn);
	var colNum = eval(cn);
	console.log(rowNum);
	console.log(colNum);
	console.log(grid[rowNum][colNum].trap);
	grid[rowNum][colNum].revealed = true;
	if (grid[rowNum][colNum].trap == true){
		for(rT = 0; rT < rows; rT++){
			for(cT = 0; cT < cols; cT++){
				if(grid[rT][cT].trap){
					document.getElementById("r" + rT.toString() + "c" + cT.toString()).innerHTML = '<img src = "mine.jpg">';
				}
			}
		}
		alert("Game Over!");
	}
	else{
		if (grid[rowNum][colNum].surround != 0){
			document.getElementById(x).innerHTML =  grid[rowNum][colNum].surround.toString();
			
		}
		else if (grid[rowNum][colNum].surround == 0){
			var elem = document.getElementById(x);
			console.log(elem.style.backgroundColor);
			elem.style.backgroundColor = "rgb(250, 250, 250)";

			if((rowNum - 1 >= 0) &&  (colNum - 1) >= 0 && !(grid[rowNum - 1][colNum - 1].revealed) ) document.getElementById("r" + (rowNum - 1) + "c" + (colNum - 1)).click(); 
			if(rowNum - 1 >= 0 && !(grid[rowNum - 1][colNum].revealed)) document.getElementById("r" + (rowNum - 1) + "c" + colNum).click();
			if((rowNum - 1 >= 0) &&  (colNum + 1) < cols && !(grid[rowNum - 1][colNum + 1].revealed)) document.getElementById("r" + (rowNum - 1) + "c" + (colNum + 1)).click(); 
			if((colNum - 1) >= 0 && !(grid[rowNum][colNum - 1].revealed)) document.getElementById("r" + (rowNum) + "c" + (colNum - 1)).click(); 
			if((colNum + 1) < cols && !(grid[rowNum][colNum + 1].revealed)) document.getElementById("r" + (rowNum) + "c" + (colNum + 1)).click(); 
			if((rowNum + 1 < rows) &&  (colNum - 1) >= 0 && !(grid[rowNum + 1][colNum - 1].revealed)) document.getElementById("r" + (rowNum + 1) + "c" + (colNum - 1)).click(); 
			if((rowNum + 1 < rows) && !(grid[rowNum + 1][colNum].revealed)) document.getElementById("r" + (rowNum + 1) + "c" + (colNum)).click(); 
			if((rowNum + 1 < rows) &&  (colNum + 1) < cols && !(grid[rowNum + 1][colNum + 1].revealed)) document.getElementById("r" + (rowNum + 1) + "c" + (colNum + 1)).click(); 
			
			
		}
	}
}

function mark(e){
	var x = e.target.id;
	var rn = "";
	var cn = "";
	for(var t = 1; t < 3; t++){
		if (x[t] != "c"){
			rn += x[t];
		}
		
	}
	if (x[2] == "c")
		for(var t = 3; t < x.length; t++){cn += x[t]}
	else for(var t = 4; t < x.length; t++){cn += x[t]};
		
	var rowNum = eval(rn);
	var colNum = eval(cn);
	console.log(rowNum);
	console.log(colNum);
	console.log(grid[rowNum][colNum].trap);
	
	var elem = document.getElementById(x);
			console.log(elem.style.backgroundColor);
			elem.style.backgroundColor = "rgba(128, 0, 256, 0.5)";
	

}