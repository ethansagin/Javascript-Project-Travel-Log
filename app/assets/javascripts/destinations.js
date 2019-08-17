const BASEURL = "http://localhost:3000"

function getAttractions(id) {
    $("#attractions").html(`<ul>`)
    fetch(BASEURL + `/destinations/${id}.json`)
    .then(resp => resp.json())
    .then(destination => {
        document.getElementById("attractions").innerHTML += destination.attractions.map(att => {
            let a = new Attraction(att)
            return a.renderAttractionLink()
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
        this.destination_id = obj.destination_id
    }

    renderAttractionLink() {
        return `
            <li id="attractions-lis" data-id="${this.id}"><a href="#" data-id="${this.id}" data-destid="${this.destination_id}" id="attractions-links">${this.name}</a></li>
        `
    }

    renderAttraction() {
        return `
            <div>
                <p>Type of attraction: ${this.kind_of_attraction}</p>
                <p>Recommended: ${this.recommend ? "Check it out!" : "Not worth it"}</p>
                <p>Comments: ${this.comments}</p>
                <p>Website: ${this.url}</p>
            </div>
        `
    }
}



function displayAttraction(e) {
    e.preventDefault()
    fetch(BASEURL + `/destinations/${this.dataset.destid}/attractions/${this.dataset.id}`)
    .then(resp => resp.json())
    .then(att => {
        let a = new Attraction(att)
        document.querySelectorAll("#attractions-lis").forEach(function(li) {
            if(parseInt(li.dataset.id) === a.id) {
                li.innerHTML += a.renderAttraction()
            } 
        })
    })
}


function displayAttractionForm() {
    // hijack form, submit to createAttraction()
}

function createAttraction() {
    // make construct from form inputs, stringify and post w/ fetch, adds to index list
}