async function postObjectAsJson(url, object) {
    const objectAsJsonString = JSON.stringify(object)
    console.log(objectAsJsonString)
    const fetchOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions)
    return response

}

function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json())
}

async function restDelete(url) {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    }
    const response = await fetch(url, fetchOptions)
    return response
}

export {postObjectAsJson, fetchAnyUrl, restDelete}