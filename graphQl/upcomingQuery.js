module.exports = `query ($page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (type: ANIME, sort: POPULARITY_DESC, status: NOT_YET_RELEASED) {
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
        startDate {
          year
          month
          day
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }`