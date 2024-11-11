// Function to load questions from the questions.txt file
async function loadQuestions() {
    const response = await fetch('shuffled_questions.txt');
    const text = await response.text();
    return text.split('\n').filter(line => line.trim() !== '');
}

// Function to get a unique question for each weekday, skipping weekends
async function getWeekdayQuestion() {
    const questions = await loadQuestions();
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday

    // If it's a weekend (Saturday or Sunday), return no question
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return "Enjoy your weekend! No question today.";
    }

    // Calculate a unique question index for weekdays only
    const baseDate = new Date("2024-01-01");
    const dayDifference = Math.floor((today - baseDate) / (1000 * 60 * 60 * 24));
    const weekdayIndex = Math.floor(dayDifference / 5); // Only count weekdays

    const questionIndex = weekdayIndex % questions.length;
    return questions[questionIndex];
}

// Display the question on load
document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("questionDisplay").innerText = await getWeekdayQuestion();
});
