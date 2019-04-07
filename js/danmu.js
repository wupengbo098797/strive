(function($){
    $.fn.danmu = function(o){
        var defs = {
            minSpeed : 3000,
            maxSpeed : 5000,
            _text:[],
            _color:['#333','#ff4141','#60c7d0','#ff8201','#10ad54','#2c8ac0'],
            _fontSize:['14px','16px','18px','20px','22px','24px']
        }
        var opt = $.fn.extend({}, defs , o);
        var $this = $(this);
        var method = {
            creatEle:function(){
                if($this.find(".cont").length==0){
                    $this.append('<div class="cont" style="width:100%; height:100%; position:relative"></div>')
                }
                $.each(opt._text,function(index,value){
                    var num = method.setRandomNum(0,6);
                    var color,fontSize;
                    if(value.color){color = value.color}else{color = opt._color[num]}
                    if(value.fontSize){fontSize = value.fontSize}else{fontSize = opt._fontSize[num]}
                    var style = 'position:absolute;white-space:nowrap; left:'+$this.width()+'px;color:'+color+';font-size:'+fontSize+';';
                    var speed = (method.setRandomNum(opt.minSpeed,opt.maxSpeed)/1000).toFixed(1); //获取范围内随机速度
                    var delay = (method.setRandomNum(0,1000)/1000).toFixed(1);//获取范围内随机延迟时间
                    var top   = method.setRandomNum(0,parseInt($this.height())-30);//获取范围内随机垂直定位
                    style += 'top:'+top+'px;-webkit-transition:all '+speed+'s linear;-webkit-transition-delay:'+delay+'s;';
                    $this.find(".cont").append('<span class="text" style = "'+style+'">'+value.text+'</span>');
                    var time = parseInt(speed+delay)*1500;
                    method.clear($this.find(".text").eq(index),time)
                })
                method.moveing()
                
            },
            moveing:function(){
                $.each($this.find(".text"),function(index,value){
                    var width = parseInt($this.width())+parseInt($(this).width());
                    $(this).css({"-webkit-transform":"translate3d("+-width+"px,0,0)"})
                })
            },
            clear:function($obj,time){
                console.log($obj,time)
                setTimeout(function(){
                    $obj.remove()
                },time)
            },
            setRandomNum:function(a,b){
                return parseInt(a+(b-a)*Math.random())
            },
            init:function(){
                method.creatEle()
            }
        }
        method.init()
    }
})(jQuery);