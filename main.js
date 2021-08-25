song = "";
song1= "";

leftWristX="";
leftWristY="";

rightWristX="";
rightWristY="";

scoreLeftWrist= 0;
scoreRightWrist= 0;

function setup(){
    canvas= createCanvas(600,500);
    canvas.position(450, 200);

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
     console.log('PoseNet is Initialised');
} 

function draw() { 
    image(video, 0, 0, 600, 500); 
    song_status = song.isPlaying(); 
    song1_status = song1.isPlaying(); 
    fill("#FF0000"); 
    stroke("#FF0000"); 
    if(scoreRightWrist > 0.2) { 
        circle(rightWristX,rightWristY,20); 
        song1.stop(); 
        if(song_status == false) { 
            song.play(); 
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song" 
        } 
    }
    if(scoreLeftWrist > 0.2) { 
        circle(leftWristX,leftWristY,20); 
        song.stop(); 
        if(song1_status == false) { 
            song1.play(); 
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song" 
        } 
    } 
}

function preload(){
    song= loadSound("music.mp3");
    song1= loadSound("music2.mp3");
}

function play(){
    song.play();
    song1.play();
}

function gotPoses(results){
   if(results.length > 0){
       console.log(results);
       scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+scoreLeftWrist);
       leftWristX= results[0].pose.leftWrist.x;
       leftWristY= results[0].pose.leftWrist.y;
       console.log("leftWristX = "+leftWristX+" leftWristY = "+leftWristY);

       rightWristX= results[0].pose.rightWrist.x;
       rightWristY= results[0].pose.rightWrist.y;
       console.log("rightWristX = "+rightWristX+" rightWristY = "+rightWristY);
   }
}