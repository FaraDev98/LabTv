
/* PREVIEW INTERFACE */
export interface Response {
    page: number
    results: Media[]
    total_pages: number
    total_results: number
}

export interface Media {
    adult: boolean
    backdrop_path: string
    id: number
    title?: string
    original_language: string
    original_title?: string
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date?: string
    video?: boolean
    vote_average: number
    vote_count: number
    name?: string
    original_name?: string
    first_air_date?: string
    origin_country?: string[]
}

export interface Discover {
    page: number
    results: Prev[]
    total_pages: number
    total_results: number
}

export interface Prev {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export class AddedMediaDto {
    media: Media;
    userId: number;
    id: number;

    constructor(movie: Media, userId: number, id: number = 0) {
        this.media = movie;
        this.userId = userId;
        this.id = id;
    }
}

export interface AddedMedia {
    id: number;
    media: Media;
    userId: number;
}