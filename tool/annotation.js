function CanvasGetPositionFromClient(canvas,x,y){
    var d = canvas.ownerDocument;
    var w = d.defaultView;
    var r = canvas.getBoundingClientRect();
    var s = w.getComputedStyle(canvas,"");
    var px = parseFloat(s.paddingLeft);
    var py = parseFloat(s.paddingTop);
    var bx = parseFloat(s.borderLeftWidth);
    var by = parseFloat(s.borderTopWidth);
    var sx = canvas.width / parseFloat(s.width);
    var sy = canvas.height / parseFloat(s.height);
var ppp=0;
    return {
    x:(x - bx - px - r.left) * (sx),
    y:(y - by - py - r.top ) * (sy)
    };
}
var canvas = document.getElementById('mycanvas');
var context = canvas.getContext("2d");
var canvas2 = document.getElementById('clippingcanvas');
var context2 = canvas2.getContext('2d');
var ac=0;
var ac2=0; 
var t=0;// /blockが終わっているかどうか
var ac3=0;// underline 行をまたいだとき
var line_i=1;//block内に何行あるか
var line_t=1;
var timing=0;
var g=0;
var hiki=0;
var toro=0;
var idd=0;
var pp=0;
context.lineWidth = 2.0;
context.lineCap = "round";
context.lineJoin = "round";
context.setTransform(1 , 0 , 0 , 1 , 0 , 0);
  
  
var block_id = 1;
var line_id = 1;
var word_id = 1;
var word_id2=4;//行、段落、ページを飛ばした番号
(function() {    
    var mouse = {
        startX: 0,
        startY: 0,
        X: 0,
        Y: 0,
    is: false
    };
      
    var startx=0;
    var starty=0;
    var endx=0;
    var endy=0;
    var borderWidth = 0;
  
    var draw_flag = 0;
  
    var data_image;
    var data_image2;
    var data_image3;
    var data_image4;
    var data_image5;
    var data_image6;
    var cv_image1;
    var cv_image2;
    var cv_image3;
    var cv_image4;
    var id_number=3;//lineのためのカウント
    var id_Block=1; 
    var block_count = 2;
  
    var radio_check = 0;
    var box_check = 0;
    var line = new Array();
    // line[1] = new Array();
    // line[2] = new Array();
   //  line[3] = new Array();
    // line[4] = new Array();
    var KOU = -1;
    // document.getElementById("bar1").onclick = function(){
    //  radio_check = 1;
    // };
    // document.getElementById("bar2").onclick = function(){
    //  radio_check = -1;
    // };
  
    // document.form1.clip1.checked = function(){
    //  box_check = 1;
    // };
    // var check1 = document.form1.clip1.checked;
    // var check1 = document.getElementById("clip1");
  
    var save_counter = 6;
    var line_counter = 0;
    var block_counter = 0;
     var llll=0;
    var save_image1 = 0;
    var save_image2 = 0;
    var save_image3 = 0;
    var save_image4 = 0;
    var save_image5 = 0;
    var save_image6 = 0;
  
    var line_image = 0;
    var block_image = 0;
      
  
    var startTime;
    var timerId;
    var elapsedTime = 0;
    var isRunning = false;
    var startButton = document.getElementById("start");
    var stopButton = document.getElementById("stop");
    var resetButton = document.getElementById("reset");
    var timerText = document.getElementById("timerText");
      
    //タイマー関数
  
  function TimeGetTimeString(time){
  
    var milli_sec = time % 1000;
    time = (time - milli_sec) / 1000;
    var sec = time % 60;
    time = (time - sec) / 60;
    var min = time % 60;
    var hou = (time - min) / 60;
  
    // 文字列として連結
    return hou  + ":" +
        ((min < 10) ? "0" : "") + min + ":" +
        ((sec < 10) ? "0" : "") + sec + "." +
        ((milli_sec < 100) ? "0" : "") + ((milli_sec < 10) ? "0" : "") + milli_sec;
}
      
    function setButtonState(start,stop,reset){
    startButton.className = start ? 'btn active' : 'btn inactive';
    stopButton.className = stop ? 'btn active' : 'btn inactive';
    resetButton.className = reset ? 'btn active' : 'btn inactive';
    }
    setButtonState(true,false,false);
  
    startButton.addEventListener('click',function(){
    if(isRunning) return;
    isRunning = true;
    startTime = Date.now();
    updateTimerText();
    setButtonState(false,true,false);
    });
    stopButton.addEventListener('click',function(){
    if(!isRunning) return;
    isRunning = false;
    elapsedTime += Date.now() - startTime;
    clearTimeout(timerId);
    setButtonState(true,false,true);
    });
    resetButton.addEventListener('click',function(){
    if(isRunning) return;
    timerText.innerHTML = '0:00:00:000';
    elapsedTime = 0;
    setButtonState(true,false,false);
  
    });
    function updateTimerText(){
    timerId = setTimeout(function(){
        var t = Date.now() - startTime + elapsedTime;
        // timerText.innerHTML =  (t / 1000).toFixed(1);
        timerText.innerHTML = TimeGetTimeString(t);
        updateTimerText();
    },10);
    }
      
    //マウスがキャンパス上でクリックした場合
    canvas.onmousedown = function(e){
    draw_flag = 1;
    canvasOffsetX = canvas.offsetLeft;
    canvasOffsetY = canvas.offsetTop;
    // startx = e.pageX - canvasOffsetX;
    // starty = e.pageY - canvasOffsetY;
    startx = mouse.X;
    starty = mouse.Y;
          
    data_image = canvas.toDataURL("image/png");
        d_image=canvas.toDataURL("image/png");
    data_image = context.getImageData(0,0,canvas.width,canvas.height);
    data_image2 = data_image.data;
    data_image3 = data_image2.length/4;
          
    for(var i=0; i<data_image3; ++i){
        data_image2[i*4+0] = data_image2[i*4+0];
        data_image2[i*4+1] = data_image2[i*4+1];
        data_image2[i*4+2] = data_image2[i*4+2];
        data_image2[i*4+3] = 255;
    }
    data_image4 =(data_image,0,0);
  
    // function onRadioButtonChange(){
    //     radiobtn1 = document.getElementById("bar1");
    //     radiobtn2 = document.getElementById("bar2");
  
    //     target = document.getElementById("output");
  
    //     if (radiobtn1.checked == true){
    //  target.innerHTML = "要素1がチェックされています。<br/>";
    //     }
    //     else if (radiobtn2.checked == true){
    //  target.innerHTML = "要素2がチェックされています。<br/>";
    //     }
    // }
      
    };
  
    ////////////////////////////////////
    // if(Sample3_form.radio[0].checked){
    //  alert("yes");
    // }
    // if(Sample3_form.radio[1].checked){
    //  alert("no");
    // }
    ////////////////////////////////////
  
  
  
  
    // var rect_info1 = document.getElementById("from_cpp").value;
    // var rect_info_lines1 = rect_info1.split('\n');
  
    // var spliting1 = new Array();
    // var spliting2 = new Array();
    // var spliting3 = new Array();
    // var spliting4 = new Array();
    // var spliting5 = new Array();
  
    var ri1 = new Array();
    var ri2 = new Array();
    var ri3 = new Array();
    var ri4 = new Array();
    var ri5 = new Array();
    var ri6 = new Array();
    var ri7 = new Array();
  
    var delete_ri1 = new Array();
    var delete_ri2 = new Array();
    var delete_ri3 = new Array();
    var delete_ri4 = new Array();
    var delete_ri5 = new Array();
    var delete_ri6 = new Array();
    var delete_ri7 = new Array();
  
    var canvas_image = 0;
    var rect_image = 0;
  
    var Line_length = 0;
  
    document.getElementById("Save_Image").onclick = function(){
   // console.log(canvas);
    canvas_image = context.getImageData(0,0,canvas.width,canvas.height);
    };
    document.getElementById("Rect_Image").onclick = function(){
  //  console.log(canvas);
    rect_image = context.getImageData(0,0,canvas.width,canvas.height);
    };
  
      
    document.getElementById("drawing_rect").onclick = function(){
    //console.log(canvas);
    //data_image = context.putImageData(canvas_image,0,0);
    context.strokeStyle="purple";
    context.fillStyle = "purple";
      
    var rect_info = document.getElementById("from_cpp").value;
    var rect_info_lines = rect_info.split('\n');
    Line_length = rect_info_lines.length;
    //alert(rect_info_lines[0]);
    // alert(rect_info_lines.length);
  
    for(var i=0; i<rect_info.length-2; i++){
        
        ri1[i] = rect_info_lines[i].split(';')[0].split('=')[1];//num
        ri2[i] = rect_info_lines[i].split(';')[1].split('=')[1];//x

        ri3[i] = rect_info_lines[i].split(';')[2].split('=')[1];//y
        ri4[i] = rect_info_lines[i].split(';')[3].split('=')[1];//width
        ri5[i] = rect_info_lines[i].split(';')[4].split('=')[1];//height
        ri6[i] = Number(ri2[i]) + Number(ri4[i]);//x(end_point)
        ri7[i] = Number(ri3[i]) + Number(ri5[i]);//y(end_point)
        delete_ri1[i] = rect_info_lines[i].split(';')[0].split('=')[1];//num
        delete_ri2[i] = rect_info_lines[i].split(';')[1].split('=')[1];//x
        delete_ri3[i] = rect_info_lines[i].split(';')[2].split('=')[1];//y
        delete_ri4[i] = rect_info_lines[i].split(';')[3].split('=')[1];//width
        delete_ri5[i] = rect_info_lines[i].split(';')[4].split('=')[1];//height
        delete_ri6[i] = Number(delete_ri2[i]) + Number(delete_ri4[i]);//x(end_point)
        delete_ri7[i] = Number(delete_ri3[i]) + Number(delete_ri5[i]);//y(end_point)
        context.strokeRect(ri2[i],ri3[i],ri4[i],ri5[i]);
        context.fillText(ri1[i],ri2[i]-10,ri3[i]-3,20);
        //cv_image1 = context.getImageData(0,0,canvas.width,canvas.height);
           data_image5=context.getImageData(0,0,canvas.width,canvas.height);
      // if(i==20){break;}
    }
           
    cv_image1 = context.getImageData(0,0,canvas.width,canvas.height);
            
    // data_image = context.putImageData(rect_image,0,0);
    // rect_image = context.getImageData(0,0,canvas.width,canvas.height);
    // alert(canvas_image);
    // cv_image1 = canvas.toDataURL("cv_image/png");
    // cv_image1 = context.getImageData(0,0,canvas.width,canvas.height);
    // cv_image2 = cv_image1.data;
    // cv_image3 = cv_image2.length/4;
    // for(var i=0; i<cv_image3; ++i){
    //     cv_image2[i*4+0] = cv_image2[i*4+0];
    //     cv_image2[i*4+1] = cv_image2[i*4+1];
    //     cv_image2[i*4+2] = cv_image2[i*4+2];
    //     cv_image2[i*4+3] = 255;
    // }
    // cv_image4 = context.putImageData(cv_image1,0,0);
    // canvas.save();
    // cv_image1 = context.getImageData(0,0,canvas.width,canvas.height);
    // alert("dd");
      
    }
  
      
    document.getElementById("Delete").onclick = function(){
      
    // context.putImageData(cv_image1,0,0);
    // var delete_counter = document.getElementById("Sakujo").checked;
    // var all_delete_counter = document.getElementById("Zensakujo").checked;
    // var flag_delete_Line = document.getElementById("Inner_Line_Delete").checked;
    // var flag_delete_Block = document.getElementById("Inner_Block_Delete").checked;
    kakunin = confirm("描画した矩形を全て消します。\nよろしいですか？");
    // kakunin2 = confirm("XMLの記述も消しますか？");
      
    // if(delete_counter == true){
    //  if (flag_delete_Line == true){
  
    //  }else if (flag_delete_Block == true){
  
    //  }
    // }
    // else 
    // if(all_delete_counter == true){
    if(kakunin == true){
        // word_id = 1;
        //word_count = 0;
        // block_id = 1;
        // line_id = 1;
        // word_array[0] = 0;
        // word_array[1] = 0;
        // word_array[2] = 0;
        // word_array[3] = 0;
        // word_array[4] = 0;
          
        kakunin2 = confirm("XMLの記述も消しますか？");
        //context.putImageData(cv_image1,0,0);
        //data_image = context.putImageData(cv_image1,0,0);
        data_image = context.putImageData(rect_image,0,0);
        //data_image4 = context.putImageData(cv_image1,0,0);
        if(kakunin2 == true){
        iL.value = "";
        lc_position.value = "";
        }
        else{
        //context.putImageData(cv_image1,0,0);
        data_image = context.putImageData(rect_image,0,0);
        //data_image4 = context.putImageData(cv_image1,0,0);
        }
    }
    else{
        alert("全消去はしません。");
    }
    //}
      
    };
  
  
    document.getElementById("rewrite3_3").onclick = function(){
    //console.log(canvas);
    data_image = context.putImageData(canvas_image,0,0);
    context.strokeStyle="purple";
    context.fillStyle = "purple";
      
    var chara_rect_info = document.getElementById("chara_save").value;
    var chara_rect_info_lines = chara_rect_info.split('\n');
  
    var chara_saving_id = new Array();
    var chara_saving_width = new Array();
    var chara_saving_height = new Array();
    var chara_saving_x = new Array();
    var chara_saving_y = new Array();
  
    var delete_rect_width = document.getElementById("rewrite1_1").value;
    var delete_rect_height = document.getElementById("rewrite2_2").value;
    // alert(rect_info_lines.length);
    from_cpp.value = "";
      
    // alert("wwwwwwwwww");
    // for(var i=0; i<rect_info_lines.length; i++){
    //     delete_ri1[i] = rect_info_lines[i].split(';')[0].split('=')[1];//num
    //     delete_ri2[i] = rect_info_lines[i].split(';')[1].split('=')[1];//x
    //     delete_ri3[i] = rect_info_lines[i].split(';')[2].split('=')[1];//y
    //     delete_ri4[i] = rect_info_lines[i].split(';')[3].split('=')[1];//width
    //     delete_ri5[i] = rect_info_lines[i].split(';')[4].split('=')[1];//height
    //     delete_ri6[i] = Number(delete_ri2[i]) + Number(delete_ri4[i]);//x(end_point)
    //     delete_ri7[i] = Number(delete_ri3[i]) + Number(delete_ri5[i]);//y(end_point)
    //     context.strokeRect(delete_ri2[i],delete_ri3[i],delete_ri4[i],delete_ri5[i]);
    //     context.fillText(delete_ri1[i],delete_ri2[i]-10,delete_ri3[i]-3,20);
    // }alert("wwwwwwwwww");
    // alert("wwwwwwwwww");
    // from_cpp.value = "";
    //alert(Number(ri5[4]));
    for(var i=0; i<Line_length-1; i++){
        // if((delete_ri4[i] < delete_rect_width) || (delete_ri5[i] < delete_rect_height)){
        if(Number(ri4[i]) <= delete_rect_width){
         //|| (Number(delete_ri[5]) < delete_rect_height)
        //i++;
        //alert(delete_ri4[i]);
        //alert(i);
        }
        else if(Number(ri5[i]) <= delete_rect_height){
  
        }
        else{
        //alert(i);
        from_cpp.value += 'num=' + ri1[i] + '; x=' + ri2[i] + '; y=' + ri3[i] + '; width=' + ri4[i] + '; height=' + ri5[i] + ';';
        from_cpp.value += "\n";
        context.strokeRect(ri2[i],ri3[i],ri4[i],ri5[i]);
        context.fillText(ri1[i],ri2[i]-10,ri3[i]-3,20);
        }
          
        // context.strokeRect(delete_ri2[i],delete_ri3[i],delete_ri4[i],delete_ri5[i]);
        // context.fillText(delete_ri1[i],delete_ri2[i]-10,delete_ri3[i]-3,20);
    }
    for(var i=0; i<chara_rect_info_lines.length; i++){
        context.strokeStyle="green";
        //chara_saving_id[i] = chara_rect_info_lines[i].split(';')[0].split('=')[1];//id
        chara_saving_width[i] = chara_rect_info_lines[i].split(';')[1].split('=')[1];//width
        chara_saving_height[i] = chara_rect_info_lines[i].split(';')[2].split('=')[1];//height
        chara_saving_x[i] = chara_rect_info_lines[i].split(';')[3].split('=')[1];//x
        chara_saving_y[i] = chara_rect_info_lines[i].split(';')[4].split('=')[1];//y
        context.strokeRect(chara_saving_x[i],chara_saving_y[i],chara_saving_width[i],chara_saving_height[i]);
    }
  
  
      
    // alert(delete_rect_width);
    // cv_image1 = context.getImageData(0,0,canvas.width,canvas.height);
    // data_image = context.putImageData(canvas_image,0,0);
    };
  
    document.getElementById("rewrite4_4").onclick = function(){
      
    data_image = context.putImageData(canvas_image,0,0);
    context.strokeStyle="purple";
    context.fillStyle = "purple";
    from_cpp.value = "";
    for(var i=0; i<Line_length-1; i++){
        from_cpp.value += 'num=' + ri1[i] + '; x=' + ri2[i] + '; y=' + ri3[i] + '; width=' + ri4[i] + '; height=' + ri5[i] + ';';
        from_cpp.value += "\n";
        context.strokeRect(ri2[i],ri3[i],ri4[i],ri5[i]);
        context.fillText(ri1[i],ri2[i]-10,ri3[i]-3,20);
    }
      
  
    };
  
      
      
    var cut_x_please = 0;
    var cut_y_please = 0;
    var cut_width_please = 0;
    var cut_height_please = 0;
      
    document.getElementById("select_point_button").onclick = function(){
        var rect_info2 = document.getElementById("from_cpp").value;
        var rect_info_lines2 = rect_info2.split('\n');
        var point_info = document.getElementById("select_point").value;
    point_info = point_info-1;
        // alert(ri2[point_info]);
    canvas2.width = ri4[point_info] * 5;
    canvas2.height = ri5[point_info] * 5;
    context2.scale(5,5);
    context2.drawImage(canvas,ri2[point_info],ri3[point_info],ri4[point_info],ri5[point_info],0,0,ri4[point_info],ri5[point_info]);
    cut_x_please = ri2[point_info];
    cut_y_please = ri3[point_info];
    cut_width_please = ri4[point_info];
    cut_height_please = ri5[point_info];
    cuttext.value = "";
    }
  
    // document.addEventListener("Keydown",keyDownFunc);
    // document.addEventListener("Keyup",keyUpFunc);
  
    // var left_flag = false;
    // var up_flag = false;
    // var down_flag = false;
    // var right_flag = false;
      
    // function keyDownFunc(e){
    //  if(e.keyCode == 65) left_flag  = true; //a
    //  if(e.keyCode == 87) up_flag    = true; //w
    //  if(e.keyCode == 83) down_flag  = true; //s
    //  if(e.keyCode == 68) right_flag = true; //d
    // }
    // function keyUpFunc(e){
    //  if(e.keyCode == 65) left_flag  = false; //a
    //  if(e.keyCode == 87) up_flag    = false; //w
    //  if(e.keyCode == 83) down_flag  = false; //s
    //  if(e.keyCode == 68) right_flag = false; //d
    // }
    
  
    var linex1 = 0;
    var liney1 = 0;
    var linex2 = 0;
    var liney2 = 0;
  
    var check_button_1 = 0;
    var check_button_2 = 0;
  
    var cut_num = 0;
      
    document.getElementById("cut1").onclick = function(){
   // console.log(canvas2);
    context2.strokeStyle="purple";
    var startlineX = canvas2.width;
    var lastlineY = canvas2.height;
    context2.beginPath();
    context2.moveTo(10,0);
    context2.lineTo(10,lastlineY);
    context2.closePath();
    context2.stroke();
    linex1 = 10;
    liney1 = lastlineY;
    check_button_1 = 1;
    }
  
    document.getElementById("cut2").onclick = function(){
   // console.log(canvas2);
    context2.strokeStyle="purple";
    var startlineX = canvas2.width;
    var lastlineY = canvas2.height;
    context2.beginPath();
    context2.moveTo(0,10);
    context2.lineTo(startlineX,10);
    context2.closePath();
    context2.stroke();
    linex2 = startlineX;
    liney2 = 10;
    check_button_2 = 1;
    }
  
    // var spacekey_count = 0;
      
    document.onkeydown = keydown;
    function keydown(e){
        var rect_info3 = document.getElementById("from_cpp").value;
        var rect_info_lines3 = rect_info3.split('\n');
        var point_info3 = document.getElementById("select_point").value;
    cut_num = rect_info_lines3.length;
    point_info3 = point_info3-1;
        // alert(ri2[point_info]);
    canvas2.width = ri4[point_info3] * 5;
    canvas2.height = ri5[point_info3] * 5;
    context2.scale(5,5);
    context2.drawImage(canvas,ri2[point_info3],ri3[point_info3],ri4[point_info3],ri5[point_info3],0,0,ri4[point_info3],ri5[point_info3]);
  
    if(e.keyCode == 29){  //Press "Space" Key, and erase previous rectangle.
        // spacekey_count++;
        // if(spacekey_count >= 6){
        //  alert("これ以上は削除できません");
        // }
        // alert(save_counter);
        //console.log(canvas);
  
        if(line_counter == 1){
        save_counter = 6;
        save_image1 = 0;
        save_image2 = 0;
        save_image3 = 0;
        save_image4 = 0;
        save_image5 = 0;
        save_image6 = 0;
          
        alert("このLineの矩形は描画を確定したため修正できません");
        context.putImageData(line_image,0,0);
        data_image = context.putImageData(line_image,0,0);
        }
        if(block_counter == 1){
        save_counter = 6;
        save_image1 = 0;
        save_image2 = 0;
        save_image3 = 0;
        save_image4 = 0;
        save_image5 = 0;
        save_image6 = 0;
          
        alert("このBlockの矩形は描画を確定したため修正できません");
        context.putImageData(block_image,0,0);
        data_image = context.putImageData(block_image,0,0);
        }
          
        if(save_counter == 5){
        if(word_count == 1){
            context.putImageData(cv_image1,0,0);
            data_image = context.putImageData(cv_image1,0,0);
            word_array[0][word_count] = 0;
            word_array[1][word_count] = 0;
            word_array[2][word_count] = 0;
            word_array[3][word_count] = 0;
            word_array[4][word_count] = 0;
            word_count--;
            word_id--;
        }
        if(word_count == 0){
            context.putImageData(cv_image1,0,0);
            data_image = context.putImageData(cv_image1,0,0);
            word_array[0][word_count] = 0;
            word_array[1][word_count] = 0;
            word_array[2][word_count] = 0;
            word_array[3][word_count] = 0;
            word_array[4][word_count] = 0;
        }       
        if(line_counter == 2){
            context.putImageData(line_image,0,0);
            data_image = context.putImageData(line_image,0,0);
            line_counter--;
            word_array[0][word_count] = 0;
            word_array[1][word_count] = 0;
            word_array[2][word_count] = 0;
            word_array[3][word_count] = 0;
            word_array[4][word_count] = 0;
            word_count--;
            word_id--;
        }
        if(block_counter == 2){
            context.putImageData(block_image,0,0);
            data_image = context.putImageData(block_image,0,0);
            block_counter--;
            // word_array[0][word_count] = 0;
            // word_array[1][word_count] = 0;
            // word_array[2][word_count] = 0;
            // word_array[3][word_count] = 0;
            // word_array[4][word_count] = 0;
            // word_count--;
            // word_id--;
        }
          
        // else if(line_counter == 1){
        //     alert("qqq");
        //     context.putImageData(line_image,0,0);
        //     data_image = context.putImageData(line_image,0,0);
        //     alert("このLineの矩形は描画を確定したため修正できません");
        // }
        else{
            alert("これ以上は削除できません");
              
            // alert(word_count);
            // context.putImageData(save_image1,0,0);
            // data_image = context.putImageData(save_image1,0,0);
        }
        }
        else if(save_counter == 0){
        // if(line_counter == 2){
        //     context.putImageData(line_image,0,0);
        //     data_image = context.putImageData(line_image,0,0);
        //     alert("このLineの矩形は描画を確定したため修正できません");
        //     line_counter = 1;
        // }
        // else{
            context.putImageData(save_image2,0,0);
            data_image = context.putImageData(save_image2,0,0);
            save_counter++;
        word_array[0][word_count] = 0;
        word_array[1][word_count] = 0;
        word_array[2][word_count] = 0;
        word_array[3][word_count] = 0;
        word_array[4][word_count] = 0;
        word_count--;
        word_id--;
        line_counter--;
        block_counter--;
        //}
        }
        else if(save_counter == 1){
        // if(line_counter == 2){
        //     context.putImageData(line_image,0,0);
        //     data_image = context.putImageData(line_image,0,0);
        //     alert("このLineの矩形は描画を確定したため修正できません");
        //     line_counter = 1;
        // }
        // else{
            context.putImageData(save_image3,0,0);
            data_image = context.putImageData(save_image3,0,0);
            save_counter++;
        word_array[0][word_count] = 0;
        word_array[1][word_count] = 0;
        word_array[2][word_count] = 0;
        word_array[3][word_count] = 0;
        word_array[4][word_count] = 0;
        word_count--;
        word_id--;
        line_counter--;
        block_counter--;
        //}
        }
        else if(save_counter == 2){
        // if(line_counter == 2){
        //     context.putImageData(line_image,0,0);
        //     data_image = context.putImageData(line_image,0,0);
        //     alert("このLineの矩形は描画を確定したため修正できません");
        //     line_counter = 1;
        // }
        // else{
            context.putImageData(save_image4,0,0);
            data_image = context.putImageData(save_image4,0,0);
            save_counter++;
        word_array[0][word_count] = 0;
        word_array[1][word_count] = 0;
        word_array[2][word_count] = 0;
        word_array[3][word_count] = 0;
        word_array[4][word_count] = 0;
        word_count--;
        word_id--;
        line_counter--;
        block_counter--;
        //}
        }
        else if(save_counter == 3){
        // if(line_counter == 2){
        //     context.putImageData(line_image,0,0);
        //     data_image = context.putImageData(line_image,0,0);
        //     alert("このLineの矩形は描画を確定したため修正できません");
        //     line_counter = 1;
        // }
        // else{
            context.putImageData(save_image5,0,0);
            data_image = context.putImageData(data_image5,0,0);
            save_counter++;
        word_array[0][word_count] = 0;
        word_array[1][word_count] = 0;
        word_array[2][word_count] = 0;
        word_array[3][word_count] = 0;
        word_array[4][word_count] = 0;
        word_count--;
        word_id--;
        line_counter--;
        block_counter--;
        //}
        }
        else if(save_counter == 4){
        // if(line_counter == 2){
        //     context.putImageData(line_image,0,0);
        //     data_image = context.putImageData(line_image,0,0);
        //     alert("このLineの矩形は描画を確定したため修正できません");
        //     line_counter = 1;
        // }
        // else{
            context.putImageData(save_image6,0,0);
            data_image = context.putImageData(save_image6,0,0);
            save_counter++;
        word_array[0][word_count] = 0;
        word_array[1][word_count] = 0;
        word_array[2][word_count] = 0;
        word_array[3][word_count] = 0;
        word_array[4][word_count] = 0;
        word_count--;
        word_id--;
        line_counter--;
        block_counter--;
        //}
        }
    }
      
    if(e.keyCode == 65){  //Press "A" Key, and draw the "Left"(←).
        //console.log(canvas2);
        context2.strokeStyle="purple";
        linex1--;
        context2.beginPath();
        context2.moveTo(linex1,0);
        context2.lineTo(linex1,liney1);
        context2.closePath();
        context2.stroke();
          
        context2.beginPath();
        context2.moveTo(0,liney2);
        context2.lineTo(linex2,liney2);
        context2.closePath();
        context2.stroke();
  
    }
    if(e.keyCode == 83){  //Press "W" Key, and draw the "Up"(↑).
        //console.log(canvas2);
        context2.strokeStyle="purple";
        liney2++;
        context2.beginPath();
        context2.moveTo(0,liney2);
        context2.lineTo(linex2,liney2);
        context2.closePath();
        context2.stroke();
  
        context2.beginPath();
        context2.moveTo(linex1,0);
        context2.lineTo(linex1,liney1);
        context2.closePath();
        context2.stroke();
    }
    if(e.keyCode == 87){  //Press "S" Key, and draw the "Down"(↓).
        //console.log(canvas2);
        context2.strokeStyle="purple";
        liney2--;
        context2.beginPath();
        context2.moveTo(0,liney2);
        context2.lineTo(linex2,liney2);
        context2.closePath();
        context2.stroke();
  
        context2.beginPath();
        context2.moveTo(linex1,0);
        context2.lineTo(linex1,liney1);
        context2.closePath();
        context2.stroke();
    }
    if(e.keyCode == 68){  //Press "D" Key, and draw the "Right"(→).
        //console.log(canvas2);
        context2.strokeStyle="purple";
        linex1++;
        context2.beginPath();
        context2.moveTo(linex1,0);
        context2.lineTo(linex1,liney1);
        context2.closePath();
        context2.stroke();
  
        context2.beginPath();
        context2.moveTo(0,liney2);
        context2.lineTo(linex2,liney2);
        context2.closePath();
        context2.stroke();
    }
    }
  
  
    document.getElementById("cutfinish").onclick = function(){
    select_point.value = "";
    if((check_button_1 == 1)&&(check_button_2 == 1)){
        cuttext.value += 'num='+cut_num+'; x='+cut_x_please+'; y='+cut_y_please+'; width='+linex1+';height='+liney2+';' ;
        cuttext.value += '\n';
        cut_num++;
        cuttext.value += 'num='+cut_num+'; x='+cut_x_please+'; y='+(Number(cut_y_please)+Number(liney2))+'; width='+linex1+';height='+(Number(cut_height_please)-Number(liney2))+';' ;
        cuttext.value += '\n';
        cut_num++;
        cuttext.value += 'num='+cut_num+'; x='+(Number(cut_x_please)+Number(linex1))+'; y='+cut_y_please+'; width='+(Number(cut_width_please)-Number(linex1))+';height='+liney2+';' ;
        cuttext.value += '\n';
        cut_num++;
        cuttext.value += 'num='+cut_num+'; x='+(Number(cut_x_please)+Number(linex1))+'; y='+(Number(cut_y_please)+Number(liney2))+'; width='+(Number(cut_width_please)-Number(linex1))+';height='+(Number(cut_height_please)-Number(liney2))+';' ;
        cuttext.value += '\n';
        cut_num++;
  
        from_cpp.value += cuttext.value;        
    }
    else if(check_button_1 == 1){
        cuttext.value += 'num='+cut_num+'; x='+cut_x_please+'; y='+cut_y_please+'; width='+linex1+';height='+cut_height_please+';' ;
        cuttext.value += '\n';
        cut_num++;
        cuttext.value += 'num='+cut_num+'; x='+(Number(cut_x_please)+Number(linex1))+'; y='+cut_y_please+'; width='+(Number(cut_width_please)-Number(linex1))+';height='+cut_height_please+';' ;
        cuttext.value += '\n';
        cut_num++;
        from_cpp.value += cuttext.value;    
    }
    else if(check_button_2 == 1){
        cuttext.value += 'num='+cut_num+'; x='+cut_x_please+'; y='+cut_y_please+'; width='+cut_width_please+';height='+liney2+';' ;
        cuttext.value += '\n';
        cut_num++;
        cuttext.value += 'num='+cut_num+'; x='+cut_x_please+'; y='+(Number(cut_y_please)+Number(liney2))+'; width='+cut_width_please+';height='+(Number(cut_height_please)-Number(liney2))+';' ;
        cuttext.value += '\n';
        cut_num++;
        from_cpp.value += cuttext.value;    
    }
    }
    // for(var i=0; i<rect_info1.length; i++){
    //  spliting1[i] = rect_info_lines1[i].split(';')[0].split('=')[1];
    //  spliting2[i] = rect_info_lines1[i].split(';')[1].split('=')[1];
    //  spliting3[i] = rect_info_lines1[i].split(';')[2].split('=')[1];
    //  spliting4[i] = rect_info_lines1[i].split(';')[3].split('=')[1];
    //  spliting5[i] = rect_info_lines1[i].split(';')[4].split('=')[1];
    //  // context.strokeRect(ri2,ri3,ri4,ri5);
    //  // context.fillText(ri1,ri2-10,ri3-3,20);
    // }
  
  
  
    var flag_v = 0;
      
    //マウスがキャンパス上で移動した場合
    canvas.onmousemove = function(e){
    var rect = e.target.getBoundingClientRect();
    mouse.X = e.clientX - rect.left - borderWidth;
        mouse.Y = e.clientY - rect.top - borderWidth;
    document.getElementById("info").innerHTML =
          //  " canvas x座標 = " + Math.floor(mouse.X) + "px" +
           // " canvas y座標 = " + Math.floor(mouse.Y) + "px" + '<br>';
  
    // if(check1.checked == true){
  
    //     var rect_info1 = document.getElementById("from_cpp").value;
    //     var rect_info_lines1 = rect_info1.split('\n');
  
    //     var wri1 = new Array();
    //     var wri2 = new Array();
    //     var wri3 = new Array();
    //     var wri3 = new Array();
    //     var wri5 = new Array();
    //     var wri6 = new Array();
          
    //     for(var i=0; i<rect_info1.length; i++){
    //  wri1[i] = rect_info1_lines[i].split(';')[0].split('=')[1];
    //  wri2[i] = rect_info1_lines[i].split(';')[1].split('=')[1];
    //  wri3[i] = rect_info1_lines[i].split(';')[2].split('=')[1];
    //  wri4[i] = rect_info1_lines[i].split(';')[3].split('=')[1];
    //  wri5[i] = rect_info1_lines[i].split(';')[4].split('=')[1];
    //  wri6[i] = Number(wri2[i]) + Number(wri4[i]);
    //     }
    //     alert(rect_info_lines1.length);
    //     // alert(ri1[0]);
    //     // for(var j=0; j<rect_info1.length; j++){
    //     //   if(mouse.X == ri1[5]){
    //     //       alert(ri1[0]);
    //     //   }
    //     // }
  
    //     // for(var j=0; j<rect_info1.length; j++){
    //     //   if(ri2[j] <= mouse.X){
    //     //       flag_v = 1;
    //     //   }
    //     //   if(flag_v == 1){
    //     //       alert(ri6[j]);
    //     //   }
    //     // }
  
    //     while(flag_v == rect_info1.length){
    //  if(mouse.X == wri2[flag_v]){
    //      alert("king");
    //  }
    //  else{
    //      flag_v++;
    //  }
    //     }
  
  
  
          
    //     // if(mouse.X <= 100){
    //     //   alert("dcd");
    //     // }
    //     // for(var j=0; j<rect_info1.length; j++){
    //     //   if(mouse.X < spliting2[j]){
    //     //       alert("ipp");
    //     //   }
    //     // }
  
          
    //     // for(var j=0; j<rect_info.length; j++){
    //     //   // if(spliting2[j]<mouse.X && mouse.X<(spliting2[j]+spliting4[j]) && spliting3[j]<mouse.Y && mouse.Y<(spliting3[j]+spliting5[j])){
    //     //   // context.strokeRect(spliting2[j],spliting3[j],spliting4[j],spliting5[i]);
    //     //   if(spliting2[j] <= mouse.X){
    //     //       alert("kill");
    //     //   }
    //     // }
    // }
    // if(all_delete_check == 1){
    //     data_image4 = context.putImageData(cv_image1,0,0);
    // }
    // else{
        data_image4 = context.putImageData(data_image,0,0);
             
    // }
    // data_image4 = context.putImageData(cv_image1,0,0);
      
    if(draw_flag == 1){
        context.strokeRect(startx,starty,mouse.X-startx,mouse.Y-starty);
        // context.drawImage(data_image4,startx,starty,mouse.X-startx,mouse.Y-starty,startx,starty,mouse.X-startx,mouse.Y-starty);
        // if(all_delete_check == 1){
        //  context.drawImage(cv_image1,startx,starty,mouse.X-startx,mouse.Y-starty,startx,starty,mouse.X-startx,mouse.Y-starty);
        // }
        // else{
        context.drawImage(data_image4,startx,starty,mouse.X-startx,mouse.Y-starty,startx,starty,mouse.X-startx,mouse.Y-starty);
        // }
        // context.drawImage(cv_image1,startx,starty,mouse.X-startx,mouse.Y-starty,startx,starty,mouse.X-startx,mouse.Y-starty);
    }
  
  
      
      
    };
      
    var test_width = 0;
    var test_height = 0;
  
    var x1 = 0;
    var y1 = 0;
    var width1 = 0;
    var height1 = 0;
  
    //Character用配列
    var word_count = 0;
    
    var word_array = new Array();
    word_array[0] = new Array();
    word_array[1] = new Array();
    word_array[2] = new Array();
    word_array[3] = new Array();
    word_array[4] = new Array();
    word_array[5] = new Array();//線かどうか　0＝文字、　１＝線
    word_array[6] = new Array();// /underlineの位置 
    var button_count = 0;
    var next = 0;
    var next2 = 0;
    var exa = 1;
     
    //////////////////////////////////////////////////
    // if(Sample_form.radio[1].checked){
    // }
    // if(Sample_form.radio[2].checked){
    // }
    //////////////////////////////////////////////////
      
    //矩形描画
    function draw(i,j){
      
    context.strokeStyle="orange";
   context.lineWidth = 5;
    var rect_info0 = document.getElementById("from_cpp").value;
    var rect_info_lines0 = rect_info0.split('\n');
    //console.log(rect_info0);
    var ripp = new Array();
    ripp[0] = new Array();
    ripp[1] = new Array();
    ripp[2] = new Array();
    ripp[3] = new Array();
    ripp[4] = new Array();
  
    var ripp2 = new Array();
    ripp2[0] = new Array();
    ripp2[1] = new Array();
    ripp2[2] = new Array();
    ripp2[3] = new Array();
    ripp2[4] = new Array();
  
    var teh = 0;
    var teh1 = 0;
    var teh2 = 0;
    var teh3 = 0;
      
    for(var a=0; a<rect_info_lines0.length; a++){
        ripp[0][a] = rect_info_lines0[a].split(';')[0].split('=')[1]; //num
    }
    for(var b=0; b<(rect_info_lines0.length-1); b++){
        ripp[1][b] = rect_info_lines0[b].split(';')[1].split('=')[1]; //startx
    }
    for(var c=0; c<(rect_info_lines0.length-1); c++){
        ripp[2][c] = rect_info_lines0[c].split(';')[2].split('=')[1]; //starty
    }
    for(var d=0; d<(rect_info_lines0.length-1); d++){
        ripp[3][d] = Number(rect_info_lines0[d].split(';')[1].split('=')[1])+Number(rect_info_lines0[d].split(';')[3].split('=')[1]);                         //endx
    }
    for(var e=0; e<(rect_info_lines0.length-1); e++){
        ripp[4][e] = Number(rect_info_lines0[e].split(';')[2].split('=')[1])+Number(rect_info_lines0[e].split(';')[4].split('=')[1]);                         //endy
    }
   // console.log(ripp);
    for(var f=0; f<(rect_info0.length-1); f++){
        if(startx <= ripp[1][f] && ripp[1][f] <= i && starty <= ripp[2][f] && ripp[2][f] <= j){ //startx
            ripp2[1][teh] = ripp[1][f];
            teh++;
        }
    }
      
    for(var g=0; g<(rect_info0.length-1); g++){
        if(startx <= ripp[3][g] && ripp[3][g] <= i && starty <= ripp[2][g] && ripp[2][g] <= j){ //endx
            ripp2[2][teh1] = ripp[3][g];
            teh1++;
        }
    }
    for(var h=0; h<(rect_info0.length-1); h++){
        if(startx <= ripp[3][h] && ripp[3][h] <= i && starty <= ripp[2][h] && ripp[2][h] <= j){ //starty
            ripp2[3][teh2] = ripp[2][h];
            teh2++;
        }
    }
    for(var k=0; k<(rect_info0.length-1); k++){
        if(startx <= ripp[3][k] && ripp[3][k] <= i && starty <= ripp[4][k] && ripp[4][k] <= j){ //endy
            ripp2[4][teh3] = ripp[4][k];
            teh3++;
        }
    }
      
    ripp2[1].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
    });
    ripp2[2].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
    });
    ripp2[3].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
    });
    ripp2[4].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
    });
      
      
    var u1 = ripp2[1][0];
    var u2 = ripp2[2].reverse()[0];
    var u3 = ripp2[3][0];
    var u4 = ripp2[4].reverse()[0];
      
    var kakunin = ripp2[1].length;
    if(kakunin == 0){
        context.strokeRect(startx,starty,i-startx,j-starty);
        x1 = startx;
        y1 = starty;
        width1 = i-startx;
        height1 = Math.round(j-starty);
          
    }
    // else if(startx <= u1 <= i && startx <= u2 <= i && starty <= u3 <=j && starty <= u4 <= j){
    else if(startx <= u1 &&  u1<= i && startx <= u2 && u2 <= i && starty <= u3 && u3 <=j && starty <= u4 && u4 <= j){
        context.strokeRect(u1,u3,u2-u1,u4-u3);
        x1 = u1;
        y1 = u3;
        width1 = u2-u1;
        height1 = u4-u3;
    }
    }
  
  
  
      
    //マウスがキャンバス上でクリックして離された時の処理
    canvas.onmouseup = function(e){
    draw_flag = 0;
    // if(all_delete_check == 1){
    //     data_image4 = context.putImageData(cv_image1,0,0);
    // }
    // else{
        data_image4 = context.putImageData(data_image,0,0);
    // }
    // data_image4 = context.putImageData(data_image,0,0);
      
    endx = mouse.X;
    endy = mouse.Y;
    draw(endx,endy);
      
        KOU++;
        
         
    data_image = context.getImageData(0,0,canvas.width,canvas.height);
    data_image2 = data_image.data;
    data_image3 = data_image2.length/4;
    for(var i=0; i<data_image3; ++i){
        data_image2[i*4+0] = data_image2[i*4+0];
        data_image2[i*4+1] = data_image2[i*4+1];
        data_image2[i*4+2] = data_image2[i*4+2];
        data_image2[i*4+3] = 255;
    }
    data_image4 = context.putImageData(data_image,0,0);
      
    test_width = endx-startx;
    test_height = endy-starty;
    test_width = parseInt(test_width);
    test_height = parseInt(test_height);
  
    // if(check1.checked == true){
    //     alert("yes");
    // }
      
      
    context.fillStyle="green";
     if(g==1){
word_id2++;
g=0;
}
 console.log(word_id2)
if(idd==1){
idd=0;
word_id2++;
}
    //idの更新
    word_text_id.value="";
    word_text_id.value+=word_id2;
    context.fillText(word_id,x1-5,y1-3,80);
    word_array[0][word_count] = word_id2;
    word_array[1][word_count] = width1;
    word_array[2][word_count] = height1;
    word_array[3][word_count] = x1;
    word_array[4][word_count] = y1;
    word_array[5][word_count] = 0;  
    word_array[6][word_count] = 0;    
    chara_save.value += 'id=' + word_id2 + '; width=' + width1 + '; height=' + height1 + '; x=' + parseInt(x1) + '; y=' + parseInt(y1) + ';';
    chara_save.value += '\n';
    word_id2++;     
    word_id++;
    word_count++;
   // console.log(word_id2);
      
  
    //修正機能で使用するCanvasのImage保存場所
    if(save_counter == 6){
        save_image6 = data_image;
        save_counter--;
    }
    else if(save_counter == 5){
        save_image5 = data_image;
        save_counter--;
    }
    else if(save_counter == 4){
        save_image4 = data_image;
        save_counter--;
    }
    else if(save_counter == 3){
        save_image3 = data_image;
        save_counter--;
    }
    else if(save_counter == 2){
        save_image2 = data_image;
        save_counter--;
    }
    else if(save_counter == 1){
        save_image1 = data_image;
        save_counter--;
    }
    else if(save_counter == 0){
        save_image6 = save_image5;
        save_image5 = save_image4;
        save_image4 = save_image3;
        save_image3 = save_image2;
        save_image2 = save_image1;
        save_image1 = data_image;
        //save_counter++;
    }
    // line_counter++;
    // alert(line_counter);
    if(line_counter == 0){
        line_counter = 0;
    }
    else{
        line_counter++;
    }
  
    if(block_counter == 0){
        block_counter = 0;
    }
    else{
        block_counter++;
    }
      
    mouse.is = true;
    };

