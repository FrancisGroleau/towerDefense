var canvas,
	cellsIndex = 0,
	cells = {},
	mobs = {},
	mobsIndex = 0,
	cellWidth = 40,
	cellHeight = 40,
	path = {},
	pathIndex = 0,
	rockets = {},
	rocketIndex = 0,
	particles = {},
	particleIndex = 0;
	var grid = [];
	var NumberOfRow, NumberOfCol;
	var index = 0;
	var life = 10;
	var mobCounter = 0;
	var firstMob = true;

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
			grid[row][col] = new cell((row * cellWidth),(col * cellHeight),cellWidth,cellHeight, '#B8B8B8', 'rgba(0,0,0,0.2)');
		}
	} 
	//create the mobs for first round begin with 50

	

	



	// Add event listener for `click` events.
	canvas.addEventListener('click', function(e) {
		
		var mousePos = getMousePos(canvas, e);
			
		for(var row = 0; row < NumberOfRow; row++){
			for(var col = 0; col < NumberOfCol; col++){
				var selectedCell = grid[row][col];
				if (mousePos.y > selectedCell.y && mousePos.y < selectedCell.y + selectedCell.height && mousePos.x > selectedCell.x && mousePos.x < selectedCell.x + selectedCell.width) {
				
						// if(activeTower == ""){
							// if(!pathDone){
							// if(numberOfTrackLeft > 0){
								// // if(!selectedCell.isPath){
										// // selectedCell.isPath = true;
										// // numberOfTrackLeft--;
											// // path[pathIndex] = selectedCell;
											// // pathIndex++;
										// // actualiserNumberOfPath();
									// // }
								// }
								// //getPath();
							// }
						// }
						// else{
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
									colorRange = "rgba(231,76,60,0.05)";
									range = 260;
								}
								else if(activeTower == "purple"){
									color = "rgba(175,133,201,0.5)";
									colorRange = "rgba(175,133,201,0.2)";
									range = 80;
								}
							
							t = new tower(selectedCell.x, selectedCell.y,selectedCell.width, selectedCell.height, color, range, colorRange, activeTower);
							selectedCell.tower = t;
							//selectedCell.isHover = true;
						//}
					}
				}
			}
		},false);
		
				
	canvas.addEventListener('mousemove', function(e) {
		
		var mousePos = getMousePos(canvas, e);
			
		for(var row = 0; row < NumberOfRow; row++){
			for(var col = 0; col < NumberOfCol; col++){
				var selectedCell = grid[row][col];
				if(selectedCell.tower != null){
					if (mousePos.y > selectedCell.y && mousePos.y < selectedCell.y + selectedCell.height && mousePos.x > selectedCell.x && mousePos.x < selectedCell.x + selectedCell.width) 
						selectedCell.tower.isHover = true;
					else
						selectedCell.tower.isHover = false;
					
				}
			}
		}
	}, false); 
	
	createPath();
	//getPath;

	//draw them cells
	for( var ce in cells){	
		cells[ce].draw();
	}
	
	

}
function getPath(){

	for(var row = 0; row < NumberOfRow; row++){
		for(var col = 0; col < NumberOfCol; col++){
			var selectedCell = grid[row][col];
			if(selectedCell.isPath){
				path[pathIndex] = selectedCell;	
				pathIndex++;				
			}
		}
	}


}

