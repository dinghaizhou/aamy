(function($) {        
    $.alerts = {         
        alert: function(title, message, callback) {  
            if( title == null ) title = 'Alert';  
            $.alerts._show(title, message, null, 'alert', function(result) {  
                if( callback ) callback(result);  
            });  
        },  
           
        confirm: function(title, message, callback) {  
            if( title == null ) title = 'Confirm';  
            $.alerts._show(title, message, null, 'confirm', function(result) {  
                if( callback ) callback(result);  
            });  
        },  
               
          
        _show: function(title, msg, value, type, callback) {  
            
                    var _html = "";  
   
                    _html += '<div id="mb_box"></div>'
                    _html += '<div id="mb_con"><span id="mb_tit">' + title + '</span>';  
                    _html += '<div id="mb_ico">+</div>' 
                    _html += '<div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';  
                      if (type == "alert") {  
                      _html += '<div id="mb_btn_ok">确定</div>';  
                    }  
                    if (type == "confirm") {  
                      _html += '<div id="mb_btn_no">取消</div>';  
                      _html += '<div id="mb_btn_ok">确定</div>';  
                    }  
                    _html += '</div></div>';  
                   
                    //必须先将_html添加到body，再设置Css样式  
                    $("body").append(_html); 
                    GenerateCss();  
           
            switch( type ) {  
                case 'alert':  
          
                    $("#mb_btn_ok").click( function() {  
                        $.alerts._hide();  
                        callback(true);  
                    });  
                    $("#mb_btn_ok").focus().keypress( function(e) {  
                        if( e.keyCode == 13 || e.keyCode == 27 ) $("#mb_btn_ok").trigger('click');  
                    });  
                break;  
                case 'confirm':  
                     
                    $("#mb_btn_ok").click( function() {  
                        $.alerts._hide();  
                        if( callback ) callback(true);  
                    });  
                    $("#mb_btn_no").click( function() {  
                        $.alerts._hide();  
                        if( callback ) callback(false);  
                    });  
                    $("#mb_btn_no").focus();  
                    $("#mb_btn_ok, #mb_btn_no").keypress( function(e) {  
                        if( e.keyCode == 13 ) $("#mb_btn_ok").trigger('click');  
                        if( e.keyCode == 27 ) $("#mb_btn_no").trigger('click');  
                    });  
                break;
            }  
            $("#mb_ico").click( function() {  
                $.alerts._hide();  
                if( callback ) callback(false);  
            });  
        },  
        _hide: function() {  
             $("#mb_box,#mb_con").remove();  
        }  
    }  
    // Shortuct functions  
    myAlert = function(title, message, callback) {  
        $.alerts.alert(title, message, callback);  
    }  

    myConfirm = function(title, message, callback) {  
        $.alerts.confirm(title, message, callback);  
    };  
           
   
      
      //生成Css  
  var GenerateCss = function () {  
   
    $("#mb_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',  
      filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'  
    });  
   
    $("#mb_con").css({ zIndex: '999999', width: '400px', position: 'fixed',  
      backgroundColor: 'White',  
    });  
   
    $("#mb_tit").css({ display: 'block', fontSize: '14px', color: '#444', padding: '10px 15px',  
      backgroundColor: '#fff', borderRadius: '15px 15px 0 0',  
      fontWeight: 'bold'  
    });  
   
    $("#mb_msg").css({ padding: '0 20px', lineHeight: '40px', textAlign:'center', 
      fontSize: '14px' ,color:'#4c4c4c' 
    });  
   
    $("#mb_ico").css({ display: 'block', position: 'absolute', right: '4px', top: '0px',  
      fontSize: '30px', cursor: 'pointer', fontFamily: '微软雅黑', transform: 'rotate(45deg)'
    });  
   	
    $("#mb_btnbox").css({ margin: '15px 0px 10px 0', textAlign: 'center' });  
    $("#mb_btn_ok,#mb_btn_no").css({  height: '40px', borderTop: '1px solid #eee', width: '50%', float:'left', boxSizing:'border-box', fontWeight: '600', lineHeight: '40px',
fontSize: '14px'});  
    $("#mb_btn_no").css({ borderRight: '1px solid #eee'});  
    $("#mb_btn_ok").css({ color: '#2b7ed1'}); 

    $("#mb_btn_ok,#mb_btn_no").hover(function () {  
      $(this).css({ backgroundColor: '#f8f8f9'});  
    }, function () {  
      $(this).css({ backgroundColor: '#fff'});  
    });  
   
    var _widht = document.documentElement.clientWidth; //屏幕宽  
    var _height = document.documentElement.clientHeight; //屏幕高  
   
    var boxWidth = $("#mb_con").width();  
    var boxHeight = $("#mb_con").height();  
   
    //让提示框居中  
    $("#mb_con").css({ top: (_height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });  
  }  
   
  
})(jQuery);