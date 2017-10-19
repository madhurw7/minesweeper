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
			if (Math.random() < 0.1){
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
		temp.addEventListener("click", doSomething, false); 
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
		else {
			var elem = document.getElementById(x);
			elem.style.backgroundColor = "#EEEEEE";
			for(var tr1 = rowNum - 1; tr1 < rowNum + 2; tr1++){
				for(var tr2 = colNum - 1; tr1 < colNum + 2; tr2++){
					if(tr1 >= 0 && tr1 < rows && tr2 >= 0 && tr2 < cols && !(grid[tr1][tr2].revealed) ){
						eventFire(document.getElementById("r" + tr1.toString() + "c" + tr2.toString()), 'click');
						//Simulate click on grid[tr1][tr2] that is on element with id r<tr1>c<tr2>
					}
				}
			}
		}
		
	}
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}