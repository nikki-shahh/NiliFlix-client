# NiliFlix
React App

## Description 
Using React, build the client-side for my application called NiliFlix based on its existing
<a href="https://github.com/nikki-shahh/NiliFlix">server-side</a> code (REST API and database) .The
API and database that I built meet the information needs of NiliFlix users. This is a the interface they will use when making requests to, and receiving responses from, the
server-side. The client-side of my NiliFlix application will include several interface views built
using the React library that will handle data through the previously-defined REST API endpoints.

#### User Stories:
● As a user, I want to be able to access information on movies, directors, and genres so
that I can learn more about movies I’ve watched or am interested in.<br>
● As a user, I want to be able to create a profile so I can save data about my favorite
movies

### Essential view and Features

<p>
Main view <br>
● Returns a list of ALL movies to the user (each listed item with an image, title, and
description)<br>
● Sorting and filtering<br>
● Ability to select a movie for more details
</p>
<p>Single movie view<br>
● Returns data (description, genre, director, image) about a single movie to the user<br>
● Allows users to add a movie to their list of favorites
</p>
<p>Login view<br>
● Allows users to log in with a username and password
Registration view<br>
● Allows new users to register (username, password, email, birthday)
</p>
<p>Genre view<br>
● Returns data about a genre, with a name and description<br>
● Displays example movies
</p>
<p>
Director view<br>
● Returns data about a director (name, bio, birth year, death year)<br>
● Displays example movies
</p>
<p>
Profile view<br>
● Allows users to update their user info (username, password, email, date of birth)<br>
● Allows existing users to deregister<br>
● Displays favorite movies<br>
● Allows users to remove a movie from their list of favorites </p>

### Technical Requirements
<ul>
<li>The application must be a single-page application (SPA)</li>
<li>The application must use state routing to navigate between views and share URLs</li>
<li>The application must give users the option to filter movies</li>
<li>The application must give users the option to sort movies</li>
<li>The application must initially use Parcel as its build tool</li>
<li>The application must be written using the React library and in ES2015+</li>
<li>The application must be written with React Redux (hence respecting the Flux pattern)</li>
<li>The application must use Bootstrap as a UI library for styling and responsiveness</li>
<li>The application must contain a mix of class components and function components</li>
<li>The application may be hosted online</li>
</ul>
### Dependencies

react-bootstrap
axios
react-dom
react-redux
react-router-dom
redux
redux-devtools-extension
@parcel/transformer-image
@parcel/transformer-sass
parcel-bundler

### Built with:

<ul>React</ul>
