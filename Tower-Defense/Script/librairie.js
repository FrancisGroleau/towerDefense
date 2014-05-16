var canvas,
	cellsIndex = 0,
	cells = {},
	mobs = {},
	mobsIndex = 0,
	cellWidth = 40,
	cellHeight = 40,
	path = {},
	pathIndex = 0;
	var grid = [];
	var NumberOfRow, NumberOfCol;
	var index = 0;

	

window.onload = function(){

		canvas = document.getElementById("canvas"),
		c = canvas.getContext("2d");
		canvas.width = 800;
		canvas.height =  800;
			

		c.fillStyle = "rgba(0,0,0,0.2)";
		c.fillRect(0,0,canvas.width,canvas.height);
		
		initializeCanvas();
		
}

function initializeCanvas(){

	c.fillStyle = "rgba(0,0,0,0.2)";
	c.fillRect(0,0,canvas.width,canvas.height);
	
	NumberOfRow = (canvas.width / cellWidth);
	NumberOfCol = (canvas.height / cellHeight);

	//2D array lolz woot
	grid = new Array(NumberOfRow)
	for(var j = 0; j < NumberOfCol; j++)
		grid[j] = new Array(NumberOfRow);
	
	//create the cells
	for(var row = 0; row < NumberOfRow; row++){
		for(var col = 0; col < NumberOfCol; col++){
			grid[row][col] = new cell((col * cellWidth),(row * cellHeight),cellWidth,cellHeight, '#B8B8B8', 'rgba(0,0,0,0.2)');
		}
	} 
	//create the mobs for first round begin with 50
	for(var i = 0; i < 2; i++){
			new mob(0,0,grid[0][0].width,grid[0][0].height,"losange",100,0,0.1,"rgba(73,242,222,0.3)");
	}
	

	



	// Add event listener for `click` events.
	canvas.addEventListener('click', function(e) {
		
		var mousePos = getMousePos(canvas, e);
			
		for(var row = 0; row < NumberOfRow; row++){
			for(var col = 0; col < NumberOfCol; col++){
				var selectedCell = grid[row][col];
				if (mousePos.y > selectedCell.y && mousePos.y < selectedCell.y + selectedCell.height && mousePos.x > selectedCell.x && mousePos.x < selectedCell.x + selectedCell.width) {
				
						if(activeTower == ""){
							if(!pathDone){
							if(numberOfTrackLeft > 0){
									selectedCell.isPath = true;
									numberOfTrackLeft--;
									actualiserPath();
								}
								//getPath();
							}
						}
						else{
							var color = "";
							var range = "";
							var colorRange = "";
								if(activeTower == "green"){
									color = "rgba(0,188,140,0.5)";
									colorRange = "rgba(0,188,140,0.2)";
									range = 130;
								}
								else if(activeTower == "red"){
									color = "rgba(231,76,60,0.5)";
									colorRange = "rgba(231,76,60,0.2)";
									range = 260;
								}
								else if(activeTower == "purple"){
									color = "rgba(175,133,201,0.5)";
									colorRange = "rgba(175,133,201,0.2)";
									range = 80;
								}
							
							t = new tower(selectedCell.x, selectedCell.y,selectedCell.width, selectedCell.height, color, range, colorRange);
							selectedCell.tower = t;
							//selectedCell.isHover = true;
						}
					}
				}
			}
		},false);
		
		
		
	canvas.addEventListener('mousemove', function(e) {
		
		var mousePos = getMousePos(canvas, e);
			
		for(var row = 0; row < NumberOfRow; row++){
			for(var col = 0; col < NumberOfCol; col++){
				var selectedCell = grid[row][col];
				if(selectedCell.tower != null)
				{
					if (mousePos.y > selectedCell.y && mousePos.y < selectedCell.y + selectedCell.height && mousePos.x > selectedCell.x && mousePos.x < selectedCell.x + selectedCell.width) {
						selectedCell.tower.isHover = true;
					}
					else{
						selectedCell.tower.isHover = false;
					}
				}
			}
		}
	}, false); 
	
	//createPath();
	

	//draw them cells
	for( var ce in cells){	
		cells[ce].draw();
	}
	
	

}
function getPath(){

	for(var ce in cells)
	{
		if(cells[ce].isPath)
		{
			path[pathIndex] = cells[ce];	
			pathIndex++;
				
		}
	} 
	path[pathIndex - 1].isBase = true;
	path[pathIndex - 1].isPath = false;
}

