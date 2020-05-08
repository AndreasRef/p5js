if (annyang) { 
    annyang.addCallback('start', function() {
        console.log('Speech Recognition engine starts listening');
    });

    annyang.addCallback('error', function() {
        console.log('There was an error!');
    });

    annyang.addCallback('result', function(whatWasHeard) {
        //document.getElementById("voiceToText").innerHTML = whatWasHeard[0];
        console.log(whatWasHeard[0]);
    });

    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {

        // Capture anything after a splat (*) and pass it to the function. The keyword that the sketch listens for is "ideas"
        '*text ideas': sendToRunway,

    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();

    // OPTIONAL: activate debug mode for detailed logging in the console
    annyang.debug();
}

let url = 'http://localhost:8000/query';
let myVoice = new p5.Speech();

function setup() {
    createCanvas(400, 400);
    textAlign(CENTER);
    textSize(16);
    background(220);
    text("click mouse to start listen", 100, 100)
}

function draw() {
    //background(220);
}

function mouseClicked() {
    myVoice.speak('Okay, I am ready');
    background(220);
}


function sendToRunway(theText) {
    console.log(theText);
    let prompt_value = theText;
    let seed_val = floor(random(20,1000));

    postData = { prompt: prompt_value, seed: seed_val};

    httpPost(url, 'json', postData, function(result) {
        clear()
        myVoice.speak(result.generated_text)
        displayGPT2text(result.generated_text)
    });
}


function displayGPT2text(outputText) {
    background(220);
    text(outputText, 10, 10, width-10, height-10)   
}
