//default page
let resultHTML = `
<img class="empty-img" src="assets/images/illustration-empty.svg">
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

function calCulateRepayments() {
    document.querySelector(".js-btn").addEventListener('click',() => {
      
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
              <p class="results">$${result}</p>
              <hr>
              <p class="total-title">Total you'll repay over the term</p>
              <p class="total">$543,234.94</p>
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
  resultContainer.classList.add("result-container-empty");    
})
}

function calculation(){
  const checkboxRepayment = document.querySelector(".checkbox-repayments");
  const checkboxInterestOnly = document.querySelector(".checkbox-interest-only");
  const mortgageAmount = mortgageAmountHTML.value;
  const mortgageTerm = mortgageTermHTML.value;
  const mortgageRate = mortgageRateHTML.value;
  

  if(checkboxRepayment.classList.contains("checkmark-checked")){
    // the formule is incorect just for testing
    return (mortgageAmount + mortgageTerm) * mortgageRate;
  }else if(checkboxInterestOnly.classList.contains("checkmark-checked")){
    return 19223.34;
  }
}


clear();
calCulateRepayments();

