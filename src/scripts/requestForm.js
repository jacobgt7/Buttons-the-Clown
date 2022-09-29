import { sendRequest } from "./dataAccess.js"

//Event listener for submit button
//listen for click
document.addEventListener("click", e => {
    if (e.target.id === "submitButton") {
        //get the data from the form fields
        const parentName = document.querySelector("input[name='parentName']").value
        const childName = document.querySelector("input[name='childName']").value
        const numOfChildren = document.querySelector("input[name='numOfChildren']").value
        const address = document.querySelector("input[name='address']").value
        const dateOfReservation = document.querySelector("input[name='dateOfReservation']").value
        const reservationLength = document.querySelector("input[name='reservationLength']").value
        //create an object with properties for each form field
        const dataToSendToAPI = {
            parentName: parentName,
            childName: childName,
            numOfChildren: numOfChildren,
            address: address,
            dateOfReservation: dateOfReservation,
            reservationLength: reservationLength
        }
        //POST object to database
        sendRequest(dataToSendToAPI)
    }
}
)


//A function that genertates the html for the request form.
//Input for parent's name
//Input for child's name
//input for number of children
//input for address of party
//input for date of reservation
//input for length of reservation in hours
//submit button
export const Form = () => {
    return `
    <form>
        <div class="field">
            <label for="parentName">Name of Parent</label>
            <input type="text" name="parentName"/>
        </div>
        <div class="field">
            <label for="childName">Name of Child</label>
            <input type="text" name="childName"/>
        </div>
        <div class="field">
            <label for="numOfChildren">How many children?</label>
            <input type="number" name="numOfChildren"/>
        </div>
        <div class="field">
            <label for="address">Party Address</label>
            <input type="text" name="address"/>
        </div>    
        <div class="field">
            <label for="dateOfReservation">Date of Party</label>
            <input type="date" name="dateOfReservation"/>
        </div>    
        <div class="field">
            <label for="reservationLength">How many hours?</label>
            <input type="number" name="reservationLength"/>
        </div>

            <button id="submitButton">Submit Request</button>
    </form>
    `
}