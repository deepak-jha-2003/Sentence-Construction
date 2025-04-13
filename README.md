# Sentence Construction Tool

## Overview
The Sentence Construction Tool is an interactive React application designed to help users practice sentence formation by filling in blanks with the correct words from provided options. The tool features a timer, automatic navigation, and a detailed feedback screen to enhance the learning experience.

## Features
- **Interactive Sentence Construction**: Users can select words to fill in the blanks of incomplete sentences.
- **Timer**: Each question has a 30-second timer. The tool auto-navigates to the next question when time runs out.
- **Dynamic Feedback**: Immediate feedback on correct and incorrect answers is provided.
- **Responsive Design**: The application is fully responsive and works on various screen sizes.
- **Detailed Results**: A feedback screen displays the user's score, correct/incorrect answers, and the correct answers for any mistakes.

## Technical Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Routing**: React Router


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/deepak-jha-2003/Sentence-Construction.git

## Project Structure

src/
├── components/

│   ├── LandingScreen.tsx      # Landing page with quiz instructions

│   ├── QuizScreen.tsx         # Main quiz interface

│   ├── ResultsScreen.tsx      # Feedback screen after quiz completion

│   ├── Timer.tsx              # Timer component

│   └── WordOption.tsx         # Word selection component

├── hooks/

│   └── useFetchQuestions.ts   # Custom hook for fetching questions

├── types/

│   └── types.ts               # Type definitions

├── data/

│   └── sample.json            # Sample question data

└── App.tsx                    # Main application router

## Usage

### Landing Screen
- Click the **"Start"** button to begin the quiz.
- View instructions and Sentence Construction before starting.

### Quiz Screen
1. **Fill Blanks**:
   - Select words from the options below the sentence.
   - Words will automatically fill the next available blank (`_____`).

2. **Edit Selections**:
   - Click on any **filled word** in the sentence to remove it.
   - The word returns to the options pool for re-selection.

3. **Navigation**:
   - The **"Next"** button activates only when all blanks are filled.
   - Timer expires after 30 seconds → auto-submits current answers.

### Results Screen
- **Score Summary**

