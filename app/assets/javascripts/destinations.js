const BASEURL = "http://localhost:3000"

function getAttractions(id) {
    $("#attractions").html(`<ul>`)
    fetch(BASEURL + `/destinations/${id}.json`)
    .then(resp => resp.json())
    .then(destination => {
        document.getElementById("attractions").innerHTML += destination.attractions.map(att => {
            let a = new Attraction(att)
            return a.render()
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
    render() {
        return `
            <li><a href="#" data-id="${this.id}" id="attractions-links">${this.name}</a></li>
        `
    }
}



function displayAttraction() {

}