
var common = {
	init: ()=>{
		var resizeTimer = null;
        var $body = $("body");
        
		common.resize();
		//common.start();

		/* window resize
		----------------------------- */
		var resizeCallback = function() {
			common.resize();
			resizeTimer = null;
		};

		$(window).off("resize").on("resize",function(){
			if(!$body.hasClass("resize")){
				$body.addClass("resize");
			}
			if(resizeTimer) {
				clearTimeout(resizeTimer);
			}
			resizeTimer = setTimeout(resizeCallback, 300);
		});
    },
    resize: ()=>{
		var ut = navigator.userAgent;
		// 角度を取得
		let angle = screen && screen.orientation && screen.orientation.angle;
		if ( angle === undefined ) {
		  angle = window.orientation;    // iOS用
		}
		console.log(ut);
		console.log(angle)

		var msg = {}

		if(ut.indexOf('iPhone') > 0 || ut.indexOf('iPod') > 0 || ut.indexOf('Android') > 0 && ut.indexOf('Mobile') > 0){
			msg.type = "SmartPhon";
			msg.mainFont = "48";
			msg.capFont = "50";
			msg.canvasSise = $(window).width()*0.8;
			if(angle == 90){
				msg.type = "SmartPhon";
				msg.mainFont = "19";
				msg.capFont = "26";
				msg.canvasSise = $(window).height()*0.65;
			}
		}else if(ut.indexOf('iPad') > 0 || ut.indexOf('Android') > 0){
			msg.type = "Tablet";
			msg.mainFont = "30";
			msg.capFont = "40";
			msg.canvasSise = $(window).width()*0.55;
			if(angle == 90){
				msg.type = "SmartPhon";
				msg.mainFont = "26";
				msg.capFont = "30";
				msg.canvasSise = $(window).height()*0.6;
			}
		}else{
			msg.type = "Personal Computer";
			msg.mainFont = "24";
			msg.capFont = "30";
			msg.canvasSise = 600;
		}

		console.log(msg)

		

		var winW = window.innerWidth;
		var winH = window.innerHeight;
		var $body = $("body");
		
		$(".main").css({
			"font-size": msg.mainFont + "px"
		});
		$(".caption").css({
			"font-size": msg.capFont + "px"
        });
        $(".mycanvas").css({
            "width": msg.canvasSise + "px",
			"height": msg.canvasSise + "px"
        });
        $(".imagebox").css({
            "width": msg.canvasSise + "px",
			"height": msg.canvasSise + "px"
		});
		
		setTimeout(function(){
			if($body.hasClass("resize")){
				$body.removeClass("resize");
			}
		},300);
    },
}
document.addEventListener('DOMContentLoaded', function () {
	isPage = $("body").attr("id");
	common.init();
});
window.addEventListener("orientationchange", ()=>{
	common.resize();
});