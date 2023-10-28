import {navigation, router} from "./navigation";

async function main(): Promise<void> {
    try {
        await navigation();
        await router();
        window.addEventListener("hashchange", router);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

document.addEventListener("DOMContentLoaded", main);
