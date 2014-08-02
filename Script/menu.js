

	$(document).ready(function(){
		$('.towerIcon').on('click',function(){

			$('.towerIcon').each(function(){
				if($(this).hasClass('activeTower'))
					$(this).toggleClass('activeTower');
				
			});
				$(this).toggleClass('activeTower');
				activeTower = $(this).attr('id');
		});
		
		$('#nextRound').text("start round 1");
		$('#life').text("life left :" + life);
		$('#mobLeft').text("Enemies left : 4");
		
		
		$('#startPause').on('click',function(){
			
			gameStatus = !gameStatus;
		});
		
	
	
		
		$('#nextRound').on('click',function(){
				
			$('#nextRound').text("start round " + round++);
	
			mobLeft = Math.pow(round,2);
			refreshNumberOfMobLeft();
			
			//when we start next round we resume the game if it was paused
			gameStatus = true;
			mobCounter = Math.pow(round,2);
			
			if(round == 2)
				mobSpeed = 1;
			else if (round == 3)
				mobSpeed = 2;
			else if (round == 4)
				mobSpeed = 3;
			else if (round == 5)
				mobSpeed = 4;
			
		});		
	});
	
	
	function refreshNumberOfLifeLeft(){
			$('#life').text("life left : " + life);
	}
	
	function refreshNumberOfMobLeft(){
		$('#mobLeft').text("Enemies left : " + mobLeft);
	}