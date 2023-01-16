let bankBalance = 500;
let outstandingLoan = 0;
let loanTaken = false;

document.getElementById("balance").innerHTML = "Bank Balance: " + bankBalance;
document.getElementById("outstanding-loan").innerHTML = "Outstanding Loan: " + outstandingLoan;

document.getElementById("get-loan-button").addEventListener("click", function() {
  if (loanTaken) {
    alert("You cannot get more than one bank loan before repaying the last loan");
    return;
  }
  let loanAmount = prompt("Enter loan amount:");
  if (loanAmount > bankBalance * 2) {
    alert("You cannot get a loan more than double of your bank balance");
    return;
  }
  if (loanAmount <= 0) {
    alert("Invalid loan amount");
    return;
  }
  loanTaken = true;
  outstandingLoan = loanAmount;
  document.getElementById("outstanding-loan").innerHTML = "Outstanding Loan: " + outstandingLoan;
  document.getElementById("repay-loan-button").style.display = "block";
});

let pay = 0;


document.getElementById("pay").innerHTML = "Pay: " + pay;

document.getElementById("work-button").addEventListener("click", function() {
  pay += 100;
  document.getElementById("pay").innerHTML = "Pay: " + pay;
});

document.getElementById("bank-button").addEventListener("click", function() {
  if (loanTaken) {
    let loanPayment = pay * 0.1;
    pay -= loanPayment;
    outstandingLoan -= loanPayment;
    document.getElementById("outstanding-loan").innerHTML = "Outstanding Loan: " + outstandingLoan;
  }
  bankBalance += pay;
  pay = 0;
  document.getElementById("pay").innerHTML = "Pay: " + pay;
  document.getElementById("balance").innerHTML = "Bank Balance: " + bankBalance;
});

document.getElementById("repay-loan-button").addEventListener("click", function() {
  if (pay >= outstandingLoan) {
    pay -= outstandingLoan;
    outstandingLoan = 0;
    loanTaken = false;
    document.getElementById("pay").innerHTML = "Pay: " + pay;
    document.getElementById("outstanding-loan").innerHTML = "Outstanding Loan: " + outstandingLoan;
    document.getElementById("repay-loan-button").style.display = "none";
  } else {
    alert("You do not have enough pay to repay the loan");
  }
});



// Send a request to the API to retrieve the laptops data
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => {
        let laptopSelect = document.getElementById("laptop-select");

        // Add the laptops options to the select box
        data.forEach(laptop => {
            let option = document.createElement("option");
            option.value = laptop.id;
            option.text = laptop.title;
            laptopSelect.appendChild(option);
        });

        // Display the features of the selected laptop
        laptopSelect.addEventListener("change", function() {
        let selectedLaptopId = this.value -1;
        let selectedLaptop = data.find(laptop => laptop.id === selectedLaptopId);
        let laptopFeatures = document.getElementById("laptop-features");
        laptopFeatures.innerHTML = selectedLaptop.specs;

        let featuresList = document.createElement("ul");
        selectedLaptop.features.forEach(feature => {
            let listItem = document.createElement("li");
            listItem.textContent = feature;
            featuresList.appendChild(listItem);
        });
        laptopFeatures.appendChild(featuresList);

        // Update the info section with the selected laptop's data
        let laptopImage = document.getElementById("laptop-image");
        
        laptopImage.src = "https://hickory-quilled-actress.glitch.me" + selectedLaptop.image;
        
        let laptopName = document.getElementById("laptop-name");
        laptopName.textContent = selectedLaptop.name;

        let laptopDescription = document.getElementById("laptop-description");
        laptopDescription.textContent = selectedLaptop.description;

        let laptopPrice = document.getElementById("laptop-price");
        laptopPrice.textContent = "sek" + selectedLaptop.price;
        
    });
});

let buyNowButton = document.getElementById("buy-now-button");
buyNowButton.addEventListener("click", function() {
    // Get the selected laptop's price
    let selectedLaptopId = document.getElementById("laptop-select").value;
    let selectedLaptop = data.find(laptop => laptop.id === selectedLaptopId);
    let laptopPrice = selectedLaptop.price;

    // Get the current bank balance
    let bankBalance = parseFloat(document.getElementById("bank-balance").textContent);

    // Check if the bank balance is sufficient to purchase the laptop
    if (laptopPrice > bankBalance) {
        alert("You cannot afford this laptop.");
    } else {
        // Deduct the laptop price from the bank balance
        bankBalance -= laptopPrice;
        document.getElementById("bank-balance").textContent = bankBalance;

        alert("Congratulations! You are now the owner of a new " + selectedLaptop.name + " laptop.");
    }
});



