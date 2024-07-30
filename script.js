document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const submitBtn = document.getElementById('submitBtn');
    const storyDiv = document.getElementById('story');

    // Log to check if elements are correctly selected
    console.log(userInput, submitBtn, storyDiv); // This should not log `null`

    if (!userInput || !submitBtn || !storyDiv) {
        console.error('One or more elements are not found in the DOM.');
        return;
    }

    let story = "";
    let lastPartOfSpeech = null;

    submitBtn.addEventListener('click', addUserWord);

    storyDiv.addEventListener('click', function() {
        const textToCopy = storyDiv.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    function addUserWord() {
        console.log('Button clicked'); // Log to check if function is called

        const word = userInput.value.trim();
        if (word) {
            const punctuation = getPunctuation(word);
            const cleanWord = word.replace(/[.,!?;:]$/, '');

            story += ` ${cleanWord}${punctuation ? punctuation : ' '}`;
            story = formatStory(story); // Ensure proper formatting
            updateStory();
            lastPartOfSpeech = determinePartOfSpeech(cleanWord);
            fetchNextWord();
        }
        userInput.value = '';
    }

    function updateStory() {
        storyDiv.textContent = story.trim();
    }

    function formatStory(text) {
        return text.replace(/([.!?])([a-zA-Z])/g, '$1 $2')  // Add space after punctuation if missing
                   .replace(/(?:^|\.\s*)([a-z])/g, (match, p1) => match.replace(p1, p1.toUpperCase())); // Capitalize after full stop
    }

    function determinePartOfSpeech(word) {
        const lowerWord = word.toLowerCase();
        
        if (lowerWord.endsWith('ing')) {
            return 'verb';
        }

        if (lowerWord.endsWith('s') && !lowerWord.endsWith('ss') && !lowerWord.endsWith('ies') && !lowerWord.endsWith('ves') && !lowerWord.endsWith('men')) {
            return 'noun';
        }

        const nounEndings = ['s', 'es', 'ies', 'ves', 'men'];
        for (const ending of nounEndings) {
            if (lowerWord.endsWith(ending)) {
                return 'noun';
            }
        }

        const verbEndings = ['ing', 'ed'];
        for (const ending of verbEndings) {
            if (lowerWord.endsWith(ending)) {
                return 'verb';
            }
        }

        if (isPreposition(lowerWord)) return 'preposition';
        if (isConjunction(lowerWord)) return 'conjunction';
        if (isPronoun(lowerWord)) return 'pronoun';
        if (isInterjection(lowerWord)) return 'interjection';
        if (isAdjective(lowerWord)) return 'adjective';
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
                const words = data[nextPartOfSpeech] || [];
                const nextWord = words[Math.floor(Math.random() * words.length)];
                const wordToAdd = nextPartOfSpeech === 'noun' ? pluralize(nextWord) : nextWord;
                story += ` ${capitalizeIfNeeded(wordToAdd)} `;
                story = formatStory(story); // Ensure proper formatting
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

    function getPunctuation(word) {
        const punctuationMarks = ['.', ',', '!', '?', ';', ':'];
        const lastChar = word.slice(-1);
        return punctuationMarks.includes(lastChar) ? lastChar : '';
    }

    function capitalizeIfNeeded(word) {
        const capitalizedWords = ['i', 'monday', 'january', 'new', 'york', 'london'];
        return capitalizedWords.includes(word.toLowerCase()) ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    }

    function pluralize(word) {
        const lowerWord = word.toLowerCase();
        if (lowerWord.endsWith('y')) {
            return word.slice(0, -1) + 'ies';
        }
        if (lowerWord.endsWith('s') || lowerWord.endsWith('sh') || lowerWord.endsWith('ch')) {
            return word + 'es';
        }
        if (lowerWord.endsWith('f')) {
            return word.slice(0, -1) + 'ves';
        }
        if (lowerWord.endsWith('man')) {
            return word.slice(0, -2) + 'men';
        }
        return word + 's';
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
