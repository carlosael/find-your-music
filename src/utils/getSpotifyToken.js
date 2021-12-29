const CLIENT_ID = "39df9a075d34458e81ad6343fddd1743";
const CLIENT_SECRET = "7a7f3a6194df4e3b875805d4c66e2df6";

const baseURL = (id, secret) =>
    `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${id}&client_secret=${secret}`;

export default async function getSpotifyToken() {
    try {

        const response = await fetch(baseURL(CLIENT_ID, CLIENT_SECRET), {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        });

        const { access_token, token_type } = await response.json();

        return `${token_type} ${access_token}`;
    } catch (error) {
        console.log(error)
        throw error;
    }
}