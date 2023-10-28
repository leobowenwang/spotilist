async function loadHTMLFile(filePath: string): Promise<string> {
  const response = await fetch(`/src/html/${filePath}`);
  return await response.text();
}

async function navigation(): Promise<void> {
  const navContainer = document.getElementById("navbar-container");
  if (navContainer) {
    navContainer.innerHTML = await loadHTMLFile("navigation.html");
  }
}

async function router(): Promise<void> {
  const url = window.location.hash.slice(1) || "/";
  const mainContent = document.getElementById("main-content");

  if (mainContent) {
    if (url === "/about") {
      mainContent.innerHTML = await loadHTMLFile("about.html");
    } else if (url === "/home") {
      mainContent.innerHTML = await loadHTMLFile("home.html");
    } else {
      mainContent.innerHTML = "404 Not Found";
    }
  }
}

async function main(): Promise<void> {
  await navigation();

  window.addEventListener("hashchange", router);
  window.addEventListener("load", router);
}

main();
