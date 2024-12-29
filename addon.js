const { addonBuilder } = require("stremio-addon-sdk");

// Add-on Manifest
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

// Filme und Serien
const movies = [
    {
        id: "movie-1",
        name: "Beispiel Film",
        description: "Beschreibung des Films",
        poster: "https://via.placeholder.com/150",
        stream: "https://example.com/stream-url"
    },
    {
        id: "movie-2",
        name: "Beispiel Film 2",
        description: "Beschreibung des Films 2",
        poster: "https://via.placeholder.com/150",
        stream: "https://example.com/stream-url-2"
    }
];

// Add-on Builder
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
