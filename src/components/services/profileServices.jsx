export const getProfile = () => {
    return fetch("http://localhost:8000/profile", {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('adventurerscodex_token')).token,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}

export const updateProfile = (profile) => {
    return fetch("http://localhost:8000/profile", {
        method: "PUT",
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem('adventurerscodex_token')).token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    }).then(res => res.json())
}
