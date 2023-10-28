export function attachFormValidation() {
    const form = document.getElementById("user-form") as HTMLFormElement;
    form?.addEventListener("submit", function (event) {
        event.preventDefault();
    });
    attachFieldValidation("username", value => (value as string).length >= 4, "Username must be at least 4 characters.");
    attachFieldValidation("age", value => (value as number) >= 0, "Age must be a positive number.");
    attachFieldValidation("password", value => (value as string).length >= 8, "Password must be at least 8 characters.");
    attachFieldValidation("email", value => (value as string).includes("@"), "Invalid email address.");
}


function attachFieldValidation(fieldId: string, validator: (value: string | number) => boolean, errorMessage: string) {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    if (inputElement) {
        inputElement.addEventListener('blur', function () {
            validateField(fieldId, validator, errorMessage);
        });
    }
}

function validateField<T>(fieldId: string, validator: (value: T) => boolean, errorMessage: string) {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    const errorElement = document.getElementById(`${fieldId}-error`);

    if (inputElement && errorElement) {
        const value: T = inputElement.type === 'number' ? parseFloat(inputElement.value) as unknown as T : inputElement.value as unknown as T;

        const isValid = validator(value);
        inputElement.classList.toggle("is-invalid", !isValid);
        inputElement.classList.toggle("is-valid", isValid);

        errorElement.textContent = isValid ? "" : errorMessage;
        errorElement.style.display = isValid ? "none" : "block";
    }
}
