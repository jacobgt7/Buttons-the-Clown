import { ClownService } from "./ClownService.js";
import { fetchRequests, fetchClowns, fetchCompletions } from "./dataAccess.js";

//Define main container
const mainContainer = document.querySelector(".container")

//Event listener to render when state is changed
mainContainer.addEventListener("stateChanged", () => {
    render()
})

//Render function
const render = () => {
    fetchRequests()
        .then(fetchClowns())
        .then(fetchCompletions())
        .then(() => {
            mainContainer.innerHTML = ClownService()
        })
}

//Invoke Render
render()
