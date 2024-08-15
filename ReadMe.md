# One Word Story Maker

**One Word Story Maker** is a web-based application that allows users to collaboratively create a story, one word at a time. The app provides an interactive interface where users can input words, and the application builds a story in real time. It also includes fun features like audio effects and the ability to copy the generated story to the clipboard.

## Features

- **Real-time Story Creation:** Users contribute one word at a time to form a story.
- **Grammar Rules:** The app uses simple rules to determine the part of speech and choose the next word appropriately.
- **Interactive UI:** Hover effects, animations, and sound effects enhance the user experience.
- **Story Copying:** Users can easily copy the generated story to their clipboard by clicking on it.
- **Customizable Audio Effects:** Play background audio and sound effects during story creation.

## Getting Started

### Prerequisites

To run this project locally, you'll need to have the following installed:

- Python 3.x
- Flask (`pip install flask[all]`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sayhan1610/one_word_story.git
   cd one_word_story
   ```

2. Install the required dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:

   ```bash
   python app.py
   ```

4. Open your web browser and go to `http://localhost:8080` to access the One Word Story Maker.

## Project Structure

- **`app.py`**: The Flask application that serves the HTML, CSS, and JavaScript files.
- **`templates/index.html`**: The main HTML file that serves as the user interface.
- **`static/styles.css`**: The CSS file for styling the UI.
- **`static/script.js`**: The JavaScript file containing the logic for adding words, fetching new words, and playing sounds.
- **`static/audio/`**: Directory containing audio files used in the application.
- **`requirements.txt`**: The dependencies required to run the application.

## Usage

1. **Start the Server:** Run the Flask server using `python app.py`.
2. **Interact with the UI:** Add words to the story using the input field and watch as the story unfolds. Click on the story text to copy it to your clipboard.
3. **Sound Effects:** Enjoy the sound effects that play each time you add a word or click on the story.

## License

This project is open-source and available under the MIT License. Feel free to use, modify, and distribute it as you see fit.
