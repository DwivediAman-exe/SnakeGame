
function init() {
  canvas = document.getElementById("mycanvas");
  W = canvas.width = 800;                          // height and width og the canvas
  H = canvas.height = 800;
  pen = canvas.getContext("2d");     //pen object to draw
  cs = 64;                           // cell size of one block of snake
  game_over = false;
  score = 5;

  food = getRandomFood();            // global object

  foodimage = new Image();          // creating image object for food
  foodimage.src = "assests/apple.png";

  //creating a snake object
  snake = {
    init_len: 5,           // defining initial length , color , direction of snake
    color: "blue",
    cells: [],
    direction: "right",
    // adding cells in snake since initial length in 5 units
    createSnake:function() {
      for(var i = this.init_len;i>0;i--) {
        this.cells.push({x:i,y:0});
      }
    },
    // drawing snake function
    drawSnake:function() {
      for(var i=0;i<this.cells.length;i++) {
        pen.fillStyle = this.color;                 // changing the color of snake to the current color (of object)
        pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);   // mapping the array accoring to the cell size
      }
    },
    // funtion for movement of snake
    updateSnake:function() {

      var headX = this.cells[0].x;    // position of head of snake
      var headY = this.cells[0].y;

      if(headX == food.x && headY == food.y) {
        food = getRandomFood();
        score++;
      }
      else {
        this.cells.pop();    // removing the last cell of the array
      }


      var nextX,nextY;                  //new position of snake head

      if(this.direction == "right") {      // determining the new position
        nextX = headX+1;
        nextY = headY;
      }
      else if(this.direction == "left") {
        nextX = headX-1;
        nextY = headY;
      }
      else if(this.direction == "up") {
        nextX = headX;
        nextY = headY-1;
      }
      else {
        nextX = headX;
        nextY = headY+1;
      }

      this.cells.unshift({x:nextX,y:nextY});    //updating head

      // cheking if snake hits the walls then game over
      var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
      }
    }
  };
  snake.createSnake();
  // adding Event Listener on whole screen for movement of snake
  function keyPressed(e){           //changing snake direction according to the keypressed
    if(e.key == "w") {
      snake.direction = "up";
    }
    else if(e.key == "s") {
      snake.direction = "down";
    }
    else if(e.key == "a") {
      snake.direction = "left";
    }
    else {
      snake.direction = "right";
    }
  }

  document.addEventListener("keydown",keyPressed);
}

function draw() {
  pen.clearRect(0,0,W,H);    // erase the old screen when drawing new snake
  snake.drawSnake();

  pen.fillStyle = "red";                      // drawing the food on the canvas
  pen.drawImage(foodimage,food.x*cs,food.y*cs,cs,cs);
  pen.fillStyle = "black";
  pen.font = "40px Roboto";
  pen.fillText(score,770,200);
}

function update() {
  snake.updateSnake();

}

function getRandomFood() {
  var foodX = Math.round(Math.random()*(W-cs)/cs);  //generating random food position
  var foodY = Math.round(Math.random()*(H-cs)/cs);

  var food = {               // creating food object
    x: foodX,
    y: foodY,
    color: "red",
  }
  return food

}

function gameloop(){
  if(game_over ==  true) {            // checking game over condition
    clearInterval(f);
    alert("Game Over");
  }
  draw();
  update();

}

init();

var f= setInterval(gameloop,200);