document.getElementById("btn1_click").onclick = function(){
num = document.form1.color1.selectedIndex;
if(num==0){
box();
}
else if(num==1){
straight();
}
else if(num==2){
double();
}
else if(num==3){
wave();
}
}

document.getElementById("btn2_click").onclick = function(){
num = document.form2.color2.selectedIndex;
if(num==1){
lead();
}
else if(num==2){
end_box();
}
else if(num==3){

end_line();
}
}

function straight(){
ac=word_count-1;
if(hiki==1){
toro=word_count;

}    

if(ac3==0){
word_array[0][ac]=word_id2-1;
}
else if(ac3>0){
word_array[0][ac]=ac3;
}

 
document.js.chara_save.value="";
 for(var i=0; i<ac; i++){
if(word_array[5][i]==0 && word_array[6][i]==1){
 
chara_save.value +='</underline>'+'\n';
}
else if(word_array[5][i]==0 && word_array[6][i]==5){
 
chara_save.value +='</box>'+'\n';
}
else if(word_array[5][i]==5 && word_array[6][i]!=1){
chara_save.value += 'box id=' +  word_array[0][i] + '; width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==3 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=double, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==2 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=wave, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==1 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=straight, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[6][i]!=1){
     chara_save.value += 'id=' +  word_array[0][i] + '; width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
}
} 
          
 chara_save.value += 'line id=' + word_array[0][ac]  + '; line_type=straight,width=' +  word_array[1][ac] + '; height=' +  word_array[2][ac] + '; x=' +   parseInt(word_array[3][ac]) + '; y=' +  parseInt(word_array[4][ac]) + ';'+'\n';
ac2++;
 

word_array[5][ac]=1;

if(timing==1){
timing==0;
word_array[6][ac]=2;
}
if(hiki==1){
word_id2=word_id2-1;
hiki=0;
}  
 
 
   
         }
