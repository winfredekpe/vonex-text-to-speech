// grabing items

let inputtext = document.querySelector(".input>textarea");
let speed = document.querySelector("#speed");
let pitch = document.querySelector("#pitch");
let select = document.querySelector("#select");
let speedvalue = document.querySelector("#speedval");
let pitchvalue = document.querySelector("#pitchval");
let submit = document.querySelector(".submit>input");
bot = window.speechSynthesis;

// functions

// list containig all the voices
let voices = [];

// function to get all voices

function getVoices() {
  // checkiong if .onvoiceschanged is not undefined it loads asyncronously

  if (bot.onvoiceschanged !== undefined) {
    // asigning the callback function onvoicechanged to a custom function so we can recieve the voices and do what we want to do with it
    bot.onvoiceschanged = getVoices;

    // it returns a list of the voices so we give it to the array voices
    voices = bot.getVoices();

    // creating option html for each object option in the array
    voices.forEach((voice) => {
      option = document.createElement("option");
      option.textContent = `${voice.name}(${voice.lang})`;
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      select.appendChild(option);
    });
    console.log(voices);
  }
}

// callling the getvoices to get the values and plce them in the options section
getVoices();

// creating a speaker

function speak() {
  text = inputtext.value;
  if (text !== "") {
    // creating a speechsnthesisutterance it is like a person who will speak the voices
    speaker = new SpeechSynthesisUtterance(text);
    speaker.onerror = (e) => {
      console.warn("there is aproblem");
    };
    speaker.onend = (e) => {
      console.log("done speaking");
    };

    // getting the selected voice from the options
    selectedbotvoice = select.selectedOptions[0].getAttribute("data-name");

    // checking if the selected voice mathces any of the available voices
    voices.forEach((voice) => {
      if (voice.name === selectedbotvoice) {
        // asigning the voice if there is any to the speaker we created from the speechsnthesisutterance  above
        // hence we are giving  it a voice

        speaker.voice = voice;
        speaker.volume = 2;
      }
    });
  }
  speaker.speed = parseInt(speed.value);
  speaker.pitch = parseInt(pitch.value);

  // calling the speechsynthesis we  created and calling the onvoicechange function we renamed with the function called bot
  //  and paasing in the speechsnthesisutterance instance whixh is like a person who speaks into the bot function
  bot.speak(speaker);
}

// adding event listeners

submit.addEventListener("click", (e) => {
  e.preventDefault();
  speak();
  inputtext.blur();
});

pitch.addEventListener("input", (e) => {
  pitchvalue.textContent = "Pitch " + pitch.value;
});

speed.addEventListener("input", (x) => {
  speedvalue.textContent = "Speed " + speed.value;
});

select.addEventListener("change", (e) => {
  speak();
});
