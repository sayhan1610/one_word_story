document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const submitBtn = document.getElementById('submitBtn');
    const storyDiv = document.getElementById('story');

    let story = "";

    submitBtn.addEventListener('click', addUserWord);

    function addUserWord() {
        const word = userInput.value.trim();
        if (word) {
            story += ` ${word}`;
            updateStory();
            fetchNextWord(word);
        }
        userInput.value = '';
    }

    function updateStory() {
        storyDiv.textContent = story.trim();
    }

    function fetchNextWord(lastWord) {
        // Logic to determine the part of speech and fetch a word from the appropriate JSON file
        // For simplicity, we fetch a random word from one of the files

        const partsOfSpeech = ['nouns', 'verbs', 'adjectives', 'others'];
        const randomPart = partsOfSpeech[Math.floor(Math.random() * partsOfSpeech.length)];

        fetch(`words/${randomPart}.json`)
            .then(response => response.json())
            .then(data => {
                const words = data[randomPart];
                const nextWord = words[Math.floor(Math.random() * words.length)];
                story += ` ${nextWord}`;
                updateStory();
            })
            .catch(error => console.error('Error fetching word:', error));
    }
});
