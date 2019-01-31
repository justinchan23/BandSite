// readme:
// 1. Add this function to the very bottom of your script.js file
// 2. Invoke this function in the Chrome debugger console using 'fill()'
// 3. This function is for testing purposes.
// 4. It will autofill your form and submit it.
// 5. You must change the 'nameFieldId, commentFieldId, commentButtonId to
//    reflect the ones used in your document.


const fill = () => {

  //these values must be changed to reflect those in your html
  var nameFieldId = 'name' //the ID of the 'name' field in your form
  var commentFieldId = 'comment'//the ID of the 'comment' field in your form
  var commentButtonId = 'commentContent__addButton'//the ID of the 'comment' button in your form

  // ----------
  // do not edit the code below this line
  var nameValue = 'First Lastname'
  var commentValue = 'Lorem ipsum dolor sit amet, an ridens facilis fuisset duo, eum ea harum dolore. Error graece oblique at vim. Tation timeam eleifend qui et. Ex soluta scribentur est, an viderer senserit mei, viris essent quodsi sea te. Probo tincidunt in his, tota posse duo ne.'
  document.getElementById(nameFieldId).value = nameValue
  document.getElementById(commentFieldId).value = commentValue
  var submit = document.getElementById(commentButtonId)
  submit.click();
  return 'Success!'
}