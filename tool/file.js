(function() {
    
    var object = document.getElementById("selfile");
    //ダイアログでファイルが選択された時
    object.addEventListener("change",function(evt){
	var textfile = evt.target.files;
	//FileReaderの作成
	var reader = new FileReader();
	//テキスト形式で読み込む
	reader.readAsText(textfile[0]);
	//読込終了後の処理
	reader.onload = function(ev){
	    //テキストエリアに表示する
	    iL.value = reader.result;
	}
    },false);

    var object = document.getElementById("from_cpp_txtfile");
    //ダイアログでファイルが選択された時
    object.addEventListener("change",function(evt){
    	var textfile = evt.target.files;
    	//FileReaderの作成
    	var reader = new FileReader();
    	//テキスト形式で読み込む
    	reader.readAsText(textfile[0]);
    	//読込終了後の処理
    	reader.onload = function(ev){
    	    //テキストエリアに表示する
    	    from_cpp.value = reader.result;
    	}	
    },false);


    var print_img_id = 'print_img';
    var print_DataURL_id = 'print_DataURL';
    var canvas = document.getElementById('mycanvas');
    // var canvas2 = document.getElementById('clippingcanvas');
    
    if ( checkFileApi() && checkCanvas(canvas) ){
	//ファイル選択
	var file_image = document.getElementById('file-image');
	file_image.addEventListener('change', selectReadfile, false);
    }
    //canvas に対応しているか
    function checkCanvas(canvas){
	if (!canvas || !canvas.getContext){
	    return false;
	}
	return true;
    }
    // FileAPIに対応しているか
    function checkFileApi() {
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	    
	    // Great success! All the File APIs are supported.
	    return true;
	}
	alert('The File APIs are not fully supported in this browser.');
	return false;
    }
    //ファイルが選択されたら読み込む
    function selectReadfile(e) {
	var file = e.target.files;
	var reader = new FileReader();
	//dataURL形式でファイルを読み込む
	reader.readAsDataURL(file[0]);
	//ファイルの読込が終了した時の処理
	reader.onload = function(){
	    readDrawImg(reader, canvas, 0, 0);
	}
    }

    function readDrawImg(reader, canvas, x, y){
	var img = readImg(reader);
	drawImgOnCav(canvas, img, x, y);
    }
    //ファイルの読込が終了した時の処理
    function readImg(reader){
	//ファイル読み取り後の処理
	var result_dataURL = reader.result;
	var img = new Image();
	img.src = result_dataURL;
	return img;
    }
    //キャンバスにImageを表示
    function drawImgOnCav(canvas, img, x, y) {
	img.onload = function(){
	    var ctx = canvas.getContext('2d');
	    var wrapper= document.getElementById("print_img");
	    canvas.width = img.width;
	    canvas.height = img.height;
	    ctx.drawImage(img, x, y, img.width, img.height);
	    printWidthHeight( "width-height", img.width, img.height );
	    var input = document.querySelector('#file-image').files[0];
	    iL.value+='<?xml version="1.0" ?>'+'\n';
	    iL.value+='<Page id="1" filename="'+input.name+'" width="'+img.width+'" height="'+img.height+'">'+'\n';
	}
    }
    //width, height表示
    function printWidthHeight( width_height_id, width, height ) {
	var w = width;
	var h = height;
	document.getElementById(width_height_id).innerHTML = 'width:' + w + ' height:' + h;
    }


    // //画像のクリッピング
    // document.getElementById("select_point_button").onclick = function(){
    // 	var rect_info2 = document.getElementById("from_cpp").value;
    // 	var rect_info_lines2 = rect_info2.split('\n');
    // 	var point_info = document.getElementById("select_point").value;
    // 	alert(point_info);




    // }




    
})();
