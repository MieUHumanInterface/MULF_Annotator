(function() {




   reset_timer(); 
    var timer;
    var timerID;
    var timerFlag = 0;	// 0:停止 1:動作

    // スタート(ストップ)ボタンのクリックイベント
    document.getElementById("btnStart").onclick = function(){
	if(timerFlag === 0){
	    start_count();
	}else{
	    stop_count();
	}
    });

    // リセットボタンのクリックイベント
   document.getElementById("btnReset").onclick = function(){
	reset_timer();
    });

    // リセット
    function reset_timer() {
	if(timerFlag === 1){
	    stop_count();
	}
	timer = 0; 
	counter.value = "00:00:00:00";
    }

    // スタート
    function start_count() { 					
	btnStart.value = "stop";
	timerFlag = 1;
	timerID = setInterval(count_up, 10); 
    }

    // ストップ
    function stop_count() { 					
	btnStart.value = "start";
	timerFlag = 0;
	clearInterval(timerID);
    }

    // 10ミリ秒単位でカウントアップする
    function count_up() {
	++timer;
	var formatTimer = counter_format(timer);
	counter.value = formatTimer;
    }

    // 時間の経過を時：分：秒：10ミリ秒で表す
    function counter_format(num) {
	var numZan = num;	// 残りの時間(10ミリ秒単位)
	// 時を計算：100で割って秒、60秒で割り分に、さらに60分で割り残りを切り捨てで時に
	var hh = Math.floor(numZan / (100 * 60 * 60));
	// numの残り：取得した時の部分を10ミリ秒単位にして除く、
	numZan = numZan - (hh * 100 * 60 * 60);
	// 分を計算：残り時間を100で割って秒、60秒で割り残りを切り捨てて分に
	var mm = Math.floor(numZan / (100 * 60));
	// numの残り：取得した分の部分を10ミリ秒単位にして除く、
	numZan = numZan -(mm * 100 * 60);
	// 秒を計算：残り時間を100で割り残りを切り捨てて秒に
	var ss = Math.floor(numZan / 100);
	// 最後の残りが10ミリ秒部分
	numZan = numZan - (ss * 100);
	var ms = numZan;
	
	// 見やすいように二桁表示に
	if(hh < 10){hh = "0" + hh;}
	if(mm < 10){mm = "0" + mm;}
	if(ss < 10){ss = "0" + ss;}
	if(ms < 10){ms = "0" + ms;}
	return hh + ":" + mm + ":" + ss + ":" + ms;
    }

})();
