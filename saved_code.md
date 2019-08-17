
<div>
    <h3>Attractions of <%= @destination.name %></h3>

    <% if !@destination.attractions.recommended.empty? %>
        <h4>Recommended</h4>

        <% @destination.attractions.recommended.each do |attraction| %>
            <%= link_to attraction.name, destination_attraction_path(@destination, attraction) %> <br>
        <% end %>
    <% end %>

    <% if !@destination.attractions.not_recommended.empty? %>
        <h4>Not recommended</h4>

        <% @destination.attractions.not_recommended.each do |attraction| %>
            <%= link_to attraction.name, destination_attraction_path(@destination, attraction) %> <br>
        <% end %>
    <% end %> <br>

    <%= link_to 'Add Attraction', new_destination_attraction_path(@destination) %>
</div>

<h2>Attraction: <%= @attraction.name %></h2>

<div>
    <strong>Visited during trip to <%= @destination.name %>, <%= @destination.country.name %></strong> <br>

    Kind of attraction: <%= @attraction.kind_of_attraction %> <br>

    Would recommend to others? - <%=  @attraction.recommend? ? "Yes" : "No" %> <br>

    Website: <%= @attraction.url %> <br>

    Comments: <%= @attraction.comments %> <br>
</div> <br>

<%= link_to 'Edit Attraction', edit_destination_attraction_path(@destination, @attraction) %> <br>
<%= link_to 'Delete Attraction', destination_attraction_path(@destination, @attraction), method: :delete %>
From Nancy Noyes to Everyone:  04:07 PM
If after a fetch request a student gets SyntaxError: Unexpected token < in JSON at position 0 error and Cannot verify authenticity token  add skip_before_action :verify_authenticity_token to the controller being fetched from
Or

var token = Rails.csrfToken();

  fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-CSRF-TOKEN": token
    },
    credentials: "include",
    body: JSON.stringify({ task })
  })
    .then(response => response.json())
    .then(task => {
      document.querySelector("#task-added").innerHTML += `<li>${
        task.content
      }</li>`;
      let taskFormDiv = document.getElementById("task-form");
      taskFormDiv.innerHTML = "";
    });
}
