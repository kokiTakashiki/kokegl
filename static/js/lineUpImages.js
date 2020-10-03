$(function() {

	/*================================================================
	情報
	================================================================*/
	var allList = [
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

		//イベント登録
		//$(".filter_life select").on("change", onFilterChange);
		//$(".filter_tag input").on("change", onFilterChange);
		$(".filter_keyword button").on("click", onFilterChange);


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
				outputHtml += '		<a href="study_page/' + line.title + '.html"><span class="title">' + line.title + '</span></a><span class="studyday">' + line.life + '</span>';
				//画像
				outputHtml += '	<a href="study_page/' + line.title + '.html"><div class="photo"><img src="static/img/' + line.id + '.png" alt="' + line.title + '" width="100%" height="100%" /></div></a>';
				outputHtml += '<!--/.product--></div>';
			});
		} else {
			outputHtml += '<div class="noproduct"><p>条件に当てはまるwordを検索できませんでした。</p></div>';
		}

		//HTML出力（フェードインアニメーションつき）
		$('.productArea').html(outputHtml);
		$('.productArea .product').css({opacity: 0}).each(function(i){$(this).delay(100 * i).animate({opacity:1}, 300);
		});

		//検索件数表示
		//$('.productCntArea').html('<p>' + allList.length + '件中' + list.length + '件を表示しています。</p>');
	}

	/*================================================================
	絞り込み条件を変更した時
	================================================================*/
	function onFilterChange(e) {

		var filterFncs = [];
		var result = [];

		/*//セレクトボックスの値を引数に指定した関数filterByLifeをfilterFuncs配列に格納
		filterFncs.push(
			function(list) {
				return filterByLife(list, $('.filter_life select').val());
			}
		);

		//チェックボックスの値を引数に指定した関数filterByTagをfilterFuncs配列に格納
		filterFncs.push(
			function(list) {
				return filterByTag(list, $('.filter_tag input:checked'));
			}
		);*/

		//キーワードの値を引数に指定した関数filterByKeywordをfilterFuncs配列に格納
		filterFncs.push(
			function(list) {
				return filterByKeyword(list, _.escape($('.filter_keyword input').val()));
			}
		);

		//FilterFuncs配列内の関数をバケツリレーみたいに1つずつ実行して結果をresult配列に格納
		result = _.reduce(filterFncs, function(list, fnc) {
			return fnc(list);
		}, allList);

		//絞り込んだ結果を出力
		refleshHtml(result);
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
