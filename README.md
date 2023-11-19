# object-image-server

This project is supposed to save and send objects with linked images and text/other values. The user should also be able to save images and link them to existing objects or not. The data saved per object should be typable to customize validation and retrieval. Objects should be creatable without any accompanying data if needed. Each object should be retrievable as its own unit, with all the accompanying data. The text/other values should be configurable based on the database needs. The user should also be able to search/filter objects based on those values. The user's objects should be locked behind authentication (cookie-based sessions.) The user should also have the choice of exposing an object or image to others. Objects should also be groupable together.

This repo specifically is used to fetch data from the [anttijankeri/object-image-database](https://github.com/anttijankeri/object-image-database) and send it on to the front end [anttijankeri/plant-collection-website.](https://github.com/anttijankeri/plant-collection-website) The user should be authenticated before fetching data.

## CONFIG

The `src/config.ts` contains all the user customization for the repo. Use the commented area to customize your dataobject, using the data types from `src/data_types/index.ts`. Each data object created via the API will be saved in the database for the user. You also need to add a `.env` file at the root with `URI = "your mongodb string here"` as the content. Or as an env variable on your deployment platform of choice!

## TODO

- ~~basic setup~~
- all API calls
- error handling
- everything else

### API CALLS

**AUTHENTICATION**

- Log in
- Passive authentication middleware

**USERS**

- Get user
- Create user
- Delete user
- Update user

**OBJECTS**

- List all user's objects
- Filter user's objects
- Read single object
- Add single object
- Delete single object
- Update single object

**IMAGES**

- List all object's images
- Read single image
- Add single image
- Delete single image
- Update single image

**DATA-EXPORT**

- Get all user's objects and images
- Get all user's objects and images filtered

**DATA-SHARE**

- Read single object (no auth)
- Read single image (no auth)
