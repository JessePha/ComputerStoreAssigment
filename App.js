let bankBalance = 500; //initialize bank balance
let outstandingLoan = 0; //initialize outstanding loan
let pay = 0; //initialize pay variable 
let loanTaken = false; //initialize loan taken variable

//select element with id "laptop-title"
const laptopName = document.getElementById("laptop-title");

//update element with id "bank-balance" with bank balance
document.getElementById("bank-balance").innerHTML =
  "Bank Balance: " + bankBalance;
//update element with id "outstanding-loan" with outstanding loan
document.getElementById("outstanding-loan").innerHTML =
  "Outstanding Loan: " + outstandingLoan;

//event listener for button with id "get-loan-button"
//check if loan has been taken before
document
  .getElementById("get-loan-button")
  .addEventListener("click", function () {
    if (loanTaken) {
      alert(
        "You cannot get more than one bank loan before repaying the last loan"
      );
      return;
    }
  //prompt user for loan amount
    let loanAmount = prompt("Enter loan amount:");
  //check if loan amount is more than double of bank balance
    if (loanAmount > bankBalance * 2) {
      alert("You cannot get a loan more than double of your bank balance");
      return;
    }
    //check if loan amount is valid
    if (loanAmount <= 0) {
      alert("Invalid loan amount");
      return;
    }
    loanTaken = true; //set loan taken to true
    outstandingLoan = loanAmount;
    //update outstanding loan on webpage
    document.getElementById("outstanding-loan").innerHTML =
      "Outstanding Loan: " + outstandingLoan;
    document.getElementById("repay-loan-button").style.display = "block"; //display repay loan button
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

//update element with id "pay" with pay
document.getElementById("pay").innerHTML = "Pay: " + pay;

//event listener for button with id "work-button"
document.getElementById("work-button").addEventListener("click", function () {
  pay += 100; //increment pay by 100
  document.getElementById("pay").innerHTML = "Pay: " + pay;
  //update pay on webpage
});

//event listener for button with id "bank-button"
 //check if loan has been taken
document.getElementById("bank-button").addEventListener("click", function () {
  if (loanTaken) {
    let loanPayment = pay * 0.1; //calculate loan payment
    pay -= loanPayment; //subtract loan payment from pay
    outstandingLoan -= loanPayment; //subtract loan payment from outstanding loan
    document.getElementById("outstanding-loan").innerHTML =
      "Outstanding Loan: " + outstandingLoan; //update outstanding loan on webpage
  }
  bankBalance += pay; //add pay to bank balance
  pay = 0; //reset pay to 0
  document.getElementById("pay").innerHTML = "Pay: " + pay; //update pay on webpage
  document.getElementById("bank-balance").innerHTML =
    "Bank Balance: " + bankBalance; //update bank balance on webpage
});

//event listener for button with id "repay-loan-button"
//check if pay is enough to repay loan
document
  .getElementById("repay-loan-button")
  .addEventListener("click", function () {
    if (pay >= outstandingLoan) { 
      pay -= outstandingLoan; //subtract outstanding loan from pay
      outstandingLoan = 0; //set outstanding loan to 0
      loanTaken = false; //set loan taken to false
      //update pay on webpage
      document.getElementById("pay").innerHTML = "Pay: " + pay;
      //update outstanding loan on webpage
      document.getElementById("outstanding-loan").innerHTML =
        "Outstanding Loan: " + outstandingLoan;
     //hide repay loan button
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