function createPath(){
 	
	var indexesOfCellsInLastCol = new Array();
	for(var o = NumberOfRow; o < (NumberOfRow * NumberOfRow); o+= NumberOfRow)
		indexesOfCellsInLastCol.push(o);

	var indexesOfCellsInFirstCol = new Array();
	for(var k = 1; k < (NumberOfRow * NumberOfRow); k+= NumberOfRow)
		indexesOfCellsInFirstCol.push(k);
		
	var usedDirection = [];
		
	var x = 0;
	var y = 0;
	 
	 // random walk without crossing
	 //for(var i = 0; i < 50; i++){
	//	var direction = Math.floor((Math.random()*4));
		
			/*	grid[0][0].isPath = true;
				grid[0][1].isPath = true;
				grid[1][1].isPath = true;
				grid[1][2].isPath = true;
				grid[2][2].isPath = true;
				grid[2][3].isPath = true;
				grid[2][4].isPath = true;
				grid[2][5].isPath = true;
				grid[2][6].isPath = true;
				grid[3][7].isPath = true;
				grid[3][8].isPath = true;
				grid[4][9].isPath = true;				
				grid[5][10].isPath = true;
				grid[6][10].isPath = true;
				grid[6][11].isPath = true;
				grid[6][12].isPath = true;
				grid[6][12].isPath = true;
				grid[6][11].isPath = true;
				grid[6][10].isPath = true;
				grid[6][9].isPath = true;
				grid[6][8].isPath = true;
				grid[6][7].isPath = true;
				grid[6][6].isPath = true;
				grid[7][6].isPath = true;
				grid[8][6].isPath = true;
				grid[9][6].isPath = true;
				grid[9][6].isPath = true;
				grid[10][7].isPath = true;
				grid[10][8].isPath = true;
				grid[10][9].isPath = true;
				grid[10][10].isPath = true;
				grid[10][11].isPath = true;
				grid[10][12].isPath = true;
				grid[10][13].isPath = true;
				grid[10][14].isPath = true;
				grid[10][15].isPath = true;
				grid[10][16].isPath = true;
				grid[10][17].isPath = true; */
			
		
			
		
		/*else //random path ... does shit abandon this
		{
			switch(direction){
				//left
				case 0: 
					if(!contains(usedDirection, 0)){
						if(collideDirection(y,x - 1) == 1 && collideDirection(y, x - 2) == 0) {
							//check if you are not in first col, because if you go left while you're in first col you go back to last row.
							if(!contains(indexesOfCellsInFirstCol, x) && !grid[y][x - 1].isPath){
								grid[y][x - 1].isPath = true;
								x--;
								usedDirection = [];
							}
							else
								usedDirection.push(0);
						}
					}
				break;
				//up
				case 1:
					if(!contains(usedDirection, 1)){
						if(collideDirection(y - 1,x) == 1 && collideDirection(y - 2,x) == 0){
							if(y - 1 > 1 && !grid[y - 1][x].isPath){
								grid[y - 1][x].isPath = true;
								y--;
								usedDirection = [];
							}
							else
								usedDirection.push(1);
						}
					}					
				break;
				//right
				case 2:
					if(!contains(usedDirection, 2)){				
						if(collideDirection(y,x + 1) == 1 && collideDirection(y,x + 2) == 0){
							//same as going left whil you're on the first col
							if(!contains(indexesOfCellsInLastCol, x) && !grid[y][x + 1].isPath){
								grid[y][x + 1].isPath = true;
								x++;
								usedDirection = [];
							}
							//don't be no fool and try to repeat your self
							else
								usedDirection.push(2);
						}
					}					
				break
				//down
				case 3:
					if(!contains(usedDirection, 3)){
						if(collideDirection(y + 1,x) == 1 && collideDirection(y + 2,x) == 0 ){
							if((y + 1 < (NumberOfRow - 1)) && !grid[y + 1][x].isPath){
								grid[y + 1][x].isPath = true;
								y++;
								usedDirection = [];
							}
							else
								usedDirection.push(3);
						}	
					}					
				break;
			}
		}*/
	 //}
	
}

