
//comment arrays
var commentArray = [
  {
    "name": "Theodore Duncan",
    "date": "November 15, 2018 11:15:00",
    "comment": "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!"
  },
  {
    "name": "Gary Wong",
    "date": "December 12, 2018 13:01:00",
    "comment": "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!"
  },
  {
    "name": "Michael Lyons",
    "date": "January 28, 2019 16:00:00",
    "comment": "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed."
  }
];


// function that displays the comments to the page
function displayComment(commentName, commentDate, commentComment) {

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

  // image creation
  var img = document.createElement("img");
  img.className = "commentJava__pic";
  img.src = "Assets/Images/Gallery/Mohan-muruge.jpg";
  // end of image creation

  // create a div
  var div = document.createElement("div");
  div.className = "commentJava__section";
  div.innerHTML = '<img src="Assets/Images/Gallery/Mohan-muruge.jpg" class="commentJava__pic"><h4 class="commentJava__name">' + commentName + '</h4><h5 class="commentJava__date">' + dateSince + '</h5><p class="commentJava__comment">' + commentComment + '</p>'
  // end of div creation

  // this code was used before but switch to innerhtml as its shorter
  // // name of comment
  // var name1 = document.createElement("h4");
  // var nameText = document.createTextNode(commentName);
  // name1.className = "commentJava__name";
  // name1.appendChild(nameText);

  // //date of comment calculated by days, hours, minutes, seconds
  // var date1 = document.createElement("h5");
  // var dateCurrent = document.createTextNode(dateSince);
  // date1.className = "commentJava__date";
  // date1.appendChild(dateCurrent);

  // //comment
  // var comment1 = document.createElement("p");
  // var commentCurrent = document.createTextNode(commentComment);
  // comment1.className = "commentJava__comment";
  // comment1.appendChild(commentCurrent);

  // //add the comment componenets to a div
  // div.appendChild(img);
  // div.appendChild(name1);
  // div.appendChild(date1);
  // div.appendChild(comment1);

  //write the div html to the page in reverse order
  var before1 = document.getElementById("commentJava");
  before1.insertBefore(div, before1.childNodes[0]);
  //document.getElementById('commentJava').appendChild(div);

};


// add the comments from the array to the page
function addToPage() {
  for (var i = 0; i < commentArray.length; i++) {
    displayComment(commentArray[i].name, commentArray[i].date, commentArray[i].comment);
  };
};

// run the function addToPage
addToPage();


//event listener for adding a comment
document.getElementById("commentContent__addButton").addEventListener("click", formValidation);


// function to add comment to page
function addComment() {
  //retrieve the values inputted in the form
  var x = document.forms["commentSubmit"]["name"].value;
  var y = document.forms["commentSubmit"]["comment"].value;
  var today = new Date();

  //push new comment into the array
  commentArray.push({ "name": x, "date": today, "comment": y });

  // remove all the comments from the page
  var clearDiv = document.getElementById('commentJava');
  while (clearDiv.firstChild)
    clearDiv.removeChild(clearDiv.firstChild);
  
  // add comments to page
  addToPage();

  // clear the form
  document.getElementById("commentSubmit").reset();
};


// check the form to make sure all fields are filled out
function formValidation() {
  // retrive value of 
  var formName = document.forms["commentSubmit"]["name"].value;
  var formComment = document.forms["commentSubmit"]["comment"].value;
  if (formName == "" || formComment == "") {
    // if form fields are not valid, alert and do not add comment
    alert("All fields must be filled out");
    return false;
  }
  else {
    // if the form fields are validated, proceed to add comment to page
    addComment();
  }
}
