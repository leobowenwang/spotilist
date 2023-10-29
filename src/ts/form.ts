import { checkAllFieldsValid, validateField, validators } from "./validation";

export function initializeForm(formId: string): HTMLFormElement | null {
  const form = document.getElementById(formId) as HTMLFormElement;
  form?.addEventListener("submit", handleSubmit);

  validators.forEach(({ fieldId }) => {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    inputElement?.addEventListener("blur", () => validateField(fieldId));
  });
  return form;
}

function handleSubmit(event: Event) {
  event.preventDefault();
  const allValid = checkAllFieldsValid();
  const outcomeElement = document.getElementById("validation");

  if (outcomeElement) {
    outcomeElement.style.display = "block";
    outcomeElement.textContent = allValid
      ? "Validation Success 👍"
      : "Validation Failed 👎";
    outcomeElement.className = allValid
      ? "alert alert-success"
      : "alert alert-danger";
  }
}
