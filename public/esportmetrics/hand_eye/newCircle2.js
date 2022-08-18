function Start() {

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
let result = ' ';
const charactersLength = characters.length;
for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
return result;
}
var sub_id = generateString(6);

function sendData(name,data){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'sendjs.php'); 
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: name, filedata: data}));
}
   

    var elementX = document.getElementById('moveMeX')
    var elementY = document.getElementById('moveMeY')
    var container = document.getElementById('container-2')
    var trials = 0
    document.getElementById('trials').innerHTML = `${trials}/19`
    elementY.style.top = "-20px"
    var posX = -20
     startPosX = -20
    var posY = -20
    startPosY = -20
    var speed = 1
    var xIsMoving = false
    var yIsMoving = false
    maxPos = 190
    increaseSpeed = 0
    var xIsStopped = true
    var yIsStopped = false
    var performanceX = []
    var performanceY = []
    var performance = []

    function init() {
        elementX = document.getElementById('moveMeX')
        elementY = document.getElementById('moveMeY')
        elementY.style.top = "-20px"
        trials += 1
        document.getElementById('trials').innerHTML = `${trials}/20`
        posX = -20
        startPosX = -20
        posY = -20
        startPosY = -20
        increaseSpeed += 1
        if( increaseSpeed % 2 == 0) {
            speed += 1
        }       
        if ( speed == 4 || speed == 8 ) {
            maxPos = 188
        }
        else if ( speed == 9) {
            maxPos = 187
        }
        else {
            maxPos = 190
        }
        xIsMoving = !xIsMoving;
        //console.log("started")
    }

    init();
 
    let stopX = () => {
        if(xIsMoving){
            xIsMoving = !xIsMoving;
            yIsMoving = !yIsMoving;
        }else if(yIsMoving){
            yIsMoving = !yIsMoving;
            var timeleft = 3;
            var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
                clearInterval(downloadTimer);
                document.getElementById("countdown").innerHTML = "";
                init()
            } else {
                document.getElementById('trials').innerHTML = ""
                document.getElementById("countdown").innerHTML = timeleft;
            }
            timeleft -= 1;
            }, 1000);
        }
    }
 
    container.addEventListener("mousedown", () => {
        stopX()
        if(xIsStopped === true) {
            xIsStopped = !xIsStopped
            yIsStopped =! yIsStopped
            performanceX.push( Math.abs(posX+20-110))
            console.log(performanceX)
        }
        else if (yIsStopped === true) {
            xIsStopped = !xIsStopped
            yIsStopped =! yIsStopped
            performanceY.push(Math.abs(posY+20-110))
            console.log(performanceY)
        }
    });
 
    var myIntervalX = setInterval(function () {
        if(trials == 20) 
        {
            clearInterval(myIntervalX)
            for (let i = 0; i < performanceX.length; i++) {
                performance.push(performanceX[i] + performanceY[i])
              }
              var dataObj = {'data' : JSON.stringify(performance)}
              sendData("experiment_data_".concat(sub_id),dataObj)  
              window.location.href = './finish.html';  
        }
        else if (xIsMoving) {
            //console.log(xIsMoving)
            if (  startPosX == -20) {
                posX += speed
                //console.log(posX)
                elementX.style.left = posX + 'px'
                if (posX == maxPos) {
                    startPosX = maxPos
                }
            }
            else if (startPosX == maxPos) {
                posX -= speed
                //console.log(posX)
                elementX.style.left = posX + 'px'
                if (posX == -20) {
                     startPosX = -20
                }
            }
        }
        else if(yIsMoving){
            if (startPosY == -20) {
                posY += speed
                //console.log(posY)
                elementY.style.top = posY + 'px'
                if (posY == maxPos) {
                    startPosY = maxPos
                }
            }
            else if (startPosY == maxPos) {
                posY -= speed
                //console.log(posY)
                elementY.style.top = posY + 'px'
                if (posY == -20) {
                    startPosY = -20
                }
            }
        }
    }, 10);
}
 
Start()



