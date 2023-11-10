# object-server

This repo is used to fetch data from the [anttijankeri/object-database](https://github.com/anttijankeri/object-database) and send it on to the front end [anttijankeri/plant-object-website.](https://github.com/anttijankeri/plant-object-website) The user should be authenticated before fetching data.

## SETUP

The src/config.ts contains all the user customization for the repo. Use the commented area to customize your dataobject, using the data types from src/data_types/index.ts. Each dataobject created via the API will be saved in the database for the user.

## TODO

- basic setup
- all API calls
- everything else
