export function initializeForm(formId: string): HTMLFormElement | null {
    const form = document.getElementById(formId) as HTMLFormElement;
    form?.addEventListener("submit", function (event) {
        event.preventDefault();
        const allValid = checkAllFieldsValid();
        const successElement = document.getElementById("validation-success");

        if (successElement) {
            successElement.style.display = allValid ? "block" : "none";
            successElement.textContent = allValid ? "Validation Success 👍" : "";
        }
    });
    return form;
}

function validateField<T>(
    fieldId: string,
    validator: (value: T) => boolean,
    errorMessage: string,
): boolean {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    const errorElement = document.getElementById(`${fieldId}-error`);

    let isValid = false;
    if (inputElement && errorElement) {
        const value: T =
            inputElement.type === "number"
                ? (parseFloat(inputElement.value) as unknown as T)
                : (inputElement.value as unknown as T);
        isValid = validator(value);
        toggleValidationClasses(inputElement, isValid);
        displayValidationError(errorElement, isValid, errorMessage);
    }

    return isValid;
}

function checkAllFieldsValid(): boolean {
    const validators = [
        {
            fieldId: "username",
            validator: validateString,
            condition: (value: string) => value.length >= 4,
        },
        {
            fieldId: "age",
            validator: validateNumber,
            condition: (value: number) => value >= 1 && value <= 100,
        },
        {
            fieldId: "password",
            validator: validateString,
            condition: (value: string) => value.length >= 8,
        },
        {
            fieldId: "email",
            validator: validateString,
            condition: (value: string) => value.includes("@"),
        },
    ];

    return validators.every(({fieldId, validator, condition}) =>
        validator(fieldId, condition as (value: any) => boolean),
    );
}

function validateString(
    fieldId: string,
    condition: (value: string) => boolean,
): boolean {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    if (inputElement) {
        const value = inputElement.value;
        return condition(value);
    }
    return false;
}

function validateNumber(
    fieldId: string,
    condition: (value: number) => boolean,
): boolean {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    if (inputElement) {
        const value = parseFloat(inputElement.value);
        return !isNaN(value) && condition(value);
    }
    return false;
}

export function toggleValidationClasses(
    element: HTMLInputElement,
    isValid: boolean,
) {
    element.classList.toggle("is-invalid", !isValid);
    element.classList.toggle("is-valid", isValid);
}

export function displayValidationError(
    element: HTMLElement,
    isValid: boolean,
    errorMessage: string,
) {
    element.textContent = isValid ? "" : errorMessage;
    element.style.display = isValid ? "none" : "block";
}

export function attachFormValidation() {
    initializeForm("user-form");
    attachFieldValidation(
        "username",
        (value) => (value as string).length >= 4,
        "Username must be at least 4 characters.",
    );
    attachFieldValidation(
        "age",
        (value) => (value as number) >= 1 && (value as number) <= 100,
        "Age must be between 1 and 100.",
    );
    attachFieldValidation(
        "password",
        (value) => (value as string).length >= 8,
        "Password must be at least 8 characters.",
    );
    attachFieldValidation(
        "email",
        (value) => (value as string).includes("@"),
        "Invalid email address.",
    );
}

function attachFieldValidation<T>(
    fieldId: string,
    validator: (value: T) => boolean,
    errorMessage: string,
) {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    if (inputElement) {
        inputElement.addEventListener("blur", function () {
            validateField(fieldId, validator, errorMessage);
        });
    }
}
