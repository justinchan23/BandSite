
const url = "https://project-1-api.herokuapp.com/comments/";
const apiKey = "?api_key=575a63cb-7f6b-4471-a448-6a2c140e86c1";


// fetch the comments from the api and load to page
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
  } else if (days == 0 & hours > 0) {
    dateSince = hours + " hours ago";
  } else if (hours == 0 & minutes > 0) {
    dateSince = minutes + " minutes ago"
  } else {
    dateSince = seconds + " seconds ago"
  };

  // creating all the tags here
  // image creation
  // var img = document.createElement("img");
  // img.className = "commentJava__pic";
  // img.src = "Assets/Images/Gallery/Mohan-muruge.jpg";
  // end of image creation

  // create a div and place inside the comment section
  var div = document.createElement("div");
  div.className = "commentJava__section";
  div.id = idString;
  div.innerHTML = '<img src="Assets/Images/Gallery/Mohan-muruge.jpg" class="commentJava__pic"><h4 class="commentJava__name">' + commentName + '</h4><h5 class="commentJava__date">' + dateSince + '</h5><p class="commentJava__comment">' + commentComment + '</p>'
  // end of div creation

  // // name
  // var name1 = document.createElement("h4");
  // name1.innerHTML = commentName;
  // name1.className = "commentJava__name";
  // // name1.appendChild(nameText);

  // // date
  // var date1 = document.createElement("h5");
  // date1.innerHTML = dateSince;
  // date1.className = "commentJava__date";
  // // date1.appendChild(dateCurrent);

  // delete button
  var delete1 = document.createElement("button");
  delete1.innerHTML = "Delete"
  delete1.className = "commentContent__delete";
  //delete1.setAttribute("data-label", idString);
  delete1.id = idString;
  // delete1.appendChild(deleteText);
  // event listener for deleting comment
  delete1.addEventListener('click', deleteComment);

  // // comment
  // var comment1 = document.createElement("p");
  // comment1.innerHTML = commentComment;
  // comment1.className = "commentJava__comment";
  // //comment1.appendChild(commentCurrent);

  // // add everything to a div
  // div.appendChild(img);
  // div.appendChild(name1);
  // div.appendChild(date1);
  // div.appendChild(comment1);
  div.appendChild(delete1);


  // write the div html to the page in reverse order
  var before1 = document.getElementById("commentJava");
  before1.insertBefore(div, before1.childNodes[0]);
  //document.getElementById('commentJava').appendChild(div);

};


function addCommentEvent() {
  // retrieve the values inputted in the form
  var x = document.forms["commentSubmit"]["name"].value;
  var y = document.forms["commentSubmit"]["comment"].value;
  var today = new Date();

  //assign form data into json array
  var data = {
    "name": x,
    "comment": y
  };
  

  //post the comment to the api
  fetch(url + apiKey, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
    .then(myJson => {
      // get the id of the comment from the response of the server
      var idNumber = myJson.id;
      // add the new comment to the page
      addCommentToPage(x, today, y, idNumber);
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