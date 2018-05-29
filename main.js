//地图
class Map {
    constructor() {
        this.width = 800;
        this.height = 400;
        this.color = '#ccc';

        this.display();
    }
    //展示地图
    display() {
        this.div = document.createElement('div');
        this.div.style.width = this.width + 'px';
        this.div.style.height = this.height + 'px';
        this.div.style.position = 'relative';
        this.div.style.background = this.color;
        document.body.appendChild(this.div)
    }
}


// 食物
class Food {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.color = 'red';
        // this.x = 0;
        // this.y = 0

        this.display()
    }
    display() {
        var div = document.createElement('div');
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.position = 'absolute';
        div.style.background = this.color;
        div.style.left = Math.round(Math.random() * 39) * this.width + 'px';
        // console.log(div.style.left);
        div.style.top = Math.round(Math.random() * 19) * this.height + 'px';
        // console.log(div.style.top);
        map.div.appendChild(div)
    }

}

class Snake {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.body = [[5, 3, 'yellow'], [4, 3, 'skyblue'], [3, 3, 'pink']]
        // 初始移动方向
        this.direct = 'right';
        this.display()
    }
    display() {
        for (var i = 0; i < this.body.length; i++) {
            this.div = document.createElement('div');
            this.div.style.width = this.width + 'px';
            this.div.style.height = this.height + 'px';
            this.div.style.position = 'absolute';
            this.div.style.background = this.body[i][2];
            this.div.style.left = this.body[i][0] * this.width + 'px';
            this.div.style.top = this.body[i][1] * this.height + 'px';
            map.div.appendChild(this.div);
        }
        // setInterval(() => {
        //     this.move()
        // }, 300);
        setTimeout(() => {
            this.move()
        }, 300);
    }
    move() {
        //更改this.body数组值   
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i][0] = this.body[i - 1][0];
            this.body[i][1] = this.body[i - 1][1];
        }
        // 第一个div移动
        switch (this.direct) {
            case 'left': this.body[0][0]--; break;
            case 'up': this.body[0][1]--; break;
            case 'right': this.body[0][0]++; break;
            case 'down': this.body[0][1]++; break;
        }
    }
    // 键盘按下事件判断移动方向
    direction(value) {
        switch (value) {
            case 37: this.direct = 'left'; break;
            case 38: this.direct = 'up'; break;
            case 39: this.direct = 'right'; break;
            case 40: this.direct = 'down'; break;
        }
    }

}

var map = new Map();
var food = new Food();
var snake = new Snake();

// 判断按键
document.onkeydown = function (eve) {
    var e = eve || window.event;
    var keyC = e.keyCode || e.which;
    snake.direction(keyC)
}