function double(){
ac=word_count-1;
  if(hiki==1){
toro=word_count;

}   

if(ac3==0){
word_array[0][ac]=word_id2-1;
}
else if(ac3>0){
word_array[0][ac]=ac3;
}
 
 
document.js.chara_save.value="";
 for(var i=0; i<ac; i++){
if(word_array[5][i]==0 && word_array[6][i]==1){
 
chara_save.value +='</underline>'+'\n';
}
else if(word_array[5][i]==0 && word_array[6][i]==5){
 
chara_save.value +='</box>'+'\n';
}
else if(word_array[5][i]==5 && word_array[6][i]!=1){
chara_save.value += 'box id=' +  word_array[0][i] + '; width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==3 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=double, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==2 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=wave, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==1 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=straight, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[6][i]!=1){
     chara_save.value += 'id=' +  word_array[0][i] + '; width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
}
} 
          
 chara_save.value += 'line id=' +  word_array[0][ac] + '; line_type=double,width=' +  word_array[1][ac] + '; height=' +  word_array[2][ac] + '; x=' +   parseInt(word_array[3][ac]) + '; y=' +  parseInt(word_array[4][ac]) + ';'+'\n';
ac2++;
 

word_array[5][ac]=3;
if(timing==1){
timing==0;
word_array[6][ac]=2;
 
 } 
 if(hiki==1){
word_id2=word_id2-1;
hiki=0;
}  
   
         }
 
