export const getRaces = () => {
    return fetch("http://localhost:8000/races", {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('adventurerscodex_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}