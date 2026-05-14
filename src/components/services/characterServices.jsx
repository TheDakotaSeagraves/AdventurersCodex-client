export const getCharacters = () => {
    return fetch("http://localhost:8000/characters", {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('adventurerscodex_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}


export const createCharacter = (payload) => {
    return fetch("http://localhost:8000/characters", {
        method: "POST",
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('adventurerscodex_token')).token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
}

export const getCharacter = (id) => {
    return fetch("http://localhost:8000/characters/" + id, {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('adventurerscodex_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}