function createPath(){
 	
	//S shape path
	
	for(var i = 0; i < 16; i++){
		grid[i][0].isPath = true;
		path[pathIndex] = grid[i][0];
		pathIndex++;
	}
	
	for(var i = 0; i < 5; i++){
		grid[15][i].isPath = true;
		path[pathIndex] = grid[15][i];
		pathIndex++;
	}
	
	for(var i = 15; i > 0; i--){
		grid[i][4].isPath = true;
		path[pathIndex] = grid[i][4];
		pathIndex++;
	}
	
	for(var i = 5; i < 9; i++){
		grid[1][i].isPath = true;
		path[pathIndex] = grid[1][i];
		pathIndex++;
	}

	
	for( var i = 1; i < 16; i++){
		grid[i][8].isPath = true;
		path[pathIndex] = grid[i][8];
		pathIndex++;
	}

	for(var i = 9; i < 13; i++){
		grid[15][i].isPath = true;
		path[pathIndex] = grid[15][i];
		pathIndex++;
	}
	
	
	for(var i = 15; i > 2; i--){
		grid[i][12].isPath = true;
		path[pathIndex] = grid[i][12];
		pathIndex++;
	}
		
	path[pathIndex - 1].isBase = true;
	path[pathIndex - 1].isPath = false;
	// var indexesOfCellsInLastCol = new Array();
	// for(var o = NumberOfRow; o < (NumberOfRow * NumberOfRow); o+= NumberOfRow)
		// indexesOfCellsInLastCol.push(o);

	// var indexesOfCellsInFirstCol = new Array();
	// for(var k = 1; k < (NumberOfRow * NumberOfRow); k+= NumberOfRow)
		// indexesOfCellsInFirstCol.push(k);
		
	// var usedDirection = [];
		
	// var x = 0;
	// var y = 0;
	 
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
	this.leftArrow = false;
	
	//manage cells

	cells[cellsIndex] = this;		
	this.id = cellsIndex;
	cellsIndex++;

	if(this.tower != null && this.isHover)
		this.tower.isHover = true;
	
	
	
	this.draw = function(){
		if(this.isPath){	
			c.fillStyle = "rgba(4,33,48,0.3)";
			c.fillRect(this.x,this.y,this.width,this.height);	
		}
		else if(this.isBase){
			c.fillStyle = "rgba(250,242,0,0.3)";
			c.fillRect(this.x,this.y,this.width,this.height);
		}
		else if(this.leftArrow){
			c.fillStyle = "rgba(0,140,12,0.5)";
			// c.beginPath();
				// c.lineTo(this.x,(this.y + this.height) / 2);
				// c.lineTo((this.x + this.width) / 3, ((this.y + this.height) / 2) / 2);
				// c.lineTo((this.x + this.width) / 3, (this.y + this.height) / 3);
				// c.lineTo((this.x + this.width), (this.y + this.height) / 3);
				// c.lineTo((this.x + this.width), (this.y + this.height) - ((this.y + this.height) / 3));
				// c.lineTo((this.x + this.width) / 3,(this.y + this.height) - ((this.y + this.height) / 3))
				// c.lineTo((this.x + this.width) / 3,((this.y + this.height) / 2) - (((this.y + this.height) / 2) / 2));
			// c.closePath();
			// c.fill();
			
		    c.beginPath();
			c.moveTo(this.x + 10 , (this.y + (this.height / 2)));
			c.lineTo((this.x + this.width) - 10, this.y + 10);
			c.lineTo((this.x + this.width) - 10, (this.y + this.height) - 10);
			c.closePath();
			c.fill();
			
		}
		else{
			//Draw the normal cell
			c.beginPath();
				c.lineWidth="1";
				c.strokeStyle= this.borderColor;
				c.rect(this.x,this.y,this.width,this.height);
			c.stroke(); 
			
			c.fillStyle = "rgba(0,0,0,0.2)";
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

function tower(x, y, width, height, color, range, colorRange, type){

	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.colorRange = colorRange;
	this.range = range;
	this.type = type;
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
	
	this.hit = function(){	
		for(var i = 0; i < 400; i++){	
			new particle(this.x + this.width / 2, this.y + this.height / 2);		
		}
	}

}

function particle(posX,posY){
		this.x = posX;
		this.y = posY;
		this.vx = Math.random() * 10 - 5;
		this.vy = Math.random() * 10 - 5;
		
		//Code by guyhaume to make the repartition of the particle in a more rounded way
		this.len = Math.sqrt(this.vx * this.vx + this.vy * this.vy) / (Math.random() * 4);
		this.vx /= this.len;
		this.vy /= this.len;
		
		
		
		this.life = 0;
		this.color = "rgba( 255," + parseInt(Math.floor(Math.random() * 255)) + ",0,0.5)";
		//this.color = "hsl(" + parseInt(Math.random() * 360) +",50%,50%)";
		//number between 1 and 100
		this.maxLife = Math.floor((Math.random()*50)+1);
		
		
		particleIndex++;
		//add the new particle to the object
		particles[particleIndex] = this;		
		this.id = particleIndex;
		
		
		
		this.draw = function(){
			this.x += this.vx;
			this.y += this.vy;
			
			this.life++;
			if(this.life >= this.maxLife){
				delete particles[this.id];
			}
			
			//the actual draw
			c.beginPath();
			c.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
			c.fillStyle = this.color;
			c.fill();
		}
}

function rocket(x, y, width, height, type, speed, target){

	this.x = x;
	this.y = y;
	this.originX = x;
	this.originY = y;
	this.vx = 0;
	this.vy = 0;
	this.width = width;
	this.height = height;
	this.type = type;
	this.speed = speed;
	this.target = target;
	this.targetLocked = false;

	rockets[rocketIndex] = this;
	this.id = rocketIndex;
	rocketIndex++;
	
	this.draw = function(){
	
		//draw the mobs by type;
		
		//wonder around until target is locked
		if(!this.targetLocked)
		{
			this.x += this.vx;
			this.y += this.vy;	
		}
		
		if(this.type == "red"){
			c.fillStyle = "rgba(231,76,60,0.9)";
			c.fillRect(this.x,this.y,this.width,this.height);
		} 
	
	}


}

function createNewMobs(){

	if(gameStatus)
	{
		if(mobCounter < 50){
			new mob(0,0,40,40,"losange",10,0,0.50,"rgba(73,242,222,0.7)");
			mobCounter++;		
		}
	}
}

function shootRockets(){

		for(var ce in cells){
			for(var m in mobs){
				if(cells[ce].tower != null){
					if(cells[ce].tower.type == "red"){
						if((((cells[ce].x + (cells[ce].width / 2)) + cells[ce].tower.range) >= mobs[m].x) && (((cells[ce].y + (cells[ce].height / 2)) + cells[ce].tower.range) >= mobs[m].y) && 
						   (((cells[ce].x + (cells[ce].width / 2)) - cells[ce].tower.range) <= mobs[m].x) && (((cells[ce].y + (cells[ce].height / 2)) - cells[ce].tower.range) <= mobs[m].y)){
								var vy = Math.floor((Math.random() * 4) + 1) -2;
								var vx = Math.floor((Math.random() * 4) + 1) -2;
								
								//if(rocketIndex < 20){
								
								
										var r = new rocket((cells[ce].x + (cells[ce].width / 2)),(cells[ce].y + (cells[ce].height / 2)),12,12,"red",2,mobs[m]);
										r.vx = vx;
										r.vy = vy;
										return;
							
								//}
						}
					}
				}
			}
		}

}

function intersect(rectA, rectB) {
  return !(rectA.x + rectA.width < rectB.x ||
           rectB.x + rectB.width < rectA.x ||
           rectA.y + rectA.height < rectB.y ||
           rectB.y + rectB.height < rectA.y);
}; 

//game loop
setInterval(function(){


		
		//only draw will game is not on pause
		if(gameStatus){
			if(firstMob){
				new mob(0,0,40,40,"losange",10,0,0.50,"rgba(73,242,222,0.9)");
				mobCounter++;	
				firstMob = false;
			}
			//move mobs to next cell whose part of the path
			for(var m in mobs){
						
				if(mobs[m].y != mobs[m].nextCheckPointY || mobs[m].x != mobs[m].nextCheckPointX){
					if(mobs[m].nextCheckPointY > mobs[m].y){
						mobs[m].y += mobs[m].speed;//= 0.05;
						continue;
						//break;
					}
					if(mobs[m].nextCheckPointX > mobs[m].x){
						mobs[m].x += mobs[m].speed;//= 0.05;
						continue;
						//break;
					}
					if(mobs[m].nextCheckPointY < mobs[m].y){
						mobs[m].y -= mobs[m].speed;//= mobs[m].y - 0.05;
						continue;
						//break;
					}
					if(mobs[m].nextCheckPointX < mobs[m].x){
						mobs[m].x -= mobs[m].speed; //-= 0.05;		
						continue;
						//break;
					}							
				}
				else{
					if(mobs[m].mobPathIndex < pathIndex){
						//mobs[m].mobPathIndex++
							mobs[m].mobPathIndex++

						//console.log("mob : x:" + mobs[m].x + " y:" + mobs[m].y + " cy:" + mobs[m].nextCheckPointY + " cx:" + mobs[m].nextCheckPointX );
						//console.log("path : x:" + path[mobs[m].mobPathIndex].x + " y:" + path[mobs[m].mobPathIndex].y);
						mobs[m].nextCheckPointY = path[mobs[m].mobPathIndex].y;
						mobs[m].nextCheckPointX = path[mobs[m].mobPathIndex].x;
					
						//console.log("mob : x:" + mobs[m].x + " y:" + mobs[m].y + " cy:" + mobs[m].nextCheckPointY + " cx:" + mobs[m].nextCheckPointX );
					}else{
						if(life > 0){
							life--;
							refreshNumberOfLifeLeft();
						}else{
							gameStatus = false;
						}
						delete mobs[m];
					}
				}
			}
			
			//detect if mobs are in rage to be shot by tower
				if(rocketIndex > 0){
									
					for(var ro in rockets){
					
						if(rockets[ro].x > rockets[ro].originX + 100 || rockets[ro].y > rockets[ro].originY + 100 || rockets[ro].x < rockets[ro].originX - 100 ||  rockets[ro].y < rockets[ro].originY){
							rockets[ro].targetLocked = true;
						}
					
						if(rockets[ro].targetLocked && rockets[ro].target){
						
							//if(!((rockets[ro].x > rockets[ro].target.x) && (rockets[ro].x < (rockets[ro].target.x + rockets[ro].target.width))) && 
							//   !((rockets[ro].y > rockets[ro].target.y) && (rockets[ro].y < (rockets[ro].target.y + rockets[ro].target.height)))){
							if(!intersect(rockets[ro],rockets[ro].target)){
								if(rockets[ro].target.x > rockets[ro].x){
									rockets[ro].x += rockets[ro].speed;
									//continue;
								}
								if(rockets[ro].target.x < rockets[ro].x){
									rockets[ro].x -= rockets[ro].speed;
									//continue;
								}
								if(rockets[ro].target.y > rockets[ro].y){
									rockets[ro].y += rockets[ro].speed;
									//continue;
								}
								if(rockets[ro].target.y < rockets[ro].y){
									rockets[ro].y -= rockets[ro].speed;
									//continue;
								}
								
							}else{								
								for(var m2 in mobs){
									if(mobs[m2].id ==  rockets[ro].target.id){
										if(mobs[m2].life - 5 > 0){
											mobs[m2].life -= 5;
											mobs[m2].hit();
											delete rockets[ro];
											break;
										}else{
											for(var r2 in rockets){
												if(rockets[r2].target.id == rockets[ro].target.id){
													mobs[m2].hit();
													//rocket lost his target since it's been destroyed, so it wanders off
													rockets[r2].target.id = -1;
													rockets[r2].targetLocked = false;
													
													//delete rockets[r2];
													//var newTarget = false;
													//Ugly hack to assign the first mob in the object mobs to the rocket who just lost his
													//for(var m3 in mobs){
													//	newTarget = mobs[m3];
													//	break;	
													//}
													//If we still have mobs to kill assign, else well destroy the rocket ...
													//if(newTarget != false)
													//	rockets[r2].target = newTarget;	
													//else
													//	delete rockets[r2]
												}
											}
											delete mobs[m2];
											delete rockets[ro];
											break;
										}
									}
								}											
							} 		
						}
					}
				}
		}//end of game Status
			
			
			
		
		
		
		
		//first draw the cell
		for( var ce in cells){	
			cells[ce].draw();
		}
					
		//then all the rocket
		for( var ro in rockets){
			rockets[ro].draw();
		}
		
		//then all the particle
		for(var p in particles){
				particles[p].draw();
		}
		
		//then all the mobs
		for(var m in mobs){
			mobs[m].draw();
		}
		
		//then draw all tower
		for(var row = 0; row < NumberOfRow; row++){
			for(var col = 0; col < NumberOfCol; col++){
			if(grid[row][col].tower != null)
				grid[row][col].tower.draw();			
			}
		}
		

		//c.fillStyle = "rgba(0,0,0,0.02)";
		//c.fillRect(0,0,canvas.width,canvas.height);

	},1000 / 60);
	
setInterval(createNewMobs,9000);
		
setInterval(shootRockets,5000);
	


