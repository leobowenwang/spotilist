import { loadHomePage } from './home';
import { loadAboutPage } from './about';

export function navigation(): string {
  return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#/home">Spotilist</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#/about">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#/home">Home</a></li>                    
                    </ul>
                </div>
            </div>
        </nav>
    `;
}


function router() {
  const url = window.location.hash.slice(1) || "/";
  const mainContent = document.getElementById("main-content");

  if (mainContent) {
    if (url === "/about") {
      mainContent.innerHTML = loadAboutPage();
    } else if (url === "/home") {
      mainContent.innerHTML = loadHomePage();
    } else {
      mainContent.innerHTML = "404 Not Found";
    }
  }
}

function main() {
  const navContainer = document.getElementById("navbar-container");
  if (navContainer) {
    navContainer.innerHTML = navigation();
  }

  window.addEventListener("hashchange", router);
  window.addEventListener("load", router);
}

main();
