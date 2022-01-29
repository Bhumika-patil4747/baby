img="";
status = "";
object = [];
function setup(){
    canvas = createCanvas(537,528);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd,modelLoaded');
    document.getElementById("status").innerHTML = "status - detecting objects";
}

function preload(){
    img = loadImage('dog_cat.jpg');
}

function draw(){
    image(video,0,0,380,380);
    if(status !=""){

        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "status : objects detected";
            document.getElementById("found_or_not").innerHTML = "number of object detecter are : "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("model loaded!")
    status = true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;

}