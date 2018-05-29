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
        this.x = 0;
        this.y = 0

        this.display()
    }
    display() {
        //没有时创建,防止randomCreate时冲突创建两个
        if (!this.div) {
            this.div = document.createElement('div');
        }
        this.div.style.width = this.width + 'px';
        this.div.style.height = this.height + 'px';
        this.div.style.position = 'absolute';
        this.div.style.background = this.color;
        this.div.style.left = this.x * this.width + 'px';
        // console.log(div.style.left);
        this.div.style.top = this.y * this.height + 'px';
        // console.log(div.style.top);
        map.div.appendChild(this.div)
    }
    randomCreate() {
        this.x = Math.round(Math.random() * 39)
        this.y = Math.round(Math.random() * 19)
        this.display()
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
            // this.body数组中添加元素,以确定是否需创建div
            if (!this.body[i][3]) {
                this.body[i][3] = document.createElement('div');
            }
            this.body[i][3].style.width = this.width + 'px';
            this.body[i][3].style.height = this.height + 'px';
            this.body[i][3].style.position = 'absolute';
            this.body[i][3].style.background = this.body[i][2];
            this.body[i][3].style.left = this.body[i][0] * this.width + 'px';
            this.body[i][3].style.top = this.body[i][1] * this.height + 'px';
            map.div.appendChild(this.body[i][3]);
            // console.log(this.body[i][3]);
        }
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
        //撞墙判断
        if (this.body[0][0] < 0 || this.body[0][0] > 39 || this.body[0][1] < 0 || this.body[0][1] > 19) {
            alert('撞墙了');
            return null;
        }

        // 吃食物判断
        if (this.body[0][0] == map.food.x && this.body[0][1] == map.food.y){
            
        }

            this.display()
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
food.randomCreate()
var snake = new Snake();

// 判断按键
document.onkeydown = function (eve) {
    var e = eve || window.event;
    var keyC = e.keyCode || e.which;
    snake.direction(keyC)
}