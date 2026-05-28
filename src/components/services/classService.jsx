// Fetches all available D&D classes from the API
export const getClasses = () => {
    return fetch("http://localhost:8000/dnd-classes", {
        headers: {
            Authorization: "Token " + localStorage.getItem('adventurerscodex_token'),
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}
