leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score = 0;
var som = "";
function preload(){
    som = loadSound("Minecraft_Otherside.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses)
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    if (score >= 0.2){
    circle(leftWristX,leftWristY,10);
    circle(rightWristX,rightWristY,10);
    volume = floor(Number(leftWristY)) / 500;
    speed = floor(Number(rightWristY)) / 500;
    som.setVolume(volume);
    som.rate(speed);
    document.getElementById("volume").innerHTML = "Volume: "+volume;
    document.getElementById("speed").innerHTML = "Speed: "+speed;
    }
}
function play(){
    som.play();
    som.setVolume(1);
    som.rate(1);
}
function modelLoaded(){
    console.log("Model Loaded");
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        score = results[0].pose.keypoints[9].score;
        console.log(score);
        console.log(leftWristX +" "+ leftWristY);
        console.log(rightWristX +" "+rightWristY);
    }
}