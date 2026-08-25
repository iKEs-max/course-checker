// 1. Our Mock Database
// This object maps a course to an array of its prerequisite course IDs.
const courseDatabase = {
    "DCIT201": ["DCIT101", "DCIT103"], // Data Structures requires Intro & Foundations
    "DCIT301": ["DCIT201", "MATH121"]  // Operating Systems requires Data Structures & Math
};

// 2. Grab the HTML elements we need to interact with
const checkBtn = document.getElementById('checkBtn');
const completedSelect = document.getElementById('completedCourses');
const targetSelect = document.getElementById('targetCourse');
const resultDiv = document.getElementById('result');

// 3. Add an event listener to the button
checkBtn.addEventListener('click', function() {
    
    // Get all selected completed courses from the dropdown
    let selectedOptions = completedSelect.selectedOptions;
    let completedCourses = [];
    
    // Loop through the selected options and push their values to our array
    for (let i = 0; i < selectedOptions.length; i++) {
        completedCourses.push(selectedOptions[i].value);
    }

    // Get the target course the user wants to take
    let targetCourse = targetSelect.value;

    // 4. The Logic: Check if the target course exists in our database
    if (courseDatabase[targetCourse]) {
        
        // Get the list of required courses for the target
        let requiredCourses = courseDatabase[targetCourse];
        
        // Check if EVERY required course is inside the completedCourses array
        let isEligible = requiredCourses.every(req => completedCourses.includes(req));

        // 5. Display the result to the user
        if (isEligible) {
            resultDiv.innerHTML = " ELIGIBLE: You have all the required pre-requisites!";
            resultDiv.className = "mt-4 text-center fw-bold fs-4 text-success";
        } else {
            // Find out which ones are missing
            let missing = requiredCourses.filter(req => !completedCourses.includes(req));
            resultDiv.innerHTML = ` NOT ELIGIBLE: You are missing ${missing.join(', ')}`;
            resultDiv.className = "mt-4 text-center fw-bold fs-4 text-danger";
        }
    } else {
        resultDiv.innerHTML = " Course not found in database.";
        resultDiv.className = "mt-4 text-center fw-bold fs-4 text-warning";
    }
});