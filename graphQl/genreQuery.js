module.exports = `query ($search: String, $page: Int, $perPage: Int, $genre:String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (search: $search, type: ANIME, genre: $genre) {
        id
        title {
          romaji
          english
          native
        }
        description
        duration
        episodes
        status
        genres
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }`