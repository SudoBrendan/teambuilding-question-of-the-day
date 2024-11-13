// Function to get a unique question for each weekday, skipping weekends
async function getWeekdayQuestion() {
    const questions = await loadQuestions();
    const today = new Date(2024,10,5);
    console.log("Today: "+today)
    const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday

    // If it's a weekend (Saturday or Sunday), return no question
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return "Enjoy your weekend! No question today.";
    }

    // Get the daily index
    const questionIndex = calculateWeekdayIndex(today, questions.length);
    console.log("Question Index: "+questionIndex)
    return questions[questionIndex];
}

// Function to load questions from the questions.txt file
async function loadQuestions() {
    const response = await fetch('shuffled_questions.txt');
    const text = await response.text();
    return text.split('\n').filter(line => line.trim() !== '');
}

// Function to calculate the weekday-only index based on days since a start date
function calculateWeekdayIndex(today, questionCount) {
    const baseDate = new Date("2024-01-01"); // Set your starting date

    let weekdaysCount = 0;
    let currentDate = new Date(baseDate); // Start counting from the base date

    // Loop through each day until we reach today
    while (currentDate <= today) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays (0) and Saturdays (6)
            weekdaysCount++;
        }
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Calculate the index for weekdays only
    return weekdaysCount % questionCount;
}

// Display the question on load
document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("questionDisplay").innerText = await getWeekdayQuestion();
});
