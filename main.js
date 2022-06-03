let song = "";
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;
let scoreLeftWrist = 0;

function preload() {
  song = loadSound("music.mp3");
}

function setup() {
  canvas = createCanvas(510, 510);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function draw() {
  image(video, 0, 0, 510, 510);
  //filter(INVERT);
  fill("#4287f5");
  stroke("#4287f5");
  if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals / 500;
    document.getElementById("vol").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
  }
}

function play1() {
  song.play();
}

function modelLoaded() {
  console.log("PoseNet Is initialized!");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreLeftWrist = " + scoreLeftWrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
  }
}
