let query = `query ($search: String, $page: Int, $perPage: Int) {
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
  }
  `;

module.exports = query;
