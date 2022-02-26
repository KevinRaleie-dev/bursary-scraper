# Bursary Web Scraper 🕷

I built a simple Express API for fetching / scraping closing bursaries for all the months of the year.

## Update

You can now only fetch bursaries for the year of 2022 🥳

## New features ⚡️

- You can now search for bursaries closing in 2022 🔥

- For now its only for the months of January and February. More to be added soon

### Built with 🧑🏽‍💻

> Node.js, cheerio, axios, express, jest & supertest

- ```yarn install``` installs dependencies

- ```yarn start``` to run

- Once started you can access the server on <http://localhost:4000/bursaries?search>=
``` search=your-month-here ``` being your search path / query. Make a GET request and you'll get some data back if its available.

- ```yarn lint:fix``` to lint and fix eslint rules

- ```yarn test``` to run tests

Made with ❤️ by Kevin Raleie
