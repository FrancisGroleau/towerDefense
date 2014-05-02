var activeTower = "";

	$(document).ready(function(){
		$('.towerIcon').on('click',function(){

			$('.towerIcon').each(function(){
				if($(this).hasClass('activeTower'))
					$(this).toggleClass('activeTower');
				
			});
				$(this).toggleClass('activeTower');
				activeTower = $(this).attr('id');
		});
	});