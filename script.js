const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing Joke from to VoiceRSS API
const tellMe = async (joke) => {
  VoiceRSS.speech({
    key: '31bad78e21b24fa4bdfcde958f9117f2',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
};

// Get Jokes from Joke API
const getJokes = async () => {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //TextToSpeech
    tellMe(joke);
    //Disabled Button
    toggleButton();
  } catch (error) {
    console.log(`Whoops sorry,there is an error`, error);
  }
};

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