function wave(){
ac=word_count-1;
  if(hiki==1){
toro=word_count;

}   

if(ac3==0){
word_array[0][ac]=word_id2-1;
}
else if(ac3>0){
word_array[0][ac]=ac3;
}
 
 
document.js.chara_save.value="";
 for(var i=0; i<ac; i++){
if(word_array[5][i]==0 && word_array[6][i]==1){
 
chara_save.value +='</underline>'+'\n';
}
else if( word_array[6][i]==5){
 
chara_save.value +='</box>'+'\n';
}
else if(word_array[5][i]==5 && word_array[6][i]!=1){
chara_save.value += 'box id=' +  word_array[0][i] + '; width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==3 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=double, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==2 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=wave, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==1 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=straight, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[6][i]!=1){
     chara_save.value += 'id=' +  word_array[0][i] + '; width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
}
} 
          
 chara_save.value += 'line id=' +  word_array[0][ac] + '; line_type=wave,width=' +  word_array[1][ac] + '; height=' +  word_array[2][ac] + '; x=' +   parseInt(word_array[3][ac]) + '; y=' +  parseInt(word_array[4][ac]) + ';'+'\n';
ac2++;
 

word_array[5][ac]=2;
if(timing==1){
timing==0;
word_array[6][ac]=2;
 
 } 
 if(hiki==1){
word_id2=word_id2-1;
hiki=0;
}  
  
 
  }

