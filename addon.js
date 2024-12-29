const { addonBuilder } = require("stremio-addon-sdk");
const fs = require("fs");

// Manifest für Stremio
const manifest = {
    id: "community.moflix",
    version: "1.0.0",
    name: "Moflix Stream",
    description: "Kostenlose Filme und Serien von Moflix Stream",
    resources: ["catalog", "stream"],
    types: ["movie"],
    catalogs: [
        {
            type: "movie",
            id: "moflix_catalog",
            name: "Moflix Filme",
        }
    ]
};

// Filme aus JSON laden
function loadMovies() {
    try {
        const data = fs.readFileSync("movies.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Fehler beim Laden der Filme:", error);
        return [];
    }
}

const movies = loadMovies();
const builder = new addonBuilder(manifest);

// Katalog-Handler
builder.defineCatalogHandler(() => {
    return Promise.resolve({
        metas: movies.map(movie => ({
            id: movie.id,
            name: movie.name,
            description: movie.description,
            poster: movie.poster
        }))
    });
});

// Stream-Handler
builder.defineStreamHandler(({ id }) => {
    const movie = movies.find(m => m.id === id);
    if (movie) {
        return Promise.resolve({ streams: [{ url: movie.stream }] });
    }
    return Promise.resolve({ streams: [] });
});

module.exports = builder.getInterface();
