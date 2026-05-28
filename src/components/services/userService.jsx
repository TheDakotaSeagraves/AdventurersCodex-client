// Registers a new user account and returns the auth response (includes token on success)
export const registerUser = (userData) => {
    return fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    }).then(res => res.json())
}

// Sends login credentials to the API and returns the auth response
export const loginUser = (credentials) => {
    return fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(res => res.json())
}

// Fetches the currently authenticated user's data
export const getCurrentUser = () => {
    return fetch("http://localhost:8000/current_user", {
        headers: {
            Authorization: "Token " + localStorage.getItem('adventurerscodex_token'),
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}
