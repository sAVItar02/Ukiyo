module.exports = `query ($search: String, $page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (search: $search, type: ANIME) {
        id
        title {
          romaji
          english
        }
        nextAiringEpisode {
          timeUntilAiring
          airingAt
          episode
        }      
        description
        duration
        episodes
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }`
  