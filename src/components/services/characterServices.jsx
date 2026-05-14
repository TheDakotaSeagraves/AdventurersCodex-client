export const getCharacters = () => {
    return fetch("http://localhost:8000/characters", {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('adventurerscodex_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}