import {navigation, router} from "./navigation.ts";

async function main(): Promise<void> {
    try {
        await navigation();
        window.addEventListener("hashchange", router);
        window.addEventListener("load", router);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


main();
