interface Song {
  trackName: string;
  artistName: string;
  collectionName?: string; // Album name
  artworkUrl100?: string; // URL to artwork image
}

function createSongRow(
  song: Song,
  _index: number,
  addButtonCallback?: () => void,
  removeButtonCallback?: () => void,
) {
  const row = document.createElement("tr");

  const cell1 = document.createElement("td");
  const cell2 = document.createElement("td");
  const cell3 = document.createElement("td");
  const cell4 = document.createElement("td");

  const img = document.createElement("img");
  img.src = song.artworkUrl100 || "";
  img.alt = `${song.collectionName || ""} album cover`;
  cell1.appendChild(img);

  cell2.textContent = song.trackName;
  cell3.textContent = song.artistName;

  if (addButtonCallback) {
    const addButton = document.createElement("button");
    addButton.className = "btn btn-success";
    addButton.textContent = "+";
    addButton.style.fontWeight = "bold";
    addButton.addEventListener("click", addButtonCallback);
    cell4.appendChild(addButton);
  }

  if (removeButtonCallback) {
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger";
    removeButton.textContent = "-";
    removeButton.style.fontWeight = "bold";
    removeButton.addEventListener("click", removeButtonCallback);
    cell4.appendChild(removeButton);
  }

  row.appendChild(cell1);
  row.appendChild(cell2);
  row.appendChild(cell3);
  row.appendChild(cell4);

  return row;
}

export async function initializeHome() {
  function searchSongs(query: string) {
    const songsTableBody = document
      .getElementById("songsTable")
      ?.getElementsByTagName("tbody")[0];
    if (songsTableBody) {
      songsTableBody.innerHTML = ""; // Clear previous search results

      fetch(`https://itunes.apple.com/search?term=${query}&media=music&limit=5`)
        .then((response) => response.json())
        .then((data) => renderResults(data.results));
    }
  }

  function handleSearch() {
    const query = (document.getElementById("searchInput") as HTMLInputElement)
      ?.value;
    if (query) searchSongs(query);
  }

  document
    .getElementById("searchButton")
    ?.addEventListener("click", handleSearch);
  document
    .getElementById("searchInput")
    ?.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch();
      }
    });

  function renderResults(results: Song[]) {
    const songsTableBody = document
      .getElementById("songsTable")
      ?.getElementsByTagName("tbody")[0];
    const songsTableHead = document.getElementById("songsTableHead");
    if (songsTableBody && songsTableHead) {
      songsTableBody.innerHTML = ""; // Clear previous search results
      songsTableHead.classList.toggle("d-none", results.length === 0);
      results.forEach((result) => {
        const row = createSongRow(result, 0, () => addToFavorites(result));
        songsTableBody.appendChild(row);
      });
    }
  }

  function renderFavorites() {
    const favoritesTableBody = document
      .getElementById("favoritesTable")
      ?.getElementsByTagName("tbody")[0];
    const favoritesTableHead = document.getElementById("favoritesTableHead");
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favoritesTableBody && favoritesTableHead) {
      favoritesTableBody.innerHTML = ""; // Clear previous favorites
      favoritesTableHead.classList.toggle("d-none", favorites.length === 0);
      favorites.forEach((song: Song, index: number) => {
        const row = createSongRow(song, index, undefined, () =>
          removeFromFavorites(index),
        );
        favoritesTableBody.appendChild(row);
      });
    }
  }

  function addToFavorites(song: Song) {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.push(song);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }

  function removeFromFavorites(index: number) {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }

  renderFavorites();
}
