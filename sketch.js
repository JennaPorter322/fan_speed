let fsel;
let sSlider;

let speed = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // speed settings
let angles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let s = speed[0],  sold, f = 1,  fold;
let many = 10;

let angle = 0;
let maxRpm = 100;
let lastMillis = 0;

function setup() {
  createCanvas(1000, 230);
  makeHMI();
  rectMode(CENTER);
  angleMode(DEGREES);
  lastMillis = millis();

}

function draw() {
  background(265, 270, 0);
  checkSlider();
  text('Fan ' + f, 500, 35);
  text('Speed of Fans ' + f + " : " + s, sSlider.x + sSlider.width + 10, 35);
  draw_fans() ;
}

function makeHMI() {
  // change memory
  sold = s;
  fold = f;
  // FAN selector
  sel = createSelect();
  sel.position(445, 285);
  for (let i = 1; i <= 10; i++) sel.option(i);
  sel.changed(checkSelector); // defime callback on change
  // SPEED slider
  sSlider = createSlider(0, 200, s, 5);
  sSlider.position(30, 290);
  stroke(5)
  textSize(15);
}

function checkSelector() {
  f = sel.value();
  if (f != fold) { // HMI Fan Slider changed
    print("changed f " + f);
    sSlider.remove(); 
    sSlider = createSlider(0, 250, speed[f-1], 5); 
    sSlider.position(320, 20);
  }
  fold = f;
}

function checkSlider() {  
  s = sSlider.value();
  if (s != sold) { // HMI Speed Slider changed
    print("Fan "+f+" changed s " + s);
    speed[f-1] = s;  // array vs fan number 
  }
  sold = s; // our memory
}


function updateAngle() {
  let newMillis = millis();
  let elapsedMillis = newMillis - lastMillis;
  //  let rpm = maxRpm * (Rotations / 255.0);
  for (let i = 0; i < many; i++) {
    let rpm = maxRpm * (speed[i] / 255.0);
    let rps = rpm / 60;
    let rev = rps * (elapsedMillis / 1000);
    angles[i] += 360 * rev;
  }
  lastMillis = newMillis;
}

function draw_fans() {
  updateAngle();
  translate(0, 100);
  for (let i = 0; i < many; i++) draw_fan(i+1,angles[i]);
}

function draw_fan(n,angle) {
  translate(90, 0);
  text("Fan "+n,-20,+80);
  push();
  rotate(angle);
  stroke(5);
  fill(0,230,200);
  rect(0, 0, 14, 90);
  circle(0, 0, 30);
  pop();
}
