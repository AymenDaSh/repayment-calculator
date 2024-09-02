// Get all checkbox containers and checkmarks
const checkboxes = [
  { container: document.querySelector(".checkbox-repayments"), checkmark: document.querySelector(".checkmark-repayments") },
  { container: document.querySelector(".checkbox-interest-only"), checkmark: document.querySelector(".checkmark-interest-only") }
];

// Function to handle checkbox selection
function handleCheckboxClick(selected) {
  checkboxes.forEach(({ container, checkmark }) => {
    if (container === selected) {
      container.classList.add("checkmark-checked");
      checkmark.classList.add("checkmark-checked");
    } else {
      container.classList.remove("checkmark-checked");
      checkmark.classList.remove("checkmark-checked");
    }
  });
}

// Add event listeners to all checkboxes
checkboxes.forEach(({ container }) => {
  container.addEventListener('click', () => handleCheckboxClick(container));
});
