const URL =
  "https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=disco&api_key=42e63dc7d165a3ec6915c432a9332a8f&format=json";

function getMusicData() {
  return fetch(`${URL}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.topartists.artist)
    .then((artists) =>
      Promise.all(
        artists.map((artist) => {
          const URL = `https://api.deezer.com/search?q='${artist.name}'`;
          return fetch(URL)
            .then((response) => response.json())
            .then((data) => {
              return {
                id: artist.mbid,
                name: artist.name,
                image: data.data[0].artist.picture_medium,
              };
            });
        })
      )
    );
}

export { getMusicData };
