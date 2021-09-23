const creator = require("./circle_creator");

const canvas = document.getElementById("canvas");

canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;

const ctx = canvas.getContext("2d");
ctx.lineWidth = 5;



canvas.addEventListener("mousedown", event => {
    startDrawing(event);
    canvas.addEventListener( "mousemove", draw);
    canvas.addEventListener("mouseup", endDrawing);

})

function startDrawing(event) {
    // в начале рисования записываются стартовые точки в объект creator
    creator.appointStartPoints(event);

    ctx.beginPath();
    ctx.moveTo(event.pageX, event.pageY);
}

function draw(event) {
    ctx.lineTo(event.pageX, event.pageY);
    ctx.stroke(); 
    // при рисовании будет вызываться метод checkExtremePoints 
    // чтобы в объекте всегда были актуальные размеры
    creator.checkExtremePoints(event);
}


function endDrawing(event) {   
    // с завершением рисования в объект creator записываются конечные точки 
    creator.appointEndPoints(event);
    canvas.removeEventListener( "mousemove", draw);   

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // в объекте creator инкапсулированы методы для вычисления и добовления окружности
    creator.calculateRadiusAndPosition();   
    // остаётся получить все окружности и отрисовать
    creator.getCircles().forEach(options => {
        drawCircle(options);
    }) 
}



function drawCircle(options) {
    ctx.beginPath();
    ctx.arc(options.centerX, options.centerY, options.radius, 0, Math.PI * 2, true);
    ctx.stroke();
}