function collideDirection(y, x){

	var numberOfCollidingCells = 0;
	if((x - 1 > 0) && (y - 1 > 1) && (x + 1 < NumberOfRow) && (y + 1 < NumberOfRow))
	{
		if(grid[y - 1][x].isPath)
			numberOfCollidingCells++;
		if(grid[y][x - 1].isPath)
			numberOfCollidingCells++;
		if(grid[y][x].isPath)
			numberOfCollidingCells++;
		if(grid[y][x + 1].isPath)
			numberOfCollidingCells++;
		if(grid[y + 1][x].isPath)
			numberOfCollidingCells++;
	
		return numberOfCollidingCells;
	}
	else
		return 0;
}

function clear(x,y,width,height){

	// Store the current transformation matrix
	c.save();

	// Use the identity matrix while clearing the canvas
	c.setTransform(1, 0, 0, 1, 0, 0);
	c.clearRect ( x , y , width , height );

	// Restore the transform
	c.restore();
	
}

function cell(x, y, width, height, borderColor, color, isPath){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.borderColor = borderColor;
	this.color = color;
	this.isPath = isPath;
	this.tower = null;
	this.isHover = false;
	this.isBase = false;
	
	//manage cells

	cells[cellsIndex] = this;		
	this.id = cellsIndex;
	cellsIndex++;

	if(this.tower != null && this.isHover)
		this.tower.isHover = true;
	
	
	
	this.draw = function(){
		if(this.isPath){	
			c.fillStyle = "rgba(4,33,48,0.5)";
			c.fillRect(this.x,this.y,this.width,this.height);	
		}
		else if(this.isBase){
			c.fillStyle = "rgba(250,242,0,0.1)";
			c.fillRect(this.x,this.y,this.width,this.height);
		}
		else{
			//Draw the normal cell
			c.beginPath();
				c.lineWidth="1";
				c.strokeStyle= this.borderColor;
				c.rect(this.x,this.y,this.width,this.height);
			c.stroke(); 
			
			c.fillStyle = "rgba(0,0,0,0.5)";
			c.fillRect(this.x,this.y,this.width,this.height);
		}
		
	}

}

function contains(array, obj){
		 for (var i = 0; i < array.length; i++) {
        if (array[i] == obj  ) {
            return true;
        }
    }
    return false;

}

