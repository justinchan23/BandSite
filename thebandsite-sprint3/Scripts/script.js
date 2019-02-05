
const url = "https://project-1-api.herokuapp.com/comments/";
const apiKey = "?api_key=33f74e24-9540-4fe2-adb7-2fcb20a322f4";


// fetch the comments from the api and load to page
function getComments() {
  fetch(url + apiKey, {
    method: 'get',
  }).then(response => response.json())
    .then(myJson => {
      var comment = myJson;
      commentLength = comment.length
      for (var i = 0; i < comment.length; i++) {
        var dateCon = new Date(comment[i].timestamp);
        addCommentToPage(comment[i].name, dateCon, comment[i].comment, comment[i].id);
      };
    })
    .catch(error => console.log(error));
}

getComments();

// event listener for adding a comment
document.getElementById("commentContent__addButton").addEventListener("click", formValidation)


// function that adds the comments to the page
function addCommentToPage(commentName, commentDate, commentComment, idString) {
  // calculate days since last post
  var date1 = new Date(commentDate).getTime();
  var today = new Date().getTime();

  // calculate difference between dates in milliseconds
  var difference = today - date1;

  // calculate difference between dates in seconds
  difference = difference / 1000;
  var seconds = Math.floor(difference % 60);

  // calculate difference between dates in minutes
  difference = difference / 60;
  var minutes = Math.floor(difference % 60);

  // calculate difference between dates in hours
  difference = difference / 60;
  var hours = Math.floor(difference % 24);

  // calculate difference between dates in days
  
  var days = Math.floor(difference / 24);

  // conditional to determine output of days, hours, minutes or seconds
  if (days > 0) {
    dateSince = days + " days ago";
  } else if (days == 0 & hours == 1) {
    dateSince = hours + " hour ago";
  } else if (days == 0 & hours > 0) {
    dateSince = hours + " hours ago";
  } else if (hours == 0 & minutes == 1) {
    dateSince = minutes + " minute ago"
  } else if (hours == 0 & minutes > 0) {
    dateSince = minutes + " minutes ago"
  } else {
    dateSince = seconds + " seconds ago"
  };


  // create a div and place inside the comment section
  var div = document.createElement("div");
  div.className = "commentJava__section";
  div.id = idString;
  div.innerHTML = `
  <img src="Assets/Images/Gallery/Mohan-muruge.jpg" class="commentJava__pic">
  <h4 class="commentJava__name">${commentName}</h4>
  <h5 class="commentJava__date">${dateSince}</h5>
  <p class="commentJava__comment">${commentComment}</p>
  `
  // end of div creation

  // delete button
  var delete1 = document.createElement("button");
  delete1.innerHTML = "Delete"
  delete1.className = "commentContent__delete";
  delete1.id = idString;
  // event listener for deleting comment
  delete1.addEventListener('click', deleteComment);

  // add delete button to comment div
  div.appendChild(delete1);

  // write the div html to the page in reverse order
  var before1 = document.getElementById("commentJava");
  before1.insertBefore(div, before1.childNodes[0]);
  //document.getElementById('commentJava').appendChild(div);

};


function addCommentEvent() {
  // retrieve the values inputted in the form
  var nameValue = document.forms["commentSubmit"]["name"].value;
  var commentValue = document.forms["commentSubmit"]["comment"].value;
  //var today = new Date();

  //assign form data into json array
  var data = {
    "name": nameValue,
    "comment": commentValue
  };


  //post the comment to the api
  fetch(url + apiKey, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(reloadComments = () => {
    // remove all the comments from the page
    var clearDiv = document.getElementById('commentJava');
    while (clearDiv.firstChild)
      clearDiv.removeChild(clearDiv.firstChild);
    // call the getComment function to load comments to page
    getComments();
  })
    .catch(error => console.log(error));

  //reset the form to blank
  document.getElementById("commentSubmit").reset();

}


// delete comment function
function deleteComment() {
  // retrieve the id of the button clicked
  var deleteCommentId = this.id;

  //assign id of comment to 'data' variable to send to api
  var data = {
    "id": deleteCommentId,
  };

  //delete the comment from the api
  fetch(url + deleteCommentId + apiKey, {
    method: 'delete',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .catch(error => console.log(error));


  // remove the comment from the page
  document.getElementById(deleteCommentId).remove();

}


// check the form to make sure all fields are filled out
function formValidation() {
  // retrive value of 
  var formName = document.forms["commentSubmit"]["name"].value;
  var formComment = document.forms["commentSubmit"]["comment"].value;
  if (formName === "" || formComment === "") {
    // if form fields are not valid, alert and do not add comment
    alert("All fields must be filled out");
    return false;
  }
  else {
    // if the form fields are validated, proceed to add comment to page
    addCommentEvent();
  }
}