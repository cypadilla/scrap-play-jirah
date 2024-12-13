const express = require('express');
const { chromium } = require('playwright');

const app = express();
const port = 3000;  // El puerto donde se ejecutará el servidor

// Ruta para hacer scraping de la página
app.get('/scrape', async (req, res) => {
    // Inicia un navegador de Playwright
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://web.bascbogota.com/node/5');  // Reemplaza con la URL que deseas hacer scraping

    // Espera a que un elemento esté disponible en la página
    await page.waitForSelector('h1');  // Cambia el selector según lo que necesites

    // Extrae el contenido de la página
    const data = await page.evaluate(() => {
        return document.querySelector('h1').innerText;  // Extrae el texto del h1
    });

    // Devuelve los datos como JSON
    res.json({ data: data });

    // Cierra el navegador
    await browser.close();
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Scraper API escuchando en http://localhost:${port}`);
});
