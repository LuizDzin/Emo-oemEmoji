Webcam.set({
    width:350,
    height:300,
    imageFormat:'png',
    pngQuality:90
});

var prediction1, prediction2;

Webcam.attach('#camera');

function takeSnapshot() {
Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
});
}

console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/uViME3QuB/model.json',modelLoaded);

function modelLoaded() {
    console.log('Modelo Carregado!');
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previsão é " + prediction1;
    speakData2 = "A segunda previsão é " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
if (error) {
    console.error(error);
} else {
    console.log(results);
    document.getElementById("precisao1").innerHTML = results[0].label;
    document.getElementById("precisao2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    speak();
    if(results[0].label == "Feliz") {
        document.getElementById("precisaoEmoji1").innerHTML = "&#128522;";
    }

    if(results[0].label == "Triste") {
        document.getElementById("precisaoEmoji1").innerHTML = "&#128532;";
    }

    if(results[0].label == "Irritado") {
        document.getElementById("precisaoEmoji1").innerHTML = "&#128548;";
    }


    if(results[1].label == "Feliz") {
        document.getElementById("precisaoEmoji2").innerHTML = "&#128522;";
    }

    if(results[1].label == "Triste") {
        document.getElementById("precisaoEmoji2").innerHTML = "&#128532;";
    }

    if(results[1].label == "Irritado") {
        document.getElementById("precisaoEmoji2").innerHTML = "&#128548;";
    }
}
}