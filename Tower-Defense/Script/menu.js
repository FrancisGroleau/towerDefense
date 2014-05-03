var activeTower = "";
var gameStatus = false;
var round = 0;

	$(document).ready(function(){
		$('.towerIcon').on('click',function(){

			$('.towerIcon').each(function(){
				if($(this).hasClass('activeTower'))
					$(this).toggleClass('activeTower');
				
			});
				$(this).toggleClass('activeTower');
				activeTower = $(this).attr('id');
		});
		
		$('#startPause').on('click',function(){
			
			gameStatus = !gameStatus;
		});
		$('#nextRound').text("start round" + round + 1);
		
		$('#nextRound').on('click',function(){
				
			
			round++;
			
			//when we start next round we resume the game if it was paused
			if(!gameStatus)
				gameStatus = true;
		});
	});