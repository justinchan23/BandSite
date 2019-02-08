
const url = "https://project-1-api.herokuapp.com/comments/";
const apiKey = "?api_key=25cadaa5-9cad-4892-a867-f96564af9f04";


// fetch the comments from the api and load to page
function getComments() {
  axios.get(`${url}${apiKey}`)
    .then(response => {
      var comment = response.data;
      comment.forEach(value => {
        var dateCon = new Date(value.timestamp);
        addCommentToPage(value.name, dateCon, value.comment, value.id, value.likes);
      })
    })
    .catch(error => console.log(error));
}

// get the comments and load to page after page has loaded
$(function () {
  getComments();
  // event listener for adding a comment
  $('#commentContent__addButton').click(formValidation)
  // button for going to top of page
  window.onscroll = function () { toTopButtonDisplay() }
  $('#toTopButton').click(scrollUp)
})

// function that adds the comments to the page
function addCommentToPage(commentName, commentDate, commentComment, idString, likesCount) {
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
    dateSince = `${days} days ago`;
  } else if (days == 0 & hours == 1) {
    dateSince = `${hours} hour ago`;
  } else if (days == 0 & hours > 0) {
    dateSince = `${hours} hours ago`;
  } else if (hours == 0 & minutes == 1) {
    dateSince = `${minutes} minute ago`;
  } else if (hours == 0 & minutes > 0) {
    dateSince = `${minutes} minutes ago`;
  } else {
    dateSince = `${seconds} seconds ago`;
  };


  // create a div and place inside the comment section
  var div = $('<div></div>')
  $(div).addClass('commentJava__section')
  $(div).attr('id', idString)
  $(div).html(`
  <img src="Assets/Images/Gallery/Mohan-muruge.jpg" class="commentJava__pic">
  <h4 class="commentJava__name">${commentName}</h4>
  <h5 class="commentJava__date">${dateSince}</h5>
  <p class="commentJava__comment">${commentComment}</p>
  `)
  // end of div creation


  // delete button
  var delete1 = $('<button></button>')
  $(delete1).html('Delete')
  $(delete1).addClass('commentContent__delete')
  $(delete1).attr('id', idString)
  // event listener for deleting comment
  $(delete1).click(deleteComment)

  // add delete button to comment div
  $(div).append(delete1)

  // like button
  var like = $('<button></button>')
  if (likesCount === 1) {
    $(like).html(`${likesCount} Like`)
  } else {
    $(like).html(`${likesCount} Likes`)
  }
  $(like).addClass('commentContent__like')
  $(like).attr('id', idString)
  $(like).attr('likes', likesCount)
  // event listener for liking comment
  $(like).click(likeFunc)

  // add like button to comment div
  $(div).append(like)

  // write the div html to the page in reverse order
  $('#commentJava').prepend(div);

};


function addCommentEvent() {
  // retrieve the values inputted in the form
  var nameValue = $('#name').val()
  var commentValue = $('#comment').val()

  //assign form data into var
  var data = {
    "name": nameValue,
    "comment": commentValue
  };

  var header = {
    headers: {
      'Content-Type': 'application/json'
    }
  }


  //post the comment to the api
  axios.post(`${url}${apiKey}`, data, header)
    //.then(response => console.log(response))
    .then(reloadComments = () => {
      // remove all the comments from the page
      $('#commentJava').empty();
      // call the getComment function to load comments to page
      getComments();
      //reset the form to blank
      $('#commentSubmit')[0].reset();
    }).catch(error => console.log(error));

}


// delete comment function
function deleteComment() {
  // retrieve the id of the button clicked
  var deleteCommentId = this.id;

  //delete the comment from the api
  axios.delete(`${url}${deleteCommentId}${apiKey}`)
    //.then(response => console.log(response))
    .catch(error => console.log(error));

  // remove the comment from the page
  $(`#${deleteCommentId}`).remove();

}


// like comment function
function likeFunc() {
  // retrieve the id of the button clicked
  var likeId = this.id;

  //like the comment and send to the api
  axios.put(`${url}${likeId}/like${apiKey}`)
    .then(response => {
      var likeNum = response.data.likes
      // change like button text on page to acknowledge like
      $(`#${likeId}`).children('button.commentContent__like').text('You liked this')
      // update the likes on the button after 1.5 seconds
      setTimeout(function () { likeButtonUpdate(likeNum) }, 1500)
    })
    .catch(error => console.log(error));

  // function to update like button
  function likeButtonUpdate(likeNumber) {
    if (likeNumber === 1) {
      $(`#${likeId}`).children('button.commentContent__like').text(`${likeNumber} Like`)
    } else {
      $(`#${likeId}`).children('button.commentContent__like').text(`${likeNumber} Likes`)
    }
  }
}


// check the form to make sure all fields are filled out
function formValidation() {
  // retrive value of form
  var formName = $('#name').val()
  var formComment = $('#comment').val()
  if (formName === "" || formComment === "") {
    // if form fields are not valid, alert and do not add comment
    alert("All fields must be filled out");
    return false;
  } else if (formName.length < 2) {
    alert("Please enter a valid name")
  } else if (formComment.length < 2) {
    alert("Please enter a valid comment")
  } else {
    // if the form fields are validated, proceed to add comment to page
    addCommentEvent();
  }
}

// function to display button that goes to top of page
function toTopButtonDisplay() {
  if ($('body,html').scrollTop() > 50 || document.documentElement.scrollTop > 50) {
    $('#toTopButton').show()
  } else {
    $('#toTopButton').hide()
  }
}

// function to go to the top of the page
function scrollUp() {
  $('body,html').scrollTop(0);
  document.documentElement.scrollTop = 0;
}