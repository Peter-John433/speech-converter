let resultEl = document.getElementById('result');

let recognition;


// create the start converting function

function startConverting(){

    //if this is supported by your browser then the statement below will be executed
    if('webkitSpeechRecognition' in window){

        recognition = new webkitSpeechRecognition();

        setupRecognition(recognition);

        recognition.start(); // recognition must be start if not it will not work
    };
}


// create the recognition function

function setupRecognition(recognition){

    recognition.continuous = true; // recognition must continue

    recognition.interimResults = true; // the interim listen to an upcoming voice and display it on the web browser

    recognition.lang = 'en-US'; // setup the lang to be display on the browser

    recognition.onresult = function(event){

    const {finalTranscript , interTransscript} =  processResult(event.results);

     resultEl.innerHTML = finalTranscript + interTransscript;

    }

}


// create a processing result function

function processResult(results){

    let finalTranscript = '';
    let interTransscript = '';

    for(i = 0; i < results.length; i++){
        
        let transcript = results[i][0].transcript;

        transcript.replace('\n', '<br>');

        if(results[i].isFinal){

            finalTranscript += transcript;

        }else{

            interTransscript += transcript;

        }

        return {finalTranscript, interTransscript}
    }
}


// create the stop converting function

function stopConverting(){
    if(recognition){
        recognition.stop();
    }
}
