import { Form } from "./requestForm.js"
import { Requests } from "./requests.js"

//Generates body html for site.
//A simple function which returns an html string with callback functions for 
// form component and requests component.
export const ClownService = () => {
    return `
    <h1>Buttons the Clown</h1>

    <section class="form">
        <h2>Request a Clown</h2>
        ${Form()}
    </section>

    <section class="requests">
        <h2>Requests</h2>
        ${Requests()}
    </section>
    `
}
