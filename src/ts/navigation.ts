import { initializeForm } from "./form";

async function loadHTMLFile(filePath: string): Promise<string> {
  const response = await fetch(`/spotilist/html/${filePath}`);
  return await response.text();
}

export async function navigation(): Promise<void> {
  const navContainer = document.getElementById("navbar-container");
  if (navContainer) {
    navContainer.innerHTML = await loadHTMLFile("navigation.html");
  }
}

export async function router(): Promise<void> {
  const url = window.location.hash.slice(1) || "/home";
  const mainContent = document.getElementById("main-content");

  if (mainContent) {
    switch (url) {
      case "/home":
        mainContent.innerHTML = await loadHTMLFile("home.html");
        break;
      case "/about":
        mainContent.innerHTML = await loadHTMLFile("about.html");
        break;
      case "/form":
        mainContent.innerHTML = await loadHTMLFile("form.html");
        initializeForm("user-form");
        break;
      default:
        mainContent.innerHTML = "404 Not Found";
        break;
    }
  }
}
