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
    document.querySelectorAll(".attractions-links").forEach(function(link) {
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
            <li class="attractions-lis" data-id="${this.id}">
                <a href="#" data-id="${this.id}" data-destid="${this.destination_id}" class="attractions-links">${this.name}</a>
            </li>
        `
    }

    renderAttraction() {
        return `
            <div class="attraction">
                <p>
                    Kind of attraction: ${this.kind_of_attraction}<br>
                    Recommend to friends?: ${this.recommend ? "Check it out!" : "Not worth it"}<br>
                    Comments: ${this.comments}<br>
                    Website: ${this.url}<br>
                </p>
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
        document.querySelectorAll(".attractions-lis").forEach(function(li) {
            if(parseInt(li.dataset.id) === a.id) {
                li.innerHTML += a.renderAttraction()
            } 
        })
    })
}

function displayAttractionForm(id) {
    document.querySelector("#attraction-form").innerHTML = `
        <form onsubmit="createAttraction(${id}); return false;">
            <label>Name: </label>
            <input type="text" id="name"> <br>
            <label>Kind of Attraction: </label>
            <input type="text" id="kind_of_attraction"> <br>
            <label>Recommend?: </label>
            <input type="checkbox" id="recommend"> <br>
            <label>Comments: </label>
            <input type="textarea" id="comments"> <br>
            <label>URL: <label>
            <input type="text" id="url"> <br>
            <input type="submit" value="Create Attraction">
        </form>
    `
}

function createAttraction(id) {
    attraction = {
        name: document.getElementById("name").value,
        kind_of_attraction: document.getElementById("kind_of_attraction").value,
        recommend: document.getElementById("recommend").checked,
        comments: document.getElementById("comments").value,
        url: document.getElementById("url").value
    }
    fetch(BASEURL + `/destinations/${id}/attractions`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(attraction)
    })
    .then(resp => resp.json())
    .then(att => {
        let a = new Attraction(att)
        document.querySelector("#attraction-form").innerHTML = `
            <p>${a.name} has been added to this destination's list of attractions!</p> <br>
            <button onclick='displayAttractionForm(${a.destination_id})'>Add Attraction</button>
        `
        getAttractions(a.destination_id)
    })
}
