var activeTower = "";
var gameStatus = false;
var round = 0;
var numberOfTrackLeft = 20;
var pathDone = false;

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
			//get the path that has been created
			getPath();
		});
		
		
		$('#path').on('click',function(){
		
			pathDone = true;
		});
	});
	
	function actualiserPath(){
	
		$('#numberOfPath').text("Number of track left " + numberOfTrackLeft);
	}