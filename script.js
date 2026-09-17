```javascript
// Get students from Local Storage

let students = JSON.parse(localStorage.getItem("students")) || [];


// Show Section

function showSection(sectionName) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    document.getElementById(sectionName).classList.remove("hidden");

    if (sectionName === "students") {
        displayStudents();
    }

    updateDashboard();
}


// Add / Update Student

document.getElementById("studentForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let id = document.getElementById("studentId").value;

    let name = document.getElementById("name").value.trim();
    let rollNo = document.getElementById("rollNo").value.trim();
    let email = document.getElementById("email").value.trim();
    let gender = document.getElementById("gender").value;
    let department = document.getElementById("department").value;
    let year = document.getElementById("year").value;
    let attendance = document.getElementById("attendance").value;


    // Validation

    if (
        name === "" ||
        rollNo === "" ||
        email === "" ||
        gender === "" ||
        department === "" ||
        year === "" ||
        attendance === ""
    ) {
        alert("Please fill all fields");
        return;
    }


    if (attendance < 0 || attendance > 100) {
        alert("Attendance must be between 0 and 100");
        return;
    }


    // Update Student

    if (id !== "") {

        let student = students.find(function(s) {
            return s.id == id;
        });

        student.name = name;
        student.rollNo = rollNo;
        student.email = email;
        student.gender = gender;
        student.department = department;
        student.year = year;
        student.attendance = attendance;

        alert("Student updated successfully");

    }

    // Create Student

    else {

        let newStudent = {
            id: Date.now(),
            name: name,
            rollNo: rollNo,
            email: email,
            gender: gender,
            department: department,
            year: year,
            attendance: attendance
        };

        students.push(newStudent);

        alert("Student added successfully");
    }


    // Save to Local Storage

    localStorage.setItem("students", JSON.stringify(students));


    // Reset form

    document.getElementById("studentForm").reset();

    document.getElementById("studentId").value = "";

    showSection("students");

});


// Display Students

function displayStudents(list = students) {

    let table = document.getElementById("studentTable");

    table.innerHTML = "";


    if (list.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="9" style="text-align:center;">
                    No students found
                </td>
            </tr>
        `;

        return;
    }


    list.forEach(function(student, index) {

        let row = `
            <tr>

                <td>${index + 1}</td>

                <td>${student.name}</td>

                <td>${student.rollNo}</td>

                <td>${student.email}</td>

                <td>${student.gender}</td>

                <td>${student.department}</td>

                <td>${student.year}</td>

                <td>${student.attendance}%</td>

                <td>

                    <button class="edit-btn"
                        onclick="editStudent(${student.id})">
                        Edit
                    </button>

                    <button class="delete-btn"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

        table.innerHTML += row;

    });

}


// Edit Student

function editStudent(id) {

    let student = students.find(function(s) {
        return s.id == id;
    });


    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("rollNo").value = student.rollNo;
    document.getElementById("email").value = student.email;
    document.getElementById("gender").value = student.gender;
    document.getElementById("department").value = student.department;
    document.getElementById("year").value = student.year;
    document.getElementById("attendance").value = student.attendance;


    showSection("addStudent");
}


// Delete Student

function deleteStudent(id) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );


    if (confirmDelete) {

        students = students.filter(function(student) {
            return student.id != id;
        });


        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        displayStudents();

        updateDashboard();

        alert("Student deleted successfully");
    }
}


// Search Students

function searchStudents() {

    let searchText =
        document.getElementById("search").value.toLowerCase();


    let filteredStudents = students.filter(function(student) {

        return (
            student.name.toLowerCase().includes(searchText) ||
            student.rollNo.toLowerCase().includes(searchText) ||
            student.department.toLowerCase().includes(searchText)
        );

    });


    displayStudents(filteredStudents);
}


// Dashboard

function updateDashboard() {

    document.getElementById("totalStudents").innerText =
        students.length;


    let male = students.filter(function(student) {
        return student.gender === "Male";
    }).length;


    let female = students.filter(function(student) {
        return student.gender === "Female";
    }).length;


    document.getElementById("maleStudents").innerText = male;

    document.getElementById("femaleStudents").innerText = female;


    // Average Attendance

    if (students.length === 0) {

        document.getElementById("averageAttendance").innerText = "0%";

    } else {

        let total = 0;

        students.forEach(function(student) {
            total += Number(student.attendance);
        });

        let average = Math.round(total / students.length);

        document.getElementById("averageAttendance").innerText =
            average + "%";
    }


    // Department Count

    updateDepartment("CSE", "cseProgress");
    updateDepartment("ECE", "eceProgress");
    updateDepartment("EEE", "eeeProgress");
    updateDepartment("IT", "itProgress");

}


// Department Statistics

function updateDepartment(department, elementId) {

    let count = students.filter(function(student) {

        return student.department === department;

    }).length;


    let percentage = 0;


    if (students.length > 0) {

        percentage = (count / students.length) * 100;

    }


    document.getElementById(elementId).style.width =
        percentage + "%";
}


// Initial Load

updateDashboard();

displayStudents();
```
