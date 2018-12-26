export const registerUser = (userData, history) => async dispatch => {
    const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    const data = await res.json()
    console.log(data)
}

export const loginUser = (userData, history) => async dispatch => {
    console.log(userData)
    const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })

    const data = await res.json()
    console.log(data)
}