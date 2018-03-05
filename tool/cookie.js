// var str = new Array();
// var item = new Array();

//cookie保存関数
function saveCK3(exp3){
//関数名saveCK(保存期限)

    var str3 = new Array();
    var item3 = new Array();

    str3[0] = block_text_id.value;
    str3[1] = line_text_id.value;
    str3[2] = word_text_id.value;

    item3[0] = "ID";
   
    var stream3 = "";
    var i3 = 0;

    while(str3[i3]){
    	stream3+="%"+escape(str3[i3]);
    	i3++;
    }
    if(navigator.cookieEnabled){         //cookie使用可能の処理(日付データの作成)
	var kigen3 = new Date();   //日付をescape文字に変換,日付データをUTCに変換
	kigen3.setTime(kigen3.getTime()+exp3*24*60*60*1000);
	var goodtime3 = kigen3.toUTCString();
	var ckies3="";
	ckies3=item3[0]+"="+stream3+"; expires="+goodtime3;
	document.cookie=ckies3;
	alert(ckies3);
	alert(document.cookie);
	return true;
    }
    else{                //cookie使用不可ならfalseを返す
	return false;
    }
}

//cookie読み込み関数
function loadCK3(num3){
//関数loadCK(項目名,値)
    if(navigator.cookieEnabled){
	var sugar3 = document.cookie;
	var t3 = new Array();

	t3[0] = sugar3.split('%')[1];
	t3[1] = sugar3.split('%')[2];
	t3[2] = sugar3.split('%')[3];
	//alert(t2[0]);
	return t3[num3];	
    }
    else{
	return "0";
    }	
}

//cookie削除関数
function deleteCK3(num){
    if(navigator.cookieEnabled){
	var date = new Date();
	date.setTime(date.getTime()-1);
	// document.cookie=num+"=;expires="+date.toGMTString();
	//var clean = document.cookie;
	document.cookie="ID=; expires="+date.toUTCString();
	//alert(clean);
	return true;
    }
    else{
	return false;
    }
}
