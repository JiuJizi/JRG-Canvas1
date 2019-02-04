
    var yyy = document.getElementById('xxx');
    
    setCanvasSize(yyy)

    listenToUser(yyy)

    var eraserEnabled = false
    eraser.onclick = function(){
        eraserEnabled = true
        actions.className = 'actions x'
    }
    brush.onclick = function(){
        eraserEnabled = false
        actions.className = 'actions'
    }

    /************/
    function setCanvasSize(canvas){
        setCanvasSize()
        window.onresize = function(){ //监听用户的窗口，如果改变，随之改变
            setCanvasSize()
        }
        function setCanvasSize(){   //用函数封装这四行代码，函数名随意
            var pageWidth = document.documentElement.clientWidth //获取当前页面宽度
            var pageHeight = document.documentElement.clientHeight  //获取当前页面高度
            //改变canvas的宽高(根据当前屏幕宽高检测,刷新才会改变)
            canvas.width = pageWidth   //应用到yyy的宽度(canvas的宽度)
            canvas.height = pageHeight //应用到yyy的高度(canvas的高度)
        }
    }
    
    function listenToUser(canvas){
        var context = canvas.getContext('2d'); //获取2d的上下文
        var using = false //绘画启动开关
        var lastPoint = {x:undefined,y:undefined}//最后的一个点
        
        //特性检测，不针对设备
        if(document.body.ontouchstart !== undefined){//检测屏幕是否支持touch(触摸)事件，支持则执行下面的代码
            //触屏设备
            canvas.ontouchstart = function(bbb){
                var x = bbb.touches[0].clientX
                var y = bbb.touches[0].clientY
                using = true
                if(eraserEnabled){//如果使用橡皮擦时，就执行擦除
                    context.clearRect(x-5,y-5,10,10)
                }else{//如果没使用橡皮擦，就正常绘图
                    lastPoint = {"x":x,"y":y}
                    }
                }
                canvas.ontouchmove = function(bbb){
                    var x = bbb.touches[0].clientX
                    var y = bbb.touches[0].clientY
                    if(!using){return}
                    if(eraserEnabled){
                        context.clearRect(x-5,y-5,10,10)}
                    else{
                        var newPoint = {"x":x,"y":y}
                        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                        lastPoint = newPoint             
                    }
                }
                canvas.ontouchend = function(bbb){
                        using = false
                        var x2 = bbb.touches[0].clientX
                        var y2 = bbb.touches[0].clientY
                        drawLine(x2,y2)
                }
                function drawLine(x1,y1,x2,y2){
                    context.beginPath();//开始绘画
                    context.moveTo(x1,y1) //开始坐标
                    context.lineWidth = 5 //线的宽度
                    context.strokeStyle = 'black'
                    context.lineTo(x2,y2) //结束坐标
                    context.stroke() //边框填充
                    context.closePath() //关闭绘画
                }
        }else{
            //非触屏设备
            canvas.onmousedown = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if(eraserEnabled){//如果使用橡皮擦时，就执行擦除
                context.clearRect(x-5,y-5,10,10)
            }else{//如果没使用橡皮擦，就正常绘图
                lastPoint = {"x":x,"y":y}
                }
            }
            canvas.onmousemove = function(aaa){
                var x = aaa.clientX
                var y = aaa.clientY
                if(!using){return}
                if(eraserEnabled){
                    context.clearRect(x-5,y-5,10,10)}
                else{
                    var newPoint = {"x":x,"y":y}
                    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
                    lastPoint = newPoint             
                }
            }
            canvas.onmouseup = function(aaa){
                    using = false
                    var x2 = aaa.clientX
                    var y2 = aaa.clientY
                    drawLine(x2,y2)
            }
            function drawLine(x1,y1,x2,y2){
                context.beginPath();//开始绘画
                context.moveTo(x1,y1) //开始坐标
                context.lineWidth = 5 //线的宽度
                context.strokeStyle = 'black'
                context.lineTo(x2,y2) //结束坐标
                context.stroke() //边框填充
                context.closePath() //关闭绘画
            }
        }
    }