var song1 = "";
var song2 = "";
var rightX = 0;
var rightY = 0;
var leftX = 0;
var leftY = 0;
var leftScore = 0;
var rightScore = 0;
var song1Status = "";
var song2Status = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(650, 470);
    canvas.position(410 , 300);
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, function(){
        console.log("Posenet is Activated");
    });
    posenet.on("pose", gotPoses);
}
function draw(){
    image(video, 0, 0, 650, 470);
    song1Status = song1.isPlaying()
    if(leftScore > 0.2){
        circle(leftX, leftY, 25);
        song2.stop()
        if(song1Status == false){
            song1.play()
            document.getElementById("songNameSpan").innerHTML = "Harry Potter Theme Song"
        }
    }
    song2Status = song2.isPlaying()
    if(rightScore > 0.2){
        circle(rightX, rightY, 25);
        song1.stop()
        if(song2Status == false){
            song2.play()
            document.getElementById("songNameSpan").innerHTML = "Peter Pan Song"
        }
    }
    
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = " + rightX + " Right wrist y = " + rightY);
        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + leftX + " Left wrist y = " + leftY);
        leftScore = results[0].pose.keypoints[9].score;
        rightScore = results[0].pose.keypoints[10].score;
    };
}
