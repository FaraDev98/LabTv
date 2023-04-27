export interface Search {
    page: number
    results: Result[]
    total_pages: number
    total_results: number
}

export interface Result {
    adult: boolean
    backdrop_path?: string
    id: number
    title?: string
    original_language?: string
    original_title?: string
    overview?: string
    poster_path?: string
    media_type: string
    genre_ids?: number[]
    popularity: number
    release_date?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
    name?: string
    original_name?: string
    first_air_date?: string
    origin_country?: string[]
    gender?: number
    known_for_department?: string
    profile_path?: string
    known_for?: KnownFor[]
}

export interface KnownFor {
    adult: boolean
    backdrop_path?: string
    id: number
    title: string
    original_language: string
    original_title: string
    overview: string
    poster_path?: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
}
