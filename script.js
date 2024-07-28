document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const submitBtn = document.getElementById('submitBtn');
    const storyDiv = document.getElementById('story');

    let story = "";
    let lastPartOfSpeech = null;

    submitBtn.addEventListener('click', addUserWord);

    function addUserWord() {
        const word = userInput.value.trim();
        if (word) {
            story += ` ${word}`;
            updateStory();
            lastPartOfSpeech = determinePartOfSpeech(word);
            fetchNextWord();
        }
        userInput.value = '';
    }

    function updateStory() {
        storyDiv.textContent = story.trim();
    }

    function determinePartOfSpeech(word) {
        const endings = {
            'ly': 'adverb',
            'ing': 'verb',
            'ed': 'verb',
            's': 'noun'
        };

        for (const ending in endings) {
            if (word.endsWith(ending)) {
                return endings[ending];
            }
        }

        if (isPreposition(word)) return 'preposition';
        if (isConjunction(word)) return 'conjunction';
        if (isPronoun(word)) return 'pronoun';
        if (isInterjection(word)) return 'interjection';
        if (isAdjective(word)) return 'adjective';
        return 'noun';
    }

    function fetchNextWord() {
        const nextPartOfSpeech = getNextPartOfSpeech(lastPartOfSpeech);
        const url = `words.json`;

        console.log(`Fetching URL: ${url}`);  // Debug log to check URL

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const words = data[nextPartOfSpeech];
                const nextWord = words[Math.floor(Math.random() * words.length)];
                story += ` ${nextWord}`;
                updateStory();
                lastPartOfSpeech = nextPartOfSpeech;
            })
            .catch(error => console.error('Error fetching word:', error));
    }

    function getNextPartOfSpeech(lastPartOfSpeech) {
        const rules = {
            'noun': ['verb', 'adjective', 'preposition'],
            'verb': ['noun', 'adverb', 'pronoun'],
            'adjective': ['noun'],
            'adverb': ['verb', 'adjective'],
            'preposition': ['noun', 'pronoun'],
            'conjunction': ['noun', 'verb', 'adjective', 'adverb'],
            'pronoun': ['verb', 'noun'],
            'interjection': ['noun', 'verb']
        };

        const possibleNextParts = rules[lastPartOfSpeech] || ['noun'];
        return possibleNextParts[Math.floor(Math.random() * possibleNextParts.length)];
    }

    function isPreposition(word) {
        const prepositions = ['in', 'on', 'at', 'by', 'with', 'about', 'against', 'among'];
        return prepositions.includes(word.toLowerCase());
    }

    function isConjunction(word) {
        const conjunctions = ['and', 'or', 'but', 'nor', 'so', 'for', 'yet'];
        return conjunctions.includes(word.toLowerCase());
    }

    function isPronoun(word) {
        const pronouns = ['he', 'she', 'it', 'they', 'we', 'you', 'I', 'me', 'him', 'her', 'us', 'them'];
        return pronouns.includes(word.toLowerCase());
    }

    function isInterjection(word) {
        const interjections = ['wow', 'ouch', 'hey', 'oh', 'oops', 'ah', 'hmm'];
        return interjections.includes(word.toLowerCase());
    }

    function isAdjective(word) {
        const commonAdjectiveEndings = ['y', 'able', 'ible', 'al', 'ful', 'ic', 'ive', 'less', 'ous'];
        return commonAdjectiveEndings.some(ending => word.endsWith(ending));
    }
});
