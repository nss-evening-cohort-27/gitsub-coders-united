console.log("aha");


const projects =  [
{
  id: 1,
  projectName: "LAB-pet-adoption",
  description: "This is a project I made at nss called Pet Adoption, this reviews rendering to the dom and creating a CRUD app",
  time: "updated 90 years ago",
},
{
   id: 2,
   projectName: "LAB-hogwarts-sorting-hat",
   description: "This is my project that I made at NSS that works on CRUD and re usable functions",
   time: "updated 44 seconds ago",
},]

//This creates a function called render to dom that takes in a div id and somesort of html that will go where the selected div lives
const renderToDom = (divId, htmlToRender) => {
  // Creates a const and uses a query selector to grab the div we want to target
    const selectedDiv = document.querySelector(divId);
  // Accessing the inner html of the selected div and setting it to be whatever html we need to render here
    selectedDiv.innerHTML = htmlToRender;
  };

  renderToDom("#content-one", "Hello World");

  const cardsOnDom = (array) => {
    // creates an emptys string where we can store this info
      let domString = "";
    // for loop iterating through the pets array
      for (const projects of array) {
    // adding the boostrap card to the empty string elements
        domString += 
    // boostrap card
        `<div class="card" id="card-container" >
        <div class="card-body">
        <h5 id="cardTitle" class="card-title">${projects.projectName}</h5>
          <p id="cardText" class="card-text">${projects.description}</p>
          <p id="cardText" class="card-text">${projects.time}</p>
          <hr></hr>
          <button class="btn btn-danger" id="delete--${projects.id}">Delete</button>
        </div>
    </div>
      `
      }
    // calling the renderToDom function with the properties of the div app and the string element which now contains our card
      renderToDom("#content-one", domString);
    };

    cardsOnDom(projects)

      // ******************** //
// ****** CREATE ****** //
// ******************** //

// 1. select/target the form on the DOM
const form = document.querySelector('form');

// 2. create a function that grabs all the values from the form, pushes the new object to the array, then repaints the DOM with the new teammate
const createMember = (e) => {
  e.preventDefault(); // EVERY TIME YOU CREATE A FORM

  const newMemberObj = {
    id: projects.length + 1,
    projectName: document.querySelector("#repoOwner").value,
    description: document.querySelector("#repoDescritpion").value,
    time: "Updated " + document.lastModified + " ago"
  }

  projects.push(newMemberObj);
  cardsOnDom(projects);
  form.reset();
}

// 3. Add an event listener for the form submit and pass it the function (callback)
form.addEventListener('submit', createMember);

// ******************** //
// ****** DELETE ****** //
// ******************** //

// Here we will be using event bubbling
// 1. Target the app div
// 2. Add an event listener to capture clicks
// 3. check e.target.id includes "delete"
// 4. add logic to remove from array
// 5. Repaint the DOM with the updated array
// 6. Organize code so that everything is in a function except selectors

// 1. Target the app div
const app = document.querySelector("#content-one");

// 2. Add an event listener to capture clicks

app.addEventListener("click", (e) => {
  // console.log(e.target.id);

  // 3. check e.target.id includes "delete"
  if (e.target.id.includes("delete")) {
    // destructuring: https://github.com/orgs/nss-evening-web-development/discussions/11
    const [, id] = e.target.id.split("--");

    // 4. add logic to remove from array
    // .findIndex is an array method
    const index = projects.findIndex((member) => member.id === Number(id));

    // .splice modifies the original array
    projects.splice(index, 1);

    // 5. Repaint the DOM with the updated array
    cardsOnDom(projects);
  }
});