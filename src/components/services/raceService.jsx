// Fetches all available D&D races from the API
export const getRaces = () => {
    return fetch("http://localhost:8000/races", {
        headers: {
            Authorization: "Token " + localStorage.getItem('adventurerscodex_token'),
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}
