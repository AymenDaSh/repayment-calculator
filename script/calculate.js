//default page
let resultHTML = `
<img class="empty-img" src="assets/images/illustration-empty.svg" alt="empty result icon">
<p class="empty-title">Results shown here</p>
<p class="empty-text">
  Complete the form and click "calculate repayments"
  to see what your monthly repayments would be.
</p>
`;
let resultContainerHTML = document.querySelector(".result-container");
resultContainerHTML.innerHTML = resultHTML;

// all input elements
const mortgageAmountHTML = document.querySelector(".js-mortgage-amount-input");
const mortgageTermHTML = document.querySelector(".js-mortgage-term-input");
const mortgageRateHTML = document.querySelector(".js-mortgage-rate");

function calculateRepayments() {
    document.querySelector(".js-btn").addEventListener('click',() => {

      if (!errorHandling()) return;

      const result = calculation();
      resultHTML = `
            <p class="results-title">Your results</p>
            <p class="result-description">
              Your results are shown below based
              on the information you provided. 
              To adjust the results, edit the form and click 
              "calculate repayments" again.
            </p>
            <div class="calculated-result-container">
              <p class="calculated-result-title">Your monthly repayments</p>
              <p class="results">$${result.result}</p>
              <hr>
              <p class="total-title">Total you'll repay over the term</p>
              <p class="total">$${result.totalInterestOnlyRepayment}</p>
            </div>
      `;
      resultContainerHTML.innerHTML = resultHTML;
      resultContainerHTML.classList.remove("result-container-empty");
    })

}

function clear(){
document.querySelector(".js-clear-link").addEventListener("click", () => {
  resultHTML = `
        <img class="empty-img" src="assets/images/illustration-empty.svg">
        <p class="empty-title">Results shown here</p>
        <p class="empty-text">
          Complete the form and click "calculate repayments"
          to see what your monthly repayments would be.
        </p>
  `;
  resultContainerHTML.innerHTML = resultHTML;
  resultContainerHTML.classList.add("result-container-empty");  

  document.querySelector(".checkbox-repayments").classList.remove("checkmark-checked")
  document.querySelector(".checkbox-interest-only").classList.remove("checkmark-checked")

  document.querySelector(".checkmark-repayments").classList.remove("checkmark-checked")
  document.querySelector(".checkmark-interest-only").classList.remove("checkmark-checked")
  
  document.querySelector(".error-type").classList.remove("error-activated")

  mortgageAmountHTML.classList.remove("error-input");
  document.querySelector(".currency").classList.remove("error-signe");
  document.querySelector(".error-amount").classList.remove("error-activated");

  mortgageTermHTML.classList.remove("error-input");
  document.querySelector(".years").classList.remove("error-signe");
  document.querySelector(".error-term").classList.remove("error-activated");

  mortgageRateHTML.classList.remove("error-input");
  document.querySelector(".rate").classList.remove("error-signe");
  document.querySelector(".error-rate").classList.remove("error-activated");
})
}

function calculation(){
  const checkboxRepayment = document.querySelector(".checkbox-repayments");
  const checkboxInterestOnly = document.querySelector(".checkbox-interest-only");
  const mortgageAmount = mortgageAmountHTML.value;
  const mortgageTerm = mortgageTermHTML.value;
  const mortgageRate = mortgageRateHTML.value;
  
  
  const principal = parseFloat(mortgageAmount);
  const monthlyInterestRate = parseFloat(mortgageRate) / 100 / 12;
  const numberOfPayments = parseFloat(mortgageTerm) * 12;

  // Standard repayments 

  let monthlyRepayment;
  if (monthlyInterestRate === 0) {
      monthlyRepayment = principal / numberOfPayments; // Handle 0% interest rate
  } else {
      monthlyRepayment = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                          (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  } 

  // Interest-Only Mortgage
  const interestOnlyPayment = principal * monthlyInterestRate;

  // Total you will repay over the term 
  const totalInterestOnlyRepayment = interestOnlyPayment * numberOfPayments;

  //return results depends on wich mortage type

  if(checkboxRepayment.classList.contains("checkmark-checked")){
    return {result: monthlyRepayment.toFixed(2),
            totalInterestOnlyRepayment: totalInterestOnlyRepayment.toFixed(2)

    }
  }else if(checkboxInterestOnly.classList.contains("checkmark-checked")){
    return {result:  interestOnlyPayment.toFixed(2),
            totalInterestOnlyRepayment: totalInterestOnlyRepayment.toFixed(2)
    }
  }
}

function errorHandling(){
  let hasError = false;

  const mortgageAmount = mortgageAmountHTML.value;
  const mortgageTerm = mortgageTermHTML.value;
  const mortgageRate = mortgageRateHTML.value;
  const checkboxRepayment = document.querySelector(".checkbox-repayments");
  const checkboxInterestOnly = document.querySelector(".checkbox-interest-only");

  if(!checkboxRepayment.classList.contains("checkmark-checked") && 
     !checkboxInterestOnly.classList.contains("checkmark-checked")){
   document.querySelector(".error-type").classList.add("error-activated");
   hasError = true;
  }else{
    document.querySelector(".error-type").classList.remove("error-activated");
    document.querySelector(".error-type").classList.remove("error-activated");
  }

  if(mortgageAmount === ''){
    mortgageAmountHTML.classList.add("error-input");
    document.querySelector(".currency").classList.add("error-signe");
    document.querySelector(".error-amount").classList.add("error-activated");
    hasError = true;
  }else{
    mortgageAmountHTML.classList.remove("error-input");
    document.querySelector(".currency").classList.remove("error-signe");
    document.querySelector(".error-amount").classList.remove("error-activated");
  }

  if(mortgageTerm === ''){
    mortgageTermHTML.classList.add("error-input");
    document.querySelector(".years").classList.add("error-signe");
    document.querySelector(".error-term").classList.add("error-activated");
    hasError = true;
  }else{
    mortgageTermHTML.classList.remove("error-input");
    document.querySelector(".years").classList.remove("error-signe");
    document.querySelector(".error-term").classList.remove("error-activated");
  }
  if(mortgageRate === ''){
    mortgageRateHTML.classList.add("error-input");
    document.querySelector(".rate").classList.add("error-signe");
    document.querySelector(".error-rate").classList.add("error-activated");
    hasError = true;
  }else{
    mortgageRateHTML.classList.remove("error-input");
    document.querySelector(".rate").classList.remove("error-signe");
    document.querySelector(".error-rate").classList.remove("error-activated");
  }
  return !hasError; //return true if no error
}


clear();
calculateRepayments();

