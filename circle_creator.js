module.exports = {
    // начальные точки рисунка
    startX: 0,
    startY: 0,

    // конечные точки рисунка для проверки валидности окружности
    endX: 0,
    endY: 0,

    // крайние точки рисунка для вычисления размеров окружности
    // крайные левая и верхняя точка изначально большие числа потому
    // что при вычислении в методе checkExtremePoints будет выбираться меньшее значение
    maxRight: 0,
    maxLeft: 100000,
    maxTop: 100000,
    maxBottom: 0,

    // архив нарисованных окружностей для отрисовки после очистки холста
    circles: [],

    getCircles() {
        return this.circles;
    },

    appointStartPoints(event) {
       this.startX = event.pageX
       this.startY = event.pageY
    },

    appointEndPoints(event) {
        this.endX = event.pageX,
        this.endY = event.pageY
    },

    checkExtremePoints(event) {
    // проверка на преодоления текущих крайних точек и перезапись
        this.maxRight = Math.max(event.pageX, this.maxRight);
        this.maxLeft = Math.min(event.pageX, this.maxLeft);
        this.maxTop = Math.min(event.pageY, this.maxTop);
        this.maxBottom = Math.max(event.pageY, this.maxBottom);
    
    },

    calculateRadiusAndPosition() {
    // вычисление радиуса и позиции окружности
 
        if (
        // если стартовая точка рисунка и конечная не смыкаются, то окружность не будет добавлена
        // допустил погрешность 30px
            Math.abs(this.endX - this.startX) > 30  
            || Math.abs(this.endY - this.startY) > 30
        ) { return }
        
        // высота и ширина рисунка для получения среднего диаметра
        const width = this.maxRight - this.maxLeft;
        const height = this.maxBottom - this.maxTop;
        
        // вычисление радиуса и цетра окружности 
        const radius = (width/2 + height/2) / 2;
        const centerX = this.maxLeft + width/2;
        const centerY = this.maxTop + height/2;

        this.circles.push ({
        // вычисленные данные окружности добавляются в архив 
            radius,
            centerX,
            centerY,
        })

        // после добовления окружности, очищаются данные для новой
        this.clear();
    },

    clear() {
    // очистка данных последнего рисунка
        this.startX = 0;
        this.startY = 0;
        this.maxRight = 0;
        this.maxLeft = 100000;
        this.maxTop = 100000;
        this.maxBottom = 0;
    }
}