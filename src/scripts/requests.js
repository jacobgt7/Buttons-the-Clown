import { getRequests, deleteRequest, getClowns, sendCompletions, getCompletions } from "./dataAccess.js";

//Event listener for click on "Deny" button.
document.addEventListener("click", e => {
    //If event target id starts with "request"...
    if (e.target.id.startsWith("request")) {
        const [, primaryKey] = e.target.id.split("--")

        //Invoke deleteRequest and pass primary key as argument
        deleteRequest(parseInt(primaryKey))
    }
})

//Event listener for when a clown is selected.
document.addEventListener("change", e => {
    //If event target id is "clowns"...
    if (e.target.id === "clowns") {
        //deconstruct the target value into two variables
        const [clownKey, requestKey] = e.target.value.split("--")
        //Create and format the date.
        let date = new Date()
        let month = date.getMonth() + 1 //Plus one to accout for 0 index
        let day = date.getDate()
        let year = date.getFullYear()
        let currentDate = `${month}-${day}-${year}`
        //build a completion object with target value variables and todays date
        const completion = {
            clownId: parseInt(clownKey),
            requestId: parseInt(requestKey),
            date: currentDate
        }
        //invoke sendCompletions and pass in the object as an argument
        sendCompletions(completion)
    }
})

//List submitted requests in chronological order: closest date first.
export const Requests = () => {
    const requests = getRequests()
    const clowns = getClowns()
    const completions = getCompletions()

    //Function returns new array with only unfulfilled requests
    const unfulfilledRequests = () => {
        let unfulfilledArray = []
        requests.forEach(request => {
            let matchingCompletion = completions.find(completion => completion.requestId === request.id)
            if (!matchingCompletion) {
                unfulfilledArray.push(request)
            }
        })
        return unfulfilledArray
    }

    //function returns new array with onlu fullfilled requests
    const fullfilledRequests = () => {
        let fulfilledArray = []
        requests.forEach(request => {
            let matchingCompletion = completions.find(completion => completion.requestId === request.id)
            if (matchingCompletion) {
                request.fulfilledDate = matchingCompletion.date
                request.clownName = clowns.find(clown => clown.id === matchingCompletion.clownId).name
                fulfilledArray.push(request)
            }
        })
        return fulfilledArray
    }


    //create html for requests
    let html = `<ul>`

    unfulfilledRequests().forEach(request => {
        html += `
        <li class="singleRequest">
            <ul>
                <li>Parent: ${request.parentName}</li>
                <li>Child: ${request.childName}</li>
                <li>${request.numOfChildren} children</li>
                <li>${request.address}</li>
                <li>${request.dateOfReservation}</li>
                <li>${request.reservationLength} hours</li>
            </ul>

            <select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${clowns.map(
            clown => {
                return `<option value="${clown.id}--${request.id}">${clown.name}</option>`
            }
        ).join("")
            }
</select>

            <button class="deny_request" id="request--${request.id}">Deny</button>
        </li>`
    })

    fullfilledRequests().forEach(request => {
        html += `
        <li class="completion">
            <ul>
                <li>Parent: ${request.parentName}</li>
                <li>Child: ${request.childName}</li>
                <li>${request.numOfChildren} children</li>
                <li>${request.address}</li>
                <li>${request.dateOfReservation}</li>
                <li>${request.reservationLength} hours</li>
            </ul>
            <p>Resrvation fullfilled by ${request.clownName} on ${request.fulfilledDate}`
    })


    html += `</ul > `
    return html
}
//Ability to mark completed requests with who filled reservation.