function end_line(){
word_array[0][word_count]=0;
word_array[1][word_count]=0;
word_array[2][word_count]=0;
word_array[3][word_count]=0;
word_array[4][word_count]=0;
word_array[5][word_count]=0;
word_array[6][word_count]=1;
chara_save.value +='</underline>'+'\n';
KOU++;
word_count++;
} 

function end_box(){
word_array[0][word_count]=0;
word_array[1][word_count]=0;
word_array[2][word_count]=0;
word_array[3][word_count]=0;
word_array[4][word_count]=0;
word_array[5][word_count]=0;
word_array[6][word_count]=5;
chara_save.value +='</box>'+'\n';
KOU++;
word_count++;
} 
function lead(){//id引き継ぎ
 
for(var h=word_count-1;h>0;h--){
if(word_array[5][h]==1){
ac3=word_array[0][h];
break;
}
else if(word_array[5][h]==2){
ac3=word_array[0][h];
break;
} 
else if(word_array[5][h]==3){
ac3=word_array[0][h];
break;
}
else if(word_array[5][h]==5){
ac3=word_array[0][h];
break;
}
hiki=1;
}
word_array[0][word_count]=ac3;
timing=1;

}
function box(){
ac=word_count-1;
if(hiki==1){
toro=word_count;

}    

if(ac3==0){
word_array[0][ac]=word_id2-1;
}
else if(ac3>0){
word_array[0][ac]=ac3;
}

 
document.js.chara_save.value="";
 for(var i=0; i<ac; i++){
if(word_array[5][i]==0 && word_array[6][i]==1){
 
chara_save.value +='</underline>'+'\n';
}
else if(word_array[6][i]==5){
 
chara_save.value +='</box>'+'\n';
}
else if(word_array[5][i]==5 && word_array[6][i]!=1){
chara_save.value += 'box id=' +  word_array[0][i] + '; width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==3 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=double, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==2 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=wave, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[5][i]==1 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=straight, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
 
}
else if(word_array[6][i]!=1){
     chara_save.value += 'id=' +  word_array[0][i] + '; width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
}
} 
          
 chara_save.value += 'box id=' + word_array[0][ac]  + ';width=' +  word_array[1][ac] + '; height=' +  word_array[2][ac] + '; x=' +   parseInt(word_array[3][ac]) + '; y=' +  parseInt(word_array[4][ac]) + ';'+'\n';
ac2++;
 

word_array[5][ac]=5;

if(timing==1){
timing==0;
word_array[6][ac]=2;
}
if(hiki==1){
word_id2=word_id2-1;
hiki=0;
}  
 
 
   
         }


  document.getElementById("undo").onclick = function(){
var keyCode = false;
var o =0; 
   
if(word_array[5][KOU]==0){
o=1;
}
            if(KOU>0){
         context.clearRect(0,0,canvas.width,canvas.height);
             
         word_array[0].pop();
         word_array[1].pop();
         word_array[2].pop();
         word_array[3].pop();
         word_array[4].pop();  
         word_array[5].pop(); 
         word_array[6].pop();
      data_image4 = context.putImageData(data_image5,0,0);
       
       document.js.chara_save.value="";
           
         
     for(var i=0; i<=KOU; i++){
            context.strokeRect(word_array[3][i],word_array[4][i],word_array[1][i],word_array[2][i]); 
         } 
          
           
KOU--;
word_id--;
word_count--;
if(o==1){
word_id2=word_id2-1;
}

context.strokeStyle="blue";
    context.fillStyle="blue";
//context.strokeRect(line[0][1],line[0][2],line[0][3],line[0][4]);
//console.log(line)

    for(var i=0; i<=KOU; i++){
if(word_array[6][i]==1){
  
chara_save.value +='</underline>'+'\n';
}
else if(word_array[6][i]==5){
  
chara_save.value +='</box>'+'\n';
}
else if(word_array[5][i]==5 && word_array[6][i]!=1){
chara_save.value += 'box id=' +  word_array[0][i] + '; width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
  
}
else if(word_array[5][i]==3 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=double, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
  
}
else if(word_array[5][i]==2 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=wave, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
  
}
else if(word_array[5][i]==1 && word_array[6][i]!=1){
chara_save.value += 'line id=' +  word_array[0][i] + '; line_type=straight, width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
  
}
    else if(word_array[6][i]!=1){
     chara_save.value += 'id=' +  word_array[0][i] + '; width=' +  word_array[1][i] + '; height=' +  word_array[2][i] + '; x=' +   parseInt(word_array[3][i]) + '; y=' +  parseInt(word_array[4][i]) + ';';
    chara_save.value += '\n';
}
  
} 
}
 data_image = canvas.toDataURL("image/png");
   
              }
  //ここｋ         
    var top = 1;
    line_id = 1;
    document.getElementById("text01").onclick = function(){
    var context1 = document.getElementById("button01").value;
    var l=0;//l=0　/underline出ない　l=1 /underline出る
    context.strokeStyle="blue";
    context.fillStyle="blue";
    var line_rect1 = new Array();
    line_rect1[0] = new Array();
    line_rect1[1] = new Array();
    line_rect1[2] = new Array();
    line_rect1[3] = new Array();
    line_rect1[4] = new Array();
     
    if(button_count == 0){
        for(var i=0; i<word_count; i++){
        //line_rect1[0][i] = word_array[0][i]; //id
        line_rect1[1][i] = word_array[3][i]; //startx
        line_rect1[2][i] = word_array[4][i]; //starty
        line_rect1[3][i] = Number(word_array[1][i])+Number(word_array[3][i]); //endx
        line_rect1[4][i] = Number(word_array[2][i])+Number(word_array[4][i]); //endy
        }
          
  
        line_rect1[1].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        line_rect1[2].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        line_rect1[3].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        line_rect1[4].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
  
        var llr1 = line_rect1[1][0];
        var llr2 = line_rect1[2][0];
        var llr3 = line_rect1[3].reverse()[0];
        var llr4 = line_rect1[4].reverse()[0];
        // alert(llr1);
        context.strokeRect(llr1,llr2,llr3-llr1,llr4-llr2);
        //line[p][1]=llr1;
        //line[p][2]=llr2;
        //line[p][3]=llr3-llr1;
        //line[p][4]=llr4-llr2;
        //line_rect1[0][top] = 1;
        context.fillText(line_rect1[0][top],llr1-5,llr2-3,80);
        lc_position.value+='<Line id="'+ 3 +'" width="'+(llr3-llr1)+'" height="'+(llr4-llr2)+'" xoffset="'+llr1+'" yoffset="'+llr2+'">'+'\n';
        top++;
        id_number++;
  
  
        data_image = context.getImageData(0,0,canvas.width,canvas.height);
        data_image2 = data_image.data;
        data_image3 = data_image2.length/4;
        for(var i=0; i<data_image3; ++i){
        data_image2[i*4+0] = data_image2[i*4+0];
        data_image2[i*4+1] = data_image2[i*4+1];
        data_image2[i*4+2] = data_image2[i*4+2];
        data_image2[i*4+3] = 255;
        }
        data_image = context.putImageData(data_image,0,0);
           
          
  
  
        var i2=0;
        
        for(var i=0; i<word_count; i++){
        var context1 = document.getElementById("button01").value;
         
        var c = context1.charAt(i2);
         //console.log(word_array);
if(word_array[5][i]==0 && word_array[6][i]==1){
         
        lc_position.value+='</underline>'+'\n';
        l=0;
         
        }  
else if(word_array[5][i]==0 && word_array[6][i]==5){
         
        lc_position.value+='</box>'+'\n';
        l=0;
         
        }  
 
else if(word_array[5][i]==5 && word_array[6][i]!=1){
 
lc_position.value+='<box id="'+word_array[0][i]+'" width="'+word_array[1][i]+'" height="'+word_array[2][i]+'" xoffset="'+word_array[3][i]+'" yoffset="'+word_array[4][i]+'">'+'\n';
 l=2;      
 
  
button_count++;
}
  
 
else if(word_array[5][i]==3 && word_array[6][i]!=1){
 
lc_position.value+='<underline id="'+word_array[0][i]+'" line_type="double" width="'+word_array[1][i]+'" height="'+word_array[2][i]+'" xoffset="'+word_array[3][i]+'" yoffset="'+word_array[4][i]+'">'+'\n';
 l=1;      
 
  
button_count++;
}
 
else if(word_array[5][i]==1 && word_array[6][i]!=1){
 
 
lc_position.value+='<underline id="'+word_array[0][i]+'" line_type="straight" width="'+word_array[1][i]+'" height="'+word_array[2][i]+'" xoffset="'+word_array[3][i]+'" yoffset="'+word_array[4][i]+'">'+'\n';
        
l=1;
   
button_count++;
 
}
else if(word_array[5][i]==2 && word_array[6][i]!=1){
 
lc_position.value+='<underline id="'+word_array[0][i]+'" line_type="wave" width="'+word_array[1][i]+'" height="'+word_array[2][i]+'" xoffset="'+word_array[3][i]+'" yoffset="'+word_array[4][i]+'">'+'\n';
        
l=1;
  
button_count++;
}
else if (word_array[6][i]!=1){
 
        lc_position.value+='<Character id="'+ word_array[0][i] +'" width="'+word_array[1][i]+'" height="'+word_array[2][i]+'" xoffset="'+word_array[3][i]+'" yoffset="'+word_array[4][i]+'">'+'\n';
        lc_position.value+=c+'\n';
        lc_position.value+='</Character>'+'\n';
        button_count++;
id_number++;
i2++;
 
}
  
        }
  
        if(l==1){
lc_position.value+='</underline>'+'\n';
l=0;
 
}
if(l==2){
lc_position.value+='</box>'+'\n';
l=0;
 
}
        lc_position.value+='</Line>'+'\n';
         
        next = i;
g++;
        line_text_id.value="";
        line_text_id.value+=line_id;
        line_id++;

llll=word_id2;

//word_id2++;
 console.log(llll); 
console.log("id_block",id_Block);
        
console.log("llll",llll);
       
console.log("word_id2",word_id2);  

    }
      
    else if(button_count > 0){
         id_number++;
        line_rect1[5] = new Array();
        line_rect1[6] = new Array();
        line_rect1[7] = new Array();
        line_rect1[8] = new Array();
        var tp = 0
         
        for(var j=next; j<word_count; j++){
            //line_rect1[0][i] = word_array[0][i]; //id
            line_rect1[5][tp] = word_array[3][j]; //startx
            line_rect1[6][tp] = word_array[4][j]; //starty
            line_rect1[7][tp] = Number(word_array[1][j])+Number(word_array[3][j]); //endx
            line_rect1[8][tp] = Number(word_array[2][j])+Number(word_array[4][j]); //endy
        tp++;
        }
          
        line_rect1[5].sort(function(a,b){
            return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        line_rect1[6].sort(function(a,b){
            return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        line_rect1[7].sort(function(a,b){
            return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        line_rect1[8].sort(function(a,b){
            return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
          
          
        llr1 = line_rect1[5][0];
        llr2 = line_rect1[6][0];
        llr3 = line_rect1[7].reverse()[0];
        llr4 = line_rect1[8].reverse()[0];
  
        context.strokeRect(llr1,llr2,llr3-llr1,llr4-llr2);
          
        line_rect1[0][top] = top;
        context.fillText(line_rect1[0][top],llr1-5,llr2-3,80);
    // console.log(llll);
        lc_position.value+='<Line id="'+ llll  +'" width="'+(llr3-llr1)+'" height="'+(llr4-llr2)+'" xoffset="'+llr1+'" yoffset="'+llr2+'">'+'\n';
        top++;
        exa++;
        id_number=id_number+1;
//ここから
        data_image = context.getImageData(0,0,canvas.width,canvas.height);
        data_image2 = data_image.data;
        data_image3 = data_image2.length/4;
        for(var i=0; i<data_image3; ++i){
        data_image2[i*4+0] = data_image2[i*4+0];
        data_image2[i*4+1] = data_image2[i*4+1];
        data_image2[i*4+2] = data_image2[i*4+2];
        data_image2[i*4+3] = 255;
        }
        data_image4 = context.putImageData(data_image,0,0);
        var x = 0
 
        for(var j=next; j<word_count; j++){
        var c = context1.charAt(x);
if(word_array[5][i]==0 && word_array[6][i]==1){
         
        lc_position.value+='</underline>'+'\n';
        l=0;
         
        } 
 
else if(word_array[5][i]==0 && word_array[6][i]==5){
         
        lc_position.value+='</box>'+'\n';
        l=0;
         
        } 
else if(word_array[5][j]==3 && word_array[6][j]!=1){
lc_position.value+='<underline id="'+word_array[0][j]+'" line_type="double" width="'+word_array[1][j]+'" height="'+word_array[2][j]+'" xoffset="'+word_array[3][j]+'" yoffset="'+word_array[4][j]+'">'+'\n';
  l=1;   
 id_number++;   
button_count++;
ac3=0;
 
}
else if(word_array[5][j]==5 && word_array[6][j]!=1){
 
lc_position.value+='<box id="'+word_array[0][j]+'" width="'+word_array[1][j]+'" height="'+word_array[2][j]+'" xoffset="'+word_array[3][j]+'" yoffset="'+word_array[4][j]+'">'+'\n';
 l=2;      
id_number++;   
button_count++;
ac3=0;
  
 
}
 
 
else if(word_array[5][j]==1 && word_array[6][j]!=1){
/*if(ac3==0){
word_array[0][j]=word_array[0][j]+4+line_i;
}
 
if(word_array[6][j]==2){
 
id_number--;
 
}*/
lc_position.value+='<underline id="'+word_array[0][j]+'" line_type="straight" width="'+word_array[1][j]+'" height="'+word_array[2][j]+'" xoffset="'+word_array[3][j]+'" yoffset="'+word_array[4][j]+'">'+'\n';
  l=1;   
 id_number++;   
button_count++;
ac3=0;
}
else if(word_array[5][j]==2 && word_array[6][j]!=1){
lc_position.value+='<underline id="'+word_array[0][j]+'" line_type="wave" width="'+word_array[1][j]+'" height="'+word_array[2][j]+'" xoffset="'+word_array[3][j]+'" yoffset="'+word_array[4][j]+'">'+'\n';
  l=1;   
 id_number++;   
button_count++;
ac3=0;
}
else if (word_array[6][j]!=1 && word_array[6][j]!=5){
 
        lc_position.value+='<Character id="'+ word_array[0][j] +'" width="'+word_array[1][j]+'" height="'+word_array[2][j]+'" xoffset="'+word_array[3][j]+'" yoffset="'+word_array[4][j]+'">'+'\n';
        lc_position.value+=c+'\n';
        lc_position.value+='</Character>'+'\n';
        button_count++;
id_number++;
 x++;
}
else if(word_array[6][j]==1){
        lc_position.value+='</underline>'+'\n';
        l=0;
        }
else if(word_array[6][j]==5){
        lc_position.value+='</box>'+'\n';
        l=0;
        }       
         
        }
 
if(l==1){
lc_position.value+='</underline>'+'\n';
l=0;
}
 if(l==2){
lc_position.value+='</box>'+'\n';
l=0;
}
        lc_position.value+='</Line>'+'\n';
        next = j;
        //exa++;
line_i++;
        line_text_id.value="";
        line_text_id.value+=line_id;
        line_id++;
llll=word_id2;
word_id2++;
console.log("id_block",id_Block);
        
console.log("llll",llll);
       
console.log("word_id2",word_id2);
    }

 
    line_counter = 1;
    line_image = data_image;
    button01.value="";
     
//word_id2++ ;
 
    };
  
    var block_button_count = 0;
    block_id = 1;
  
      
    document.getElementById("Block_Event").onclick = function(){
    //console.log(canvas);
    context.strokeStyle="red";
    context.fillStyle="red";
      
    var block_rect1 = new Array();
    block_rect1[0] = new Array();
    block_rect1[1] = new Array();
    block_rect1[2] = new Array();
    block_rect1[3] = new Array();
    block_rect1[4] = new Array();
   line_i=1;
    if(block_button_count == 0){
        for(var i=0; i<word_count; i++){
        //line_rect1[0][i] = word_array[0][i]; //id
        block_rect1[1][i] = word_array[3][i]; //startx
        block_rect1[2][i] = word_array[4][i]; //starty
        block_rect1[3][i] = Number(word_array[1][i])+Number(word_array[3][i]); //endx
        block_rect1[4][i] = Number(word_array[2][i])+Number(word_array[4][i]); //endy
        }
        next2 = i;
        block_rect1[1].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        block_rect1[2].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        block_rect1[3].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        block_rect1[4].sort(function(a,b){
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
  
        var blr1 = block_rect1[1][0];
        var blr2 = block_rect1[2][0];
        var blr3 = block_rect1[3].reverse()[0];
        var blr4 = block_rect1[4].reverse()[0];
  
        context.strokeRect(blr1,blr2,blr3-blr1,blr4-blr2);
  
        iL.value+='<Block id="'+ 2 +'" width="'+(blr3-blr1)+'" height="'+(blr4-blr2)+'" xoffset="'+blr1+'" yoffset="'+blr2+'">'+'\n';
  
        iL.value+=lc_position.value;
        lc_position.value = '';
  
        iL.value+='</Block>'+'\n';
         t=1;
        data_image = context.getImageData(0,0,canvas.width,canvas.height);
        data_image2 = data_image.data;
        data_image3 = data_image2.length/4;
        for(var i=0; i<data_image3; ++i){
        data_image2[i*4+0] = data_image2[i*4+0];
        data_image2[i*4+1] = data_image2[i*4+1];
        data_image2[i*4+2] = data_image2[i*4+2];
        data_image2[i*4+3] = 255;
        }
        data_image4 = context.putImageData(data_image,0,0);
  
        block_button_count++;
  
        block_text_id.value="";
        block_text_id.value+=block_id;
        block_id++;
         
        id_Block=llll;
console.log("id_block",id_Block);
        llll++;
console.log("llll",llll);
        //word_id2++;
console.log("word_id2",word_id2);  
      idd++;
        id_number++;
    }
    else if(block_button_count > 0){
          
        block_rect1[5] = new Array();
        block_rect1[6] = new Array();
        block_rect1[7] = new Array();
        block_rect1[8] = new Array();
        var up = 0;
         
        for(var j=next2; j<word_count; j++){
      
        //line_rect1[0][i] = word_array[0][i]; //id
        block_rect1[5][up] = word_array[3][j]; //startx
        block_rect1[6][up] = word_array[4][j]; //starty
        block_rect1[7][up] = Number(word_array[1][j])+Number(word_array[3][j]); //endx
        block_rect1[8][up] = Number(word_array[2][j])+Number(word_array[4][j]); //endy
        up++;
        }
  
        block_rect1[5].sort(function(a,b){
            return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        block_rect1[6].sort(function(a,b){
            return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        block_rect1[7].sort(function(a,b){
            return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
        block_rect1[8].sort(function(a,b){
            return (parseInt(a) > parseInt(b)) ? 1 : -1;
        });
  
        var blr5 = block_rect1[5][0];
        var blr6 = block_rect1[6][0];
        var blr7 = block_rect1[7].reverse()[0];
        var blr8 = block_rect1[8].reverse()[0];
  
        context.strokeRect(blr5,blr6,blr7-blr5,blr8-blr6);
 
        iL.value+='<Block id="'+ id_Block +'" width="'+(blr7-blr5)+'" height="'+(blr8-blr6)+'" xoffset="'+blr5+'" yoffset="'+blr6+'">'+'\n';
  
        iL.value+=lc_position.value;
        lc_position.value = '';
  
        iL.value+='</Block>'+'\n';
        t=1;
        id_Block=llll;
console.log("id_block", id_Block);
       llll++;
console.log("llll", llll);
        word_id2++ ;
        console.log("word_id2",word_id2);
   
        data_image = context.getImageData(0,0,canvas.width,canvas.height);
        data_image2 = data_image.data;
        data_image3 = data_image2.length/4;
        for(var i=0; i<data_image3; ++i){
        data_image2[i*4+0] = data_image2[i*4+0];
        data_image2[i*4+1] = data_image2[i*4+1];
        data_image2[i*4+2] = data_image2[i*4+2];
        data_image2[i*4+3] = 255;
        }
        data_image4 = context.putImageData(data_image,0,0);
  
        block_button_count++;
        next2 = j;
          
        block_text_id.value="";
        block_text_id.value+=block_id;
        block_id++;
    }
    block_counter = 1;
    block_image = data_image;
      
    };
  
    document.getElementById("out01").onclick = function(){
    iL.value+='</Page>'+'\n';
    };
      
    function tracker(){
    if(document.all){
        var out = document.getElementById("iL");
        if (mouse.is) {
        iL.value = startx+","+starty+";";
        }
    }
    }
      
    
    // document.getElementById("drawing_rect").onclick = function(){
    //  console.log(canvas);
    //  context.strokeStyle="purple";
  
    //  var rect_info = document.getElementById("from_cpp").value;
    //  var rect_info_lines = rect_info.split('\n');
    //  //alert(rect_info_lines[0]);
      
    //  for(var i=0; i<rect_info.length; i++){
    //      ri1[i] = rect_info_lines[i].split(';')[0].split('=')[1];
    //      ri2[i] = rect_info_lines[i].split(';')[1].split('=')[1];
    //      ri3[i] = rect_info_lines[i].split(';')[2].split('=')[1];
    //      ri4[i] = rect_info_lines[i].split(';')[3].split('=')[1];
    //      ri5[i] = rect_info_lines[i].split(';')[4].split('=')[1];
    //      context.strokeRect(ri2[i],ri3[i],ri4[i],ri5[i]);
    //      context.fillText(ri1[i],ri2[i]-10,ri3[i]-3,20);
    //  }   
    // }
  
  
    document.getElementById("load2").onclick = function(){
        alert("block_text_id");
        block_id = block_text_id.value;
        line_id = line_text_id.value;
        word_id = word_text_id.value;
        block_id++;
        line_id++;
        word_id++;
    }
      
      
    document.getElementById("delete").onclick = function(){
    block_id = 1;
    line_id = 1;
    word_id = 1;
    }
  
  
      
      
})();
  
  
function Try(){
    block_id = block_text_id.value;
    line_id = line_text_id.value;
    word_id = word_text_id.value;
    block_id++;
    line_id++;
    word_id++;
};
  
function Try2(){
    block_id = 1;
    line_id = 1;
    word_id = 1;
    block_text_id.value = 0;
    line_text_id.value = 0;
    word_text_id.value = 0;
};
