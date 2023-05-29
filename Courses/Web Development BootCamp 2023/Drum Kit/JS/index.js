// Detecting Button Press
var numebrOfDrumButtons = document.querySelectorAll(".drum").length;

// looping through all buttons
for(var i = 0; i < numebrOfDrumButtons; i++){

// Create a Function to alert when you click on any button
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);

    });
};

// Detecting Keyboard Press
document.addEventListener("keypress", function(event) {
    makeSound(event.key);

    buttonAnimation(event.key);
})

function makeSound(key){
    switch (key) {
        case "w":
            var crash = new Audio("/sounds/crash.mp3");
            crash.play();
            break;
        case "a":
            var kickBass = new Audio("/sounds/kick-bass.mp3");
            kickBass.play();
            break;
        case "s":
            var snare = new Audio("/sounds/snare.mp3");
            snare.play();
            break;
        case "d":
            var tom1 = new Audio("/sounds/tom-1.mp3");
            tom1.play();
            break;
        case "j":
            var tom2 = new Audio("/sounds/tom-2.mp3");
            tom2.play();
            break;
        case "k":
            var tom3 = new Audio("/sounds/tom-3.mp3");
            tom3.play();
            break;
        case "l":
            var tom4 = new Audio("/sounds/tom-4.mp3");
            tom4.play();
        break;
        default:
            console.log(buttonInnerHTML);
    }
}


function buttonAnimation(currentKey){
    var activeButton = document.querySelector("."+ currentKey);
    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100)

}