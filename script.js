// Function to load questions from the questions.txt file
async function loadQuestions() {
    const response = await fetch('shuffled_questions.txt');
    const text = await response.text();
    return text.split('\n').filter(line => line.trim() !== '' && !line.startsWith('#'));
}

// Function to get the date from a query parameter, if provided
function getDateFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const dateParam = params.get('date');
    const timestampParam = params.get('timestamp');

    if (dateParam) {
        console.log(`param date: ${dateParam}`)
        // Parse the date as a local date (not UTC) by splitting and setting individual components
        const [year, month, day] = dateParam.split('-').map(Number);
        const parsedDate = new Date(year, month - 1, day); // Month is 0-indexed in Date

        if (!isNaN(parsedDate)) {
            return parsedDate;
        }
    } else if (timestampParam) {
        console.log(`param timestamp: ${timestampParam}`)
        const epoch = parseInt(timestampParam, 10)
        const parsedDate = new Date(epoch*1000)
        console.log(`parsed date: ${parsedDate}`)
        if (!isNaN(parsedDate)) {
            return parsedDate;
        }
    }
    
    // Default to today if no valid date parameter is provided
    return getCurrentUTCDate();
}

function getCurrentUTCDate() {
    const now = new Date().getTime()
    const utcDate = new Date(now)
    console.log(`UTC Date: ${utcDate.toDateString()}`);
    return utcDate;
}

// Function to calculate the weekday-only index based on days since a start date
function calculateWeekdayIndex(targetDate, questionCount) {
    const baseDate = new Date(Date.UTC(2024, 0, 1)); // January is month 0

    let weekdaysCount = 0;
    let currentDate = new Date(baseDate);

    // Loop through each day until we reach the target date
    while (currentDate <= targetDate) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sundays (0) and Saturdays (6)
            weekdaysCount++;
        }
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Calculate the index for weekdays only
    const questionIndex = weekdaysCount % questionCount;
    console.log(`Target Date: ${targetDate.toDateString()}`);
    console.log(`Question Index: ${questionIndex}`);
    return questionIndex;
}

// Function to get a unique question for each weekday, skipping weekends
async function getWeekdayQuestion() {
    const questions = await loadQuestions();
    const targetDate = getDateFromQuery(); // Use the query parameter date or today
    const dayOfWeek = targetDate.getDay(); // 0 is Sunday, 6 is Saturday

    // If it's a weekend (Saturday or Sunday), return no question
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        console.log(`Target Date: ${targetDate.toDateString()} - No question on weekends.`);
        return "Enjoy your weekend! No question today.";
    }

    // Get the weekday-only index
    const questionIndex = calculateWeekdayIndex(targetDate, questions.length);
    return questions[questionIndex];
}

// Display the question on load
document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("questionDisplay").innerText = await getWeekdayQuestion();
});