function getMousePos(canvas, evt) {

    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function tower(x, y, width, height, color, range, colorRange){

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.colorRange = colorRange;
	this.range = range;
	this.isHover = false;
	
	this.draw = function(){
			//draw the range
			if(this.isHover){
					c.beginPath();
					c.arc((this.x + (this.width / 2)), (this.y + (this.height / 2)), this.range, (2 * Math.PI), 0, false);
					c.fillStyle = this.colorRange;
					c.fill();
					c.lineWidth = 2;
			}
				//Draw the tower
			c.fillStyle = this.color;
			c.fillRect(this.x,this.y,this.width,this.height);
	}
	
}

function mob(x, y, width, height, type, life, resistance, speed, color){

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.type = type;
	this.life = life;
	this.resistance = resistance;
	this.color = color;
	this.nextCheckPointX = 0;
	this.nextCheckPointY = 0;
	this.mobPathIndex = 0;
	this.speed = speed;
	
	mobs[mobsIndex] = this;		
	this.id = mobsIndex;
	mobsIndex++;
	
	this.draw = function(){
	
		//draw the mobs by type;
		
		if(this.type == "losange"){
			c.fillStyle = this.color;
			c.beginPath();
			c.moveTo((this.x + (this.width / 2)), this.y);
			c.lineTo((this.x + this.width), (this.y + (this.height / 2)));
			c.lineTo((this.x + (this.width / 2)), (this.y + this.height));
			c.lineTo(this.x , (this.y + (this.height / 2)));
			c.closePath();
			c.fill();
		} 
	
	}

}


//game loop
setInterval(function(){

		//add mobs
		/*if((round * 50) != mobs.lenght)
		{
			//reset the array of mobs
			mobs = {};
			mobsIndex = 0;
			//add mobs according to the round we're at
			for(var i = 0; i < round * 50; i++){
				new mob(0,0,grid[0][0].width,grid[0][0].height,"losange",100,0,"rgba(73,242,222,0.3)");
			}
		} */
		
		//move mobs to next cell whose part of the path
		if(gameStatus){
		
		/*	for(var p in path){
				for(var m in mobs){	
					/*var index = p;
					if(index < pathIndex)
						index++;
					else
						index = 0; */
				/*(for(var m in mobs){	
					mobs[m].nextCheckPointY = path[p].y;
					mobs[m].nextCheckPointX = path[p].x;	
				}*/
				
				
				for(var m in mobs){
				
						if(mobs[m].y.toFixed(1) != mobs[m].nextCheckPointY.toFixed(1) || mobs[m].x.toFixed(1) != mobs[m].nextCheckPointX.toFixed(1)){
							if(mobs[m].nextCheckPointY.toFixed(1) > mobs[m].y.toFixed(1)){
								mobs[m].y += mobs[m].speed;//= 0.05;
								continue;
								//break;
							}
							if(mobs[m].nextCheckPointX.toFixed(1) > mobs[m].x.toFixed(1)){
								mobs[m].x += mobs[m].speed;//= 0.05;
								continue;
								//break;
							}
							if(mobs[m].nextCheckPointY.toFixed(1) < mobs[m].y.toFixed(1)){
								mobs[m].y -= mobs[m].speed;//= mobs[m].y - 0.05;
								continue;
								//break;
							}
							if(mobs[m].nextCheckPointX.toFixed(1) < mobs[m].x.toFixed(1)){
								mobs[m].x -= mobs[m].speed; //-= 0.05;		
								continue;
								//break;
							}							
						}
						else{
							//if(mobs[m].mobPathIndex < pathIndex){
								//mobs[m].mobPathIndex++
									mobs[m].mobPathIndex++

									console.log("mob : x:" + mobs[m].x + " y:" + mobs[m].y + " cy:" + mobs[m].nextCheckPointY + " cx:" + mobs[m].nextCheckPointX );
								console.log("path : x:" + path[mobs[m].mobPathIndex].x + " y:" + path[mobs[m].mobPathIndex].y);
								mobs[m].nextCheckPointY = path[mobs[m].mobPathIndex].y;
								mobs[m].nextCheckPointX = path[mobs[m].mobPathIndex].x;
							
								console.log("mob : x:" + mobs[m].x + " y:" + mobs[m].y + " cy:" + mobs[m].nextCheckPointY + " cx:" + mobs[m].nextCheckPointX );
							//}
						}
						
				
				
					}
			//}
		}
		
		//only draw will game is not on pause
		//if(gameStatus)
		//{
		//logic for mobs to follow the path

		
		//first draw the cell
		for( var ce in cells){	
			cells[ce].draw();
		}
		
		//then all the mobs
		for(m in mobs){
			mobs[m].draw();
		}

		//then draw all tower
		for(var row = 0; row < NumberOfRow; row++){
			for(var col = 0; col < NumberOfCol; col++){
			if(grid[row][col].tower != null)
				grid[row][col].tower.draw();			
			}
		}
		
	


	},1000 / 60);
	
	
	//move the mobs
	
		
			/*for(var i = 0; i < cells.length; i++){
				if(cells[i].isPath){
					for(var j = 0; j < mobs.length; j++){
						mobs[j].y = cells[i].y
						mobs[j].x = cells[i].x;
					
					}
				}
			}*/
