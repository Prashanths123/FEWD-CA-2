let score = 0;
let timer;
let intervalTime = 3000; // Initial interval time (3 seconds)

const pokemonImages = [
    'pok_1-removebg-preview.png',
    'pok_2-removebg-preview.png',
    'pok_3-removebg-preview.png',
    'pok_4-removebg-preview.png',
    // Added paths to your Pokémon images
];
const nonPokemonImages = [
    'download-removebg-preview.png',
    'non_pok_1-removebg-preview.png',
    // Added paths to your non-Pokémon images
];

// Function to get a random image
function getRandomImage(isPokemon) {
    const images = isPokemon ? pokemonImages : nonPokemonImages;
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}


function updateScoreBoard() {
    document.getElementById('score').textContent = score; // To update score in the HTML
}

// This Function is to play sound effects
function playSound(isPokemon) {
    const sound = new Audio();
    sound.src = isPokemon ? 'pokemon_sound.mp3' : 'nonpokemon_sound.mp3';
    sound.play();
}

// To play click sound
const clickSound = new Audio('click3.mp3');

// Function to show a random image
function showRandomImage() {
    const isPokemon = Math.random() < 0.6; // 60% chance for Pokémon image
    const imageUrl = getRandomImage(isPokemon);
    const gameImage = document.getElementById('game-image');
    gameImage.src = imageUrl;
    gameImage.dataset.isPokemon = isPokemon;

    // Play sound effect
    playSound(isPokemon);
}

function handleImageClick() {
    clickSound.play(); // To play click sound

    if (this.dataset.isPokemon === 'true') {
        score++;

        // To check if score is a multiple of 5 to decrease interval time
        if (score % 5 === 0) {
            decreaseIntervalTime();
        }
    } else {
        clearInterval(timer);
        localStorage.setItem('finalScore', score); // Store score in localStorage
        window.location.href = 'gameover.html'; 
    }
    updateScoreBoard();
    showRandomImage();
}

function decreaseIntervalTime() {
    intervalTime = Math.max(1000, intervalTime - 1000); // Decreases interval by 1 second or minimum 1 second
    clearInterval(timer);
    timer = setInterval(showRandomImage, intervalTime);
}

// Initialize the game and set up the timer to change the image every initial intervalTime
document.getElementById('game-image').addEventListener('click', handleImageClick);
updateScoreBoard();
showRandomImage();
timer = setInterval(showRandomImage, intervalTime); 
