function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modalLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
    image(video,0,0,600,500)
    fill("#0006b5");
    stroke("#000354");
    status1=song1.isPlaying();
    if(scorLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        console.log("playing");
        if(status1 == false){
            song1.play();
        }
    }
    status2=song2.isPlaying();
    if(scorRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(status2 == false){
            song2.play();
        }
    }
}

song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scorLeftWrist =0;
status1 =0;
scorRightWrist =0;
status2 =0;

function preload(){
    song1 = loadSound("Shulk.mp3");
    song2 = loadSound("Otherstep.mp3");
}

function play(){
    song2.play();
    song1.setVolume(2);
    song1.rate(1);
    song2.setVolume(2);
    song2.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = "+leftWristX+"Left wrist Y ="+leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = "+rightWristX+"Right wrist Y ="+rightWristY);
        scorLeftWrist =results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist"+scorLeftWrist);
        scorRightWrist =results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist"+scorRightWrist);
    }
}

function modalLoaded(){
    console.log("MODAL IS LOADED!!!")
}