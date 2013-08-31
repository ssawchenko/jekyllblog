$(function() {
	
	$(".monster_trigger").each(function() {
		$(this).mouseover(function() {
			debugger;
			if (!($(this).hasClass("active"))) {
				var monsterID = "monster_" + $(this).attr("id");
				$("#"+monsterID).removeClass("animate_monster_down").addClass("animate_monster_up");
			}
		});
		
		$(this).mouseout(function() {
			debugger;
			if (!($(this).hasClass("active"))) {
				var monsterID = "monster_" + $(this).attr("id");
				$("#"+monsterID).removeClass("animate_monster_up").addClass("animate_monster_down");
			}
		});	
	});
	
});