// -------------------------------
// Login Details
// -------------------------------

const LOGIN_USERNAME = "admin";
const LOGIN_PASSWORD = "1234";

// -------------------------------
// Load Customers from Local Storage
// -------------------------------

let customers = JSON.parse(localStorage.getItem("customers")) || [];

// -------------------------------
// Login Function
// -------------------------------

function login() {

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === LOGIN_USERNAME && password === LOGIN_PASSWORD) {

        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";

        displayCustomers();

    } else {

        alert("Invalid Username or Password");

    }

}

// -------------------------------
// Save Data
// -------------------------------

function saveCustomers() {

    localStorage.setItem("customers", JSON.stringify(customers));

}

// -------------------------------
// Add Customer
// -------------------------------

function addCustomer() {

    let name = document.getElementById("customerName").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let credit = parseFloat(document.getElementById("credit").value);

    if (name === "" || phone === "" || isNaN(credit)) {

        alert("Please fill all fields.");

        return;

    }

    customers.push({

        name: name,
        phone: phone,
        credit: credit

    });

    saveCustomers();

    clearForm();

    displayCustomers();

}

// -------------------------------
// Clear Form
// -------------------------------

function clearForm() {

    document.getElementById("customerName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("credit").value = "";

}

// -------------------------------
// Display Customers
// -------------------------------

function displayCustomers() {

    let table = document.getElementById("tableBody");

    table.innerHTML = "";

    let totalCredit = 0;

    customers.forEach((customer, index) => {

        totalCredit += customer.credit;

        table.innerHTML += `

        <tr>

            <td>${customer.name}</td>

            <td>${customer.phone}</td>

            <td>₹ ${customer.credit.toFixed(2)}</td>

            <td>
                <button class="add" onclick="addCredit(${index})">
                    + Credit
                </button>
            </td>

            <td>
                <button class="pay" onclick="receiveMoney(${index})">
                    Receive
                </button>
            </td>

            <td>
                <button class="delete" onclick="deleteCustomer(${index})">
                    Delete
                </button>
            </td>

        </tr>

        `;

    });

    document.getElementById("total").innerText = totalCredit.toFixed(2);

}

// -------------------------------
// Add Credit
// -------------------------------

function addCredit(index) {

    let amount = prompt("Enter Credit Amount");

    if (amount === null) return;

    amount = parseFloat(amount);

    if (isNaN(amount) || amount <= 0) {

        alert("Invalid Amount");

        return;

    }

    customers[index].credit += amount;

    saveCustomers();

    displayCustomers();

}

// -------------------------------
// Receive Money
// -------------------------------

function receiveMoney(index) {

    let amount = prompt("Enter Received Amount");

    if (amount === null) return;

    amount = parseFloat(amount);

    if (isNaN(amount) || amount <= 0) {

        alert("Invalid Amount");

        return;

    }

    customers[index].credit -= amount;

    if (customers[index].credit < 0) {

        customers[index].credit = 0;

    }

    saveCustomers();

    displayCustomers();

}

// -------------------------------
// Delete Customer
// -------------------------------

function deleteCustomer(index) {

    if (confirm("Delete this customer?")) {

        customers.splice(index, 1);

        saveCustomers();

        displayCustomers();

    }

}

// -------------------------------
// Search Customer
// -------------------------------

function searchCustomer() {

    let search = document.getElementById("search").value.toLowerCase();

    let rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {

        let name = row.cells[0].innerText.toLowerCase();

        if (name.includes(search)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    });

}