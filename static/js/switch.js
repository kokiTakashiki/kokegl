$(document).ready(function(){
	//onoff();

	$("#demo_stage").click(function(){
		$(this).toggleClass("act");
		onoff();
	});

	$(window).keydown(function (e) {
		if(e.keyCode=='39'){
			$("#demo_stage").addClass("act");
		}else if(e.keyCode=='37'){
			$("#demo_stage").removeClass("act");
		}
		onoff();
	});

    var outputHtml = '';
	function onoff(){
		if($("#demo_stage").hasClass("act")){
			// $("#demo_val").text('ON');
            // $("#demo_val").addClass("act");
            window.location.href = '/study_page/study202011/test045AR.html';
		}else{
			// $("#demo_val").text('OFF');
            // $("#demo_val").removeClass("act");
            window.location.href = '/study_page/study202011/test045.html';
		}
	}
});