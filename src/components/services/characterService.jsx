// Fetches all characters belonging to the logged-in user
export const getMyCharacters = () => {
    return fetch("http://localhost:8000/characters", {
        headers: {
            Authorization: "Token " + localStorage.getItem('adventurerscodex_token'),
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

// Creates a new character with the given payload
export const createCharacter = (payload) => {
    return fetch("http://localhost:8000/characters", {
        method: "POST",
        headers: {
            Authorization: "Token " + localStorage.getItem('adventurerscodex_token'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
}

// Fetches a single character by ID
export const getCharacter = (id) => {
    return fetch("http://localhost:8000/characters/" + id, {
        headers: {
            Authorization: "Token " + localStorage.getItem('adventurerscodex_token'),
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

// Updates an existing character by ID with the given payload
export const updateCharacter = (id, payload) => {
    return fetch("http://localhost:8000/characters/" + id, {
        method: "PUT",
        headers: {
            Authorization: "Token " + localStorage.getItem('adventurerscodex_token'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(res => res.json())
}

// Deletes a character by ID, returns true if successful
export const deleteCharacter = (id) => {
    return fetch("http://localhost:8000/characters/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Token " + localStorage.getItem('adventurerscodex_token')
        }
    }).then(res => res.ok)
}
