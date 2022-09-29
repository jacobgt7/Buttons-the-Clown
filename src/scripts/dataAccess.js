const applicationState = {
    clowns: [],
    requests: [],
    completions: []
}

const API = "http://localhost:8088"
const mainContainer = document.querySelector(".container")

//function for fetching requests from database
export const fetchRequests = () => {
    return fetch(`${API}/requests?_sort=dateOfReservation&_order=asc`)//Sorts according to date when fetching.
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

//function for sending requests to database
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => {
            return response.json()
        })
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//Function deletes requests from database
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

//Function fetches clowns and stores in applicationState
export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(res => res.json())
        .then(fetchedClowns => {
            applicationState.clowns = fetchedClowns
        })
}

//Function fetches completions and stores in applicationState
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(res => res.json())
        .then(fetchedCompletions => {
            applicationState.completions = fetchedCompletions
        })
}

//Function sends completions to database
export const sendCompletions = (completionObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionObj)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(res => res.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


//functions for exporting the application state
export const getRequests = () => applicationState.requests.map(request => ({ ...request }))
export const getClowns = () => applicationState.clowns.map(clown => ({ ...clown }))
export const getCompletions = () => applicationState.completions.map(completion => ({ ...completion }))