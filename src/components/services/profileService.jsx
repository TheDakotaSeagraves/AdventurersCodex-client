// Fetches the current user's profile from the API
export const getProfile = () => {
    return fetch("http://localhost:8000/profile", {
        headers: {
            Authorization: "Token " + localStorage.getItem('adventurerscodex_token'),
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

// Sends updated profile data to the API (PUT replaces the whole profile)
export const updateProfile = (profile) => {
    return fetch("http://localhost:8000/profile", {
        method: "PUT",
        headers: {
            Authorization: "Token " + localStorage.getItem('adventurerscodex_token'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    }).then(res => res.json())
}
