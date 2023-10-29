import { initializeForm } from "./form";
import { initializeHome } from "./home.ts";

async function loadHTMLFile(filePath: string): Promise<string> {
  const response = await fetch(`/spotilist/html/${filePath}`);
  return await response.text();
}

function toggleMenu(): void {
  const menu = document.getElementById("navbarResponsive");
  const body = document.body;
  if (menu && body) {
    if (menu.classList.contains("collapse")) {
      menu.classList.remove("collapse");
      body.style.marginTop = "50px";
    } else {
      menu.classList.add("collapse");
      body.style.marginTop = "0";
    }
  }
}

export async function navigation(): Promise<void> {
  const navContainer = document.getElementById("navbar-container");
  if (navContainer) {
    navContainer.innerHTML = await loadHTMLFile("navigation.html");

    const burgerIcon = document.querySelector(".navbar-toggler");
    if (burgerIcon) {
      burgerIcon.addEventListener("click", toggleMenu);
    }
  }
}

export async function router(): Promise<void> {
  const url = window.location.hash.slice(1) || "/home";
  const mainContent = document.getElementById("main-content");

  if (mainContent) {
    switch (url) {
      case "/home":
        mainContent.innerHTML = await loadHTMLFile("home.html");
        await initializeHome();
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
