export interface IFilm {
  characters: string[] | IPeople[];
  created: string;
  director: string;
  edited: string;
  episode_id: string;
  opening_crawl: string;
  planets: string[] | IPlanet[];
  producer: string;
  release_date: string;
  species: string[] | ISpecie[];
  starships: string[] | IStarship[];
  title: string;
  url: string;
  vehicles: string[] | IVehicle[];
}

export interface IPeople {
  birth_year: string;
  eye_color: string;
  films: string[] | IFilm[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string | IPlanet;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[] | ISpecie[];
  starships: string[] | IStarship[];
  url: string;
  vehicles: string[] | IVehicle[];
}

export interface IPlanet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[] | IFilm[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[] | IPeople[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface ISpecie {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string | IPlanet;
  language: string;
  name: string;
  people: string[] | IPeople[];
  films: string[] | IFilm[];
  skin_colors: string;
  url: string;
}

export interface IStarship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[] | IFilm[];
  pilots: string[] | IPeople[];
  starship_class: string;
  url: string;
}

export interface IVehicle {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[] | IPeople[];
  films: string[] | IFilm[];
  url: string;
  vehicle_class: string;
}

export enum ResourcesType {
  Films = 'films',
  People = 'people',
  Planets = 'planets',
  Species = 'species',
  Starships = 'starships',
  Vehicles = 'vehicles',
}

export interface PeopleApiResponse {
  count: number;
  next?: string;
  previous?: string;
  results: IPeople[];
}

export interface PlanetApiResponse {
  count: number;
  next?: string;
  previous?: string;
  results: IPlanet[];
}

export interface SpecieApiResponse {
  count: number;
  next?: string;
  previous?: string;
  results: ISpecie[];
}
