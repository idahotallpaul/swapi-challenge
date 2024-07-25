# Wevr Jobs

This is a demo project for a job application to Swiftly.com.

The assignment was as follows:

>Your task is to create a directory of characters in the Star Wars universe using the Star Wars API (https://swapi.dev/) if that doesn’t work please try: https://swapi.info/. The directory should display each character's name, homeworld name, and species name. Additionally, it should support easy searching for a person by their name, homeworld, or species.
>
>## Requirements:
>- Develop a webpage that presents a grid of character profile cards sourced from the Star Wars API.
>- Utilize the Star Wars API resources:
>- People: https://swapi.dev/documentation#people
>- Planets: https://swapi.dev/documentation#planets
>- Species: https://swapi.dev/documentation#species
>- Implement search functionality allowing users to search for characters by name, homeworld, or species using the search API for each resource.
>- Ensure the profile card displays the person’s name, homeworld name, and species name.
>- At the top of the profile page, include a search bar. Render a grid of profile cards that match the reflected search. If there are no results, show a message stating there are no results.
>- Support both the person’s name, homeworld name, and species as searchable criteria. Show the results for a person’s name first, then homeworld, then species.
>
## Solution

I went pretty long on this. Not sure what I'm at for hours but safe to say it's over. Fun challenge to explore though. 

I built the solution on top of a remix/tailwind/shadcn starter project I like to use as a base for these type of things. I leveraged some patterns and code for the buttons and inputs that I've used on other projects. as well. 

After digging a bit into the swapi.dev docs, my initial plan was to utilize one of the typescript api libraries, but then decided against it, as I wasn't sure if libs were allowed for the challenge. So I leveraged the types from one and built the functionality from scratch.

For the People page, since the results are paginated, I built pagination controls. Since the planet and species were returned as urls on the people object, I fetched data in the remix loader. Then in the component code, I iterated through the urls and fetched the details in the background. The initial card is displayed with just the name until the full data is returned. On a slow network you'll see a loading message for those properties.

For the Planets and Species, I decided to fetch all results and feed them to dropdowns so that users could see complete lists with counts of related people. This meant I had to first recursively fetch all paginated pages to populate the dropdowns with an exhaustive list. Select an item, and the related people are displayed. Users may then type to filter the results with a debounce.

All data is stored in local storage for quick retrieval, and fetches are cached to leverage the browser's capabilities. Search values are stored in the url so users may navigate their history. 

Please let me know if you have any questions.

Cheers,

Paul

## Running Things

```sh
yarn && yarn dev
```

