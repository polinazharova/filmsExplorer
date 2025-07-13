export interface FilmBase {
    id : number;
    poster : string,
    name : string,
    "enName": string,
    year : number,
    rating : number,
}

export interface FilmDetailed extends Omit<FilmBase, 'rating'> {
    description : string,
    genres: string[],
    "rating": {
        [key : string]: number,
    },
}

export interface FilmDTO {
    "id": number,
    "name": string,
    "enName": string,
    "alternativeName": string,
    "year": number,
    "description": string,
    "poster": {
        "url": string,
        "previewUrl": string
    },
    "rating": {
        [key : string]: number,
    },
    "genres": [
        {
            "name": string
        }
    ],
}