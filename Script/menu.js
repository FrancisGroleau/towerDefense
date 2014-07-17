var activeTower = "";
var round = 0;
var numberOfTrackLeft = 50;
var pathDone = false;
var gameStatus = false;

	$(document).ready(function(){
		$('.towerIcon').on('click',function(){

			$('.towerIcon').each(function(){
				if($(this).hasClass('activeTower'))
					$(this).toggleClass('activeTower');
				
			});
				$(this).toggleClass('activeTower');
				activeTower = $(this).attr('id');
		});
		
		/*$('#startPause').on('click',function(){
			
			gameStatus = !gameStatus;
		});*/
		
		$('#nextRound').text("start round " + round++);
		$('#numberOfPath').text("Number of track left " + numberOfTrackLeft);
		
		$('#nextRound').on('click',function(){
				
			
			round++;
			
			//when we start next round we resume the game if it was paused
				gameStatus = true;
				mobCounter++;
			//get the path that has been created
			//getPath();
		});
		
		
		$('#path').on('click',function(){
		
			pathDone = true;
		});
	});
	
	function actualiserNumberOfPath(){
	
		$('#numberOfPath').text("Number of track left " + numberOfTrackLeft);
	}