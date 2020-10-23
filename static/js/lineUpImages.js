
//lineUpImages
$(function() {

	/*================================================================
	情報
	================================================================*/
	var allList = [
		{
			id: "study202010/test031Canvas",
			life: "23. October 2020",
			title: "test031",
			modalid: "kokegl31"
		},
		{
			id: "study202010/test030Canvas",
			life: "22. October 2020",
			title: "test030",
			modalid: "kokegl30"
		},
		{
			id: "study202010/test029Canvas",
			life: "21. October 2020",
			title: "test029",
			modalid: "kokegl29"
		},
		{
			id: "study202010/test028Canvas",
			life: "20. October 2020",
			title: "test028",
			modalid: "kokegl28"
		},
		{
			id: "study202010/test027Canvas",
			life: "19. October 2020",
			title: "test027",
			modalid: "kokegl27"
		},
		{
			id: "study202010/test026Canvas",
			life: "18. October 2020",
			title: "test026",
			modalid: "kokegl26"
		},
		{
			id: "study202010/test025Canvas",
			life: "17. October 2020",
			title: "test025",
			modalid: "kokegl25"
		},
		{
			id: "study202010/test024Canvas",
			life: "16. October 2020",
			title: "test024",
			modalid: "kokegl24"
		},
		{
			id: "study202010/test023Canvas",
			life: "15. October 2020",
			title: "test023",
			modalid: "kokegl23"
		},
		{
			id: "study202010/test022Canvas",
			life: "14. October 2020",
			title: "test022",
			modalid: "kokegl22"
		},
		{
			id: "study202010/test021Canvas",
			life: "13. October 2020",
			title: "test021",
			modalid: "kokegl21"
		},
		{
			id: "study202010/test020Canvas",
			life: "12. October 2020",
			title: "test020",
			modalid: "kokegl20"
		},
		{
			id: "study202010/test019Canvas",
			life: "11. October 2020",
			title: "test019",
			modalid: "kokegl19"
		},
		{
			id: "study202010/test018Canvas",
			life: "10. October 2020",
			title: "test018",
			modalid: "kokegl18"
		},
		{
			id: "study202010/test017Canvas",
			life: "9. October 2020",
			title: "test017",
			modalid: "kokegl17"
		},
		{
			id: "study202010/test016Canvas",
			life: "8. October 2020",
			title: "test016",
			modalid: "kokegl16"
		},
		{
			id: "study202010/test015Canvas",
			life: "7. October 2020",
			title: "test015",
			modalid: "kokegl15"
		},
		{
			id: "study202010/test014Canvas",
			life: "6. October 2020",
			title: "test014",
			modalid: "kokegl14"
		},
		{
			id: "study202010/test013Canvas",
			life: "5. October 2020",
			title: "test013",
			modalid: "kokegl13"
		},
		{
			id: "study202010/test012Canvas",
			life: "4. October 2020",
			title: "test012",
			modalid: "kokegl12"
		},
		{
			id: "study202010/test011Canvas",
			life: "3. October 2020",
			title: "test011",
			modalid: "kokegl11"
		},
		{
			id: "study202010/test010Canvas",
			life: "2. October 2020",
			title: "test010",
			modalid: "kokegl10"
		},
		{
			id: "study202010/test009Canvas",
			life: "1. October 2020",
			title: "test009",
			modalid: "kokegl9"
		},
		{
			id: "study202009/test008Canvas",
			life: "30. September 2020",
			title: "test008",
			modalid: "kokegl8"
		},
		{
			id: "study202009/test007Canvas",
			life: "29. September 2020",
			title: "test007",
			modalid: "kokegl7"
		},
		{
			id: "study202009/test006Canvas",
			life: "28. September 2020",
			title: "test006",
			modalid: "kokegl6"
		},
		{
			id: "study202009/test005Canvas",
			life: "27. September 2020",
			title: "test005",
			modalid: "kokegl5"
		},
		{
			id: "study202009/test004Canvas",
			life: "26. September 2020",
			title: "test004",
			modalid: "kokegl4"
		},
		{
			id: "study202009/test003Canvas",
			life: "25. September 2020",
			title: "test003",
			modalid: "kokegl3"
		},
		{
			id: "study202009/test002Canvas",
			life: "24. September 2020",
			title: "test002",
			modalid: "kokegl2"
		},
		{
			id: "study202009/test001Canvas",
			life: "24. September 2020",
			title: "test001",
			modalid: "kokegl1"
		},
	];

	/*================================================================
	スクリプトはじまり
	================================================================*/
	function init() {
		//最初は全て出力
		refleshHtml(allList);
	}

	/*================================================================
	HTML出力
	================================================================*/
	function refleshHtml(list) {

		var outputHtml = '';

		//出力する内容をoutputHtmlに格納
		if (list.length > 0) {
			_.each(list, function(line, i) {
				outputHtml += '<div class="product">';
				outputHtml += '		<a href="study_page_test/' + line.title + '.html"><span class="title">' + line.title + '</span><br>';
				outputHtml += '     </a><span class="studyday">' + line.life + '</span>';
				//画像
				outputHtml += '	<a href="study_page_test/' + line.title + '.html"><div class="photo"><img src="static/img/' + line.id + '.png" alt="' + line.title + '" width="100%" height="100%" /></div></a>';
				outputHtml += '<!--/.product--></div>';
			});
		} else {
			outputHtml += '<div class="noproduct"><p>条件に当てはまるwordを検索できませんでした。</p></div>';
		}

		//HTML出力（フェードインアニメーションつき）
		$('.productArea').html(outputHtml);
		$('.productArea .product').css({opacity: 0}).each(function(i){$(this).delay(100 * i).animate({opacity:1}, 0);
		});

	}


    /*================================================================
	デバック
	================================================================*/
    function DebugPrint(str)
	{
    	var out = document.getElementById("debug");
    	if (!out) return;
    	out.value += str;
	}


	/*================================================================
	スクリプトはじめ
	================================================================*/
	init();

});