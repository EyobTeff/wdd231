const courses = [
    { code: "CSE 110", type: "CSE", completed: true },
    { code: "WDD 130", type: "WDD", completed: true },
    { code: "CSE 111", type: "CSE", completed: true },
    { code: "CSE 210", type: "CSE", completed: false },
    { code: "WDD 131", type: "WDD", completed: true },
    { code: "WDD 231", type: "WDD", completed: false }
];

// ✅ Function to display courses based on filter
function displayCourses(filter) {
    const courseList = document.getElementById("courseList");
    courseList.innerHTML = "";

    let filteredCourses = courses;
    if (filter !== "all") {
        filteredCourses = courses.filter(course => course.type === filter);
    }

    filteredCourses.forEach(course => {
        const div = document.createElement("div");
        div.textContent = course.code;
        div.classList.add("course"); // Always add base "course" class
        div.classList.add(course.completed ? "completed" : "pending"); // Add completed or pending class
        courseList.appendChild(div);
    });
}

// ✅ Function to calculate total completed course credits
function calculateCredits() {
    let total = courses.filter(course => course.completed).length * 3; // Assuming 3 credits per completed course
    document.getElementById("creditTotal").textContent = `Total Credits: ${total}`;
}

// ✅ Ensure the courses & total credits are displayed on page load
document.addEventListener("DOMContentLoaded", function () {
    displayCourses("all");
    calculateCredits(); // Calculate total credits on load
});
