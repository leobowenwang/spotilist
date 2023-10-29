export type Validator<T> = (value: T) => boolean;

export interface FieldValidator {
    fieldId: string;
    validator: Validator<string | number>;
    errorMessage: string;
}

export const validators: FieldValidator[] = [
    {
        fieldId: "username",
        validator: (value: string | number) => typeof value === 'string' && value.length >= 4,
        errorMessage: "Username must be at least 4 characters.",
    },
    {
        fieldId: "age",
        validator: (value: string | number) => typeof value === 'number' && value >= 1 && value <= 100,
        errorMessage: "Age must be between 1 and 100.",
    },
    {
        fieldId: "password",
        validator: (value: string | number) =>
            typeof value === 'string' &&
            value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[^A-Za-z0-9]/.test(value),
        errorMessage: "Password must be at least 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
    {
        fieldId: "email",
        validator: (value: string | number) => typeof value === 'string' && value.includes("@"),
        errorMessage: "Invalid email address.",
    },
];

export function validateValue(fieldId: string, value: string | number): { isValid: boolean; errorMessage: string } {
    const validatorObj = validators.find(v => v.fieldId === fieldId);
    if (!validatorObj) {
        throw new Error(`No validator found for fieldId: ${fieldId}`);
    }

    const {validator, errorMessage} = validatorObj;
    const isValid = validator(value);
    return {isValid, errorMessage};
}

export function validateField(fieldId: string): boolean {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement;
    const errorElement = document.getElementById(`${fieldId}-error`);

    if (inputElement && errorElement) {
        const value = inputElement.type === "number" ? parseFloat(inputElement.value) : inputElement.value;
        const {isValid, errorMessage} = validateValue(fieldId, value);
        toggleValidationClasses(inputElement, isValid);
        displayValidationError(errorElement, isValid, errorMessage);
        return isValid;
    }
    return false;
}

export function checkAllFieldsValid(): boolean {
    return validators.every(({fieldId}) => validateField(fieldId));
}

function toggleValidationClasses(element: HTMLInputElement, isValid: boolean) {
    element.classList.toggle("is-invalid", !isValid);
    element.classList.toggle("is-valid", isValid);
}

function displayValidationError(element: HTMLElement, isValid: boolean, errorMessage: string) {
    element.textContent = isValid ? "" : errorMessage;
    element.style.display = isValid ? "none" : "block";
}

