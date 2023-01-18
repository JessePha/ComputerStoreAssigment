let bankBalance = 500;
let outstandingLoan = 0;
let pay = 0;
let loanTaken = false;

const laptopName = document.getElementById("laptop-title");

document.getElementById("bank-balance").innerHTML =
  "Bank Balance: " + bankBalance;
document.getElementById("outstanding-loan").innerHTML =
  "Outstanding Loan: " + outstandingLoan;

document
  .getElementById("get-loan-button")
  .addEventListener("click", function () {
    if (loanTaken) {
      alert(
        "You cannot get more than one bank loan before repaying the last loan"
      );
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
    document.getElementById("outstanding-loan").innerHTML =
      "Outstanding Loan: " + outstandingLoan;
    document.getElementById("repay-loan-button").style.display = "block";
  });

// document.getElementById("repay-loan-button").addEventListener("click", function() {
//   if (outstandingLoan > bankBalance) {
//     alert("You do not have enough funds to repay the loan");
//     return;
//   }
//   bankBalance -= outstandingLoan;
//   outstandingLoan = 0;
//   loanTaken = false;
//   document.getElementById("bank-balance").innerHTML = "Bank Balance: " + bankBalance;
//   document.getElementById("outstanding-loan").innerHTML = "Outstanding Loan: " + outstandingLoan;
//   document.getElementById("repay-loan-button").style.display = "none";
// });

document.getElementById("pay").innerHTML = "Pay: " + pay;

document.getElementById("work-button").addEventListener("click", function () {
  pay += 100;
  document.getElementById("pay").innerHTML = "Pay: " + pay;
});

document.getElementById("bank-button").addEventListener("click", function () {
  if (loanTaken) {
    let loanPayment = pay * 0.1;
    pay -= loanPayment;
    outstandingLoan -= loanPayment;
    document.getElementById("outstanding-loan").innerHTML =
      "Outstanding Loan: " + outstandingLoan;
  }
  bankBalance += pay;
  pay = 0;
  document.getElementById("pay").innerHTML = "Pay: " + pay;
  document.getElementById("bank-balance").innerHTML =
    "Bank Balance: " + bankBalance;
});

document
  .getElementById("repay-loan-button")
  .addEventListener("click", function () {
    if (pay >= outstandingLoan) {
      pay -= outstandingLoan;
      outstandingLoan = 0;
      loanTaken = false;
      document.getElementById("pay").innerHTML = "Pay: " + pay;
      document.getElementById("outstanding-loan").innerHTML =
        "Outstanding Loan: " + outstandingLoan;
      document.getElementById("repay-loan-button").style.display = "none";
    } else {
      alert("You do not have enough pay to repay the loan");
    }
  });

// Send a request to the API to retrieve the laptops data
fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then((response) => response.json())
  .then((data) => {
    let laptopSelect = document.getElementById("laptop-select");

    // Add the laptops options to the select box
    data.forEach((laptop) => {
      let option = document.createElement("option");
      option.value = laptop.id + 1;
      option.text = laptop.title;
      laptopSelect.appendChild(option);
    });

    // Display the features of the selected laptop
    handleSelector(data, laptopSelect);
  });

const handleSelector = (data, laptopSelect) => {
  laptopSelect.addEventListener("change", function () {
    let selectedLaptopId = this.value - 1;
    let selectedLaptop = data.find((laptop) => laptop.id === selectedLaptopId);
    let laptopFeatures = document.getElementById("laptop-features");
    // laptopFeatures.innerHTML = selectedLaptop.specs;
    document.getElementById("laptop-price").innerHTML = selectedLaptop.price;
    let featuresList = document.createElement("ul");

    selectedLaptop.specs.forEach((feature) => {
      let listItem = document.createElement("li");
      listItem.textContent = feature;
      featuresList.appendChild(listItem);
    });
    laptopFeatures.appendChild(featuresList);

    // Update the info section with the selected laptop's data
    let laptopImage = document.getElementById("laptop-image");

    laptopImage.src =
      "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image;

    //let laptopName = document.getElementById("laptop-title");
    laptopName.textContent = selectedLaptop.title;

    let laptopDescription = document.getElementById("laptop-description");
    laptopDescription.textContent = selectedLaptop.description;

    let laptopPrice = document.getElementById("laptop-price");
    laptopPrice.textContent = selectedLaptop.price + "Sek";

    buyBtnTrigger(data, selectedLaptop);
  });
};

const buyBtnTrigger = (data, selectedLaptop) => {
  let buyNowButton = document.getElementById("buy-now-button");
  buyNowButton.addEventListener("click", function () {
    // Check if the bank balance is sufficient to purchase the laptop
    if (selectedLaptop.price > bankBalance) {
      alert("You cannot afford this laptop.");
    } else if (bankBalance > selectedLaptop.price) {
      // Deduct the laptop price from the bank balance
      bankBalance -= selectedLaptop.price;
      document.getElementById("bank-balance").textContent = bankBalance;
      alert(
        "Congratulations! You are now the owner of a new " +
          selectedLaptop.price +
          " laptop."
      );
    }
  });
};
