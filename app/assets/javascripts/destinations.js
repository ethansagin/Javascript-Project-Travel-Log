const BASEURL = "http://localhost:3000"

function getAttractions(id) {
    $("#attractions").html(`<ul>`)
    fetch(BASEURL + `/destinations/${id}.json`)
    .then(resp => resp.json())
    .then(destination => {
        document.getElementById("attractions").innerHTML += destination.attractions.map(att => {
            let a = new Attraction(att)
            return a.renderAttractionLink(id)
        }).join('')
        $("#attractions").append(`<ul>`)
        addListenersToLinks()
    })
}

function addListenersToLinks() {
    document.querySelectorAll("#attractions-links").forEach(function(link) {
        link.addEventListener("click", displayAttraction)
    }) 
}

class Attraction {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.url = obj.url
        this.kind_of_attraction = obj.kind_of_attraction
        this.recommend = obj.recommend
        this.comments = obj.comments
    }

    renderAttractionLink(destid) {
        return `
            <li><a href="#" data-id="${this.id}" data-destid="${destid}" id="attractions-links">${this.name}</a></li>
        `
    }

    renderAttraction() {
        debugger
    }
}



function displayAttraction() {
    fetch(BASEURL + `/destinations/${this.dataset.destid}/attractions/${this.dataset.id}`)
    .then(resp => resp.json())
    .then(att => {
        let a = new Attraction(att)
        return a.renderAttraction()
    })
}


function displayAttractionForm() {
    // hijack form, submit to createAttraction()
}

function createAttraction() {
    // make construct from form inputs, stringify and post w/ fetch, adds to index list
}