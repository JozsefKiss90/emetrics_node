
    const randomRange = (min, max) => {
        return Math.random() * (max - min) + min
    }

    let trials = 50

    let zIndex = 999

    let zArray = [0,1,2,3,4,5]


    let firstElement
    let secondElement
    let thirdElement
    
    const container = document.getElementById('container')

    function init() {

        let firstNumber = document.createElement("p")

        firstElement = document.createElement("div")
        firstElement.classList.add("circle");
        firstElement.innerHTML = trials
        firstElement.style.left = randomRange(0, 400) + 'px'
        firstElement.style.top = randomRange(0, 100) + 'px'
        firstElement.style.zIndex = 99
        firstElement.setAttribute("id", `order_${trials}`);

        secondElement = document.createElement("div")
        secondElement.classList.add("circle");
        secondElement.innerHTML = trials-1
        secondElement.style.left = randomRange(0, 400) + 'px'
        secondElement.style.top = randomRange(0, 100) + 'px'
        secondElement.style.zIndex = 98
        secondElement.setAttribute("id", `order_${trials-1}`);

        thirdElement = document.createElement("div")
        thirdElement.classList.add("circle");
        thirdElement.innerHTML = trials-2
        thirdElement.style.left = randomRange(0, 400) + 'px'
        thirdElement.style.top = randomRange(0, 100) + 'px'
        thirdElement.style.zIndex = 97
        thirdElement.setAttribute("id", `order_${trials-2}`);

        fourthElement = document.createElement("div")
        fourthElement.classList.add("circle");
        fourthElement.innerHTML = trials-3
        fourthElement.style.left = randomRange(0, 400) + 'px'
        fourthElement.style.top = randomRange(0, 100) + 'px'
        fourthElement.style.zIndex = 96
        fourthElement.setAttribute("id", `order_${trials-3}`);

        fifthElement = document.createElement("div")
        fifthElement.classList.add("circle");
        fifthElement.innerHTML = trials-4
        fifthElement.style.left = randomRange(0, 400) + 'px'
        fifthElement.style.top = randomRange(0, 100) + 'px'
        fifthElement.style.zIndex = 95
        fifthElement.setAttribute("id", `order_${trials-4}`);

        sixthElement = document.createElement("div")
        sixthElement.classList.add("circle");
        sixthElement.innerHTML = trials-5
        sixthElement.style.left = randomRange(0, 400) + 'px'
        sixthElement.style.top = randomRange(0, 100) + 'px'
        sixthElement.style.zIndex = 94
        sixthElement.setAttribute("id", `order_${trials-5}`);

        container.appendChild(firstElement)
        container.appendChild(secondElement)
        container.appendChild(thirdElement)
        container.appendChild(fourthElement)
        container.appendChild(fifthElement)
        container.appendChild(sixthElement)

    }

    init()

    var mins = 00
    var seconds = 00
    var tens = 00
    var appendTens = document.getElementById("tens")
    var appendSeconds = document.getElementById("seconds")
    var appendMins = document.getElementById("mins")
    var Interval ;

    firstElement.onclick = function() {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }
       
    function startTimer () {
        tens++; 
        
        if(tens <= 9){
            appendTens.innerHTML = "0" + tens;
            }
        if (tens > 9){
            appendTens.innerHTML = tens;
            } 
        if (tens > 99) {
            console.log(document.getElementById("finishTime").childNodes[0].innerHTML + document.getElementById("finishTime").childNodes[2].innerHTML);
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
            }
        if (seconds > 9){
            appendSeconds.innerHTML = seconds;
        if (seconds > 59){
            mins++
            appendMins.innerHTML = "0" + mins;
            seconds = 0
            appendSeconds.innerHTML = "0" + 0;
            }
        }
    }

    const handleOrder = () => {

        function handler_1(event){
                event.target.style.left = randomRange(0, 400) + 'px'
                event.target.style.top = randomRange(0, 100) + 'px'
                event.target.style.zIndex = zArray[0]
                secondElement.style.zIndex = zArray[5]
                thirdElement.style.zIndex = zArray[4]
                fourthElement.style.zIndex = zArray[3]
                fifthElement.style.zIndex = zArray[2]
                sixthElement.style.zIndex = zArray[1]
                firstElement.innerHTML = trials - 6
                if (firstElement.innerHTML == -4) {
                firstElement.remove()
                }
                this.removeEventListener('mousedown', handler_1)
                secondElement.addEventListener("mousedown", handler_2)
                trials -= 1
        }

        function handler_2(event){
                event.target.style.left = randomRange(0, 400) + 'px'
                event.target.style.top = randomRange(0, 100) + 'px'
                event.target.style.zIndex = zArray[0]
                firstElement.style.zIndex = zArray[1]
                thirdElement.style.zIndex = zArray[5]
                fourthElement.style.zIndex = zArray[4]
                fifthElement.style.zIndex = zArray[3]
                sixthElement.style.zIndex = zArray[2]
                secondElement.innerHTML = trials - 6
                if (secondElement.innerHTML == -5) {
                    secondElement.remove()
                    clearInterval(Interval);
                    var performance = document.getElementById("finishTime").childNodes[0].innerHTML + document.getElementById("finishTime").childNodes[2].innerHTML
                    var dataObj = {'data' : JSON.stringify(performance)}
                    sendData("experiment_data_".concat(sub_id),dataObj)  
                    //window.location.href = './finish.html';
                }
                this.removeEventListener('mousedown', handler_2)
                thirdElement.addEventListener("mousedown", handler_3)
                trials -= 1
                console.log(trials)
        }

        function handler_3(event){
                event.target.style.left = randomRange(0, 400) + 'px'
                event.target.style.top = randomRange(0, 100) + 'px'
                event.target.style.zIndex = zArray[0]
                firstElement.style.zIndex = zArray[2]
                secondElement.style.zIndex = zArray[1]
                fourthElement.style.zIndex = zArray[5]
                fifthElement.style.zIndex = zArray[4]
                sixthElement.style.zIndex = zArray[3]
                thirdElement.innerHTML = trials - 6
                if (thirdElement.innerHTML == 0) {
                    thirdElement.remove()
                }
                this.removeEventListener('mousedown', handler_3)
                fourthElement.addEventListener("mousedown", handler_4)
                trials -= 1
        }

        function handler_4(event){
                event.target.style.left = randomRange(0, 400) + 'px'
                event.target.style.top = randomRange(0, 100) + 'px'
                event.target.style.zIndex = zArray[0]
                firstElement.style.zIndex = zArray[3]
                secondElement.style.zIndex = zArray[2]
                thirdElement.style.zIndex = zArray[1]
                fifthElement.style.zIndex = zArray[5]
                sixthElement.style.zIndex = zArray[4]
                fourthElement.innerHTML = trials - 6
                if (fourthElement.innerHTML == -1) {
                    fourthElement.remove()
                }
                this.removeEventListener('mousedown', handler_4)
                fifthElement.addEventListener("mousedown", handler_5)
                trials -= 1
        }

        function handler_5(event){
                event.target.style.left = randomRange(0, 400) + 'px'
                event.target.style.top = randomRange(0, 100) + 'px'
                event.target.style.zIndex = zArray[0]
                firstElement.style.zIndex = zArray[4]
                secondElement.style.zIndex = zArray[3]
                thirdElement.style.zIndex = zArray[2]
                fourthElement.style.zIndex = zArray[1]
                sixthElement.style.zIndex = zArray[5]
                fifthElement.innerHTML = trials - 6
                if (fifthElement.innerHTML == -2) {
                    fifthElement.remove()
                }
                this.removeEventListener('mousedown', handler_5)
                sixthElement.addEventListener("mousedown", handler_6)
                trials -= 1
        }

        function handler_6(event){
            event.target.style.left = randomRange(0, 400) + 'px'
            event.target.style.top = randomRange(0, 100) + 'px'
            event.target.style.zIndex = zArray[0]
            firstElement.style.zIndex = zArray[5]
            secondElement.style.zIndex = zArray[4]
            thirdElement.style.zIndex = zArray[3]
            fourthElement.style.zIndex = zArray[2]
            fifthElement.style.zIndex = zArray[1]
            sixthElement.innerHTML = trials - 6
            if (sixthElement.innerHTML == -3) {
                sixthElement.remove()
            }
            this.removeEventListener('mousedown', handler_6)
            firstElement.addEventListener("mousedown", handler_1)
            trials -= 1
        }

        firstElement.addEventListener('mousedown', handler_1)
        firstElement.addEventListener('mousedown', function() {
            console.log('wtf')
            clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
        })
    }

    handleOrder()