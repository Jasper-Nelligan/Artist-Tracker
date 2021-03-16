package App;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.enums.ReleaseDatePrecision;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
import com.wrapper.spotify.model_objects.specification.AlbumSimplified;
import com.wrapper.spotify.model_objects.specification.Artist;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import com.wrapper.spotify.requests.data.artists.GetArtistsAlbumsRequest;
import com.wrapper.spotify.requests.data.search.simplified.SearchArtistsRequest;
import org.apache.hc.core5.http.ParseException;

import java.io.IOException;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;


public class APIController {
    private static final String clientId = "6379a17b60674134bf86ddca4dd36fa3";
    private static final String clientSecret = "020d80c54e2e4b76b040252f0004b7c3";

    private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
            .setClientId(clientId)
            .setClientSecret(clientSecret)
            .build();

//    public static void main() {
//        // sets the access token for further api requests
//        clientCredentials_Sync();
//
//        String artistId = searchArtists_Sync("AJR");
//        List<AlbumSimplified> albumArr =
//                getArtistsAlbums_Sync(artistId);
//
//        String lastLogin = "2017-01-01";
//        LocalDate lastLoginDate = LocalDate.parse(lastLogin);
//        List<AlbumSimplified> newAlbums = new ArrayList<>();
//        // A hashmap is used to single out multiple releases of the same albums.
//        Map<String, AlbumSimplified> hashMap = new HashMap<>();
//        for (AlbumSimplified album : albumArr) {
//            ReleaseDatePrecision precision = album.getReleaseDatePrecision();
//            String albumRelease = album.getReleaseDate();
//            // If month and day aren't present, assume album was released
//            // at the end of the year
//            if (precision == ReleaseDatePrecision.YEAR) {
//                albumRelease += "-12-31";
//            }
//            // If day is not present, assume album was released at the end
//            // of the month
//            else if (precision == ReleaseDatePrecision.MONTH) {
//                String[] yearMonth = albumRelease.split("-");
//                YearMonth yearMonthObject = YearMonth.of(
//                        Integer.parseInt(yearMonth[0]), Integer.parseInt(yearMonth[1]));
//                albumRelease += "-" + yearMonthObject.lengthOfMonth();
//            }
//
//            LocalDate albumDate = LocalDate.parse(albumRelease);
//            if (albumDate.isAfter(lastLoginDate)) {
//                String key = album.getName();
//                if (!hashMap.containsKey(key)) {
//                    hashMap.put(key, album);
//                }
//            }
//        }
//
//        for (AlbumSimplified album : hashMap.values()) {
//            newAlbums.add(album);
//        }
//
//        for (AlbumSimplified album : newAlbums) {
//            System.out.println(album.getReleaseDate() +
//                    " " + album.getName() + " " + album.getAlbumType());
//        }
//
//
//        /*for (AlbumSimplified album: albumArr) {
//            System.out.println(album.getReleaseDate() +
//                " " + album.getName() + " " + album.getAlbumType());
//        }*/
//
//        /*int i = 1;
//        for (AlbumSimplified album : albumArr) {
//            System.out.println(i++ + ": " + album.toString());
//        }*/
//    }

    public static void clientCredentials_Sync() {
        try {
            ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
                    .build();

            final ClientCredentials clientCredentials = clientCredentialsRequest.execute();

            // Set access token for further "spotifyApi" object usage
            spotifyApi.setAccessToken(clientCredentials.getAccessToken());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public static String searchArtists_Sync(String query) {
        try {
            SearchArtistsRequest searchArtistsRequest =
                    spotifyApi.searchArtists(query).build();

            Paging<Artist> artistPaging = searchArtistsRequest.execute();
            Artist artist = artistPaging.getItems()[0];
            return artist.getId();
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
            return null;
        }
    }

    public static List<AlbumSimplified> getArtistsAlbums_Sync(String id) {
        GetArtistsAlbumsRequest getArtistsAlbumsRequest;
        List<AlbumSimplified> albumArr = new ArrayList<>();
        int offset = 0;

        try {
            // Get first 50 albums of artist
            getArtistsAlbumsRequest = spotifyApi.getArtistsAlbums(id)
                    .offset(offset)
                    .limit(50)
                    .album_type("album,single")
                    .build();
            Paging<AlbumSimplified> albumSimplifiedPaging = getArtistsAlbumsRequest.execute();
            albumArr.addAll(Arrays.asList(albumSimplifiedPaging.getItems()));
            offset += 50;

            // Get the rest of the artist's albums and append to albumArr
            int numAlbums = albumSimplifiedPaging.getTotal();
            while (numAlbums > 0) {
                getArtistsAlbumsRequest = spotifyApi.getArtistsAlbums(id)
                        .offset(offset)
                        .album_type("album,single")
                        .limit(50)
                        .build();
                albumSimplifiedPaging = getArtistsAlbumsRequest.execute();
                albumArr.addAll(Arrays.asList(albumSimplifiedPaging.getItems()));
                offset += 50;
                numAlbums -= 50;
            }

            return albumArr;
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
            return null;
        }
    }
}