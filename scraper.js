const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL der Website
const URL = "https://moflix-stream.xyz/homepage";

// Scraping-Funktion
async function scrapeMoflix() {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const movies = [];
        $(".movie-item").each((index, element) => {
            const title = $(element).find(".title").text().trim();
            const description = $(element).find(".description").text().trim();
            const poster = $(element).find("img").attr("src");
            const streamUrl = $(element).find("a").attr("href");

            movies.push({
                id: `movie-${index + 1}`,
                name: title,
                description: description,
                poster: poster,
                stream: streamUrl
            });
        });

        // Daten speichern
        fs.writeFileSync("movies.json", JSON.stringify(movies, null, 2));
        console.log("Filme erfolgreich gespeichert!");
    } catch (error) {
        console.error("Fehler beim Scraping:", error);
    }
}

// Scraping ausführen
scrapeMoflix();
