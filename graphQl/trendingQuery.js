let query = `query ($page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (type: ANIME, sort: TRENDING_DESC) {
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

  module.exports = query;