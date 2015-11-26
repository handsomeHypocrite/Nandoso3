
//trigger on page load
document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
    sendFeedback();
});


//------------------------------------------------------------------------------||
//                                                                              ||
//  GET FEEDBACKS AND REPLIES, ONCE RETURNED, CONSTRUCT BOXES TO DISPLAY THEM   ||
//                                                                              ||    
//                                                                              ||    
//------------------------------------------------------------------------------||
function loadPosts() {
    var posts = (function () {
        return {
            getPosts: function (callback) {
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "https://mindfind.azurewebsites.net/api/posts",
                    success: function (data) {
                        console.log(data);
                        callback(data);
                    },
                    error: function (data, textStatus, jqXHR) {
                        console.log(jqXHR.status);
                    }
                });
            }
        };
    }());

    var comments = (function () {
        return {
            getComments: function (callback) {
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "https://mindfind.azurewebsites.net/api/comments",
                    success: function (data) {
                        console.log(data);
                        callback(data);
                    },
                    error: function (data, textStatus, jqXHR) {
                        console.log(jqXHR.status);
                    }
                });
            }
        };
    }());

    posts.getPosts(function (postsList) {
        setupPostsTable(postsList);
        comments.getComments(function (commentsList) {
            setupCommentsTable(commentsList);
            setUpReply();
            setUpDeleteEntry();
        });
    });

    //------------------------------------------------------------------------------||
    //                                                                              ||
    //       SET UP BOXES OF FEEDBACKS UTLIZING ELEMENT ID's                        ||
    //                                                                              ||    
    //                                                                              ||    
    //------------------------------------------------------------------------------||
    //main container
    var feedbackContainer = document.getElementById("feedbackContainer");

    function setupPostsTable(postsList) {
        //display most recent ones at the top
        for (i = postsList.length - 1 ; i >= 0; i--) {

            //create boxes
            var div1 = document.createElement("div");
            div1.setAttribute("class", "row");
            var div2 = document.createElement("div");
            div2.setAttribute("class", "box");
            div2.setAttribute("id", postsList[i].PostID);
            var div3 = document.createElement("div");
            div3.setAttribute("class", "col-lg-10");
            var p = document.createElement("p");
            p.innerHTML = postsList[i].Content;
            var small = document.createElement("small");
            small.setAttribute("class", "description");
            small.innerHTML = postsList[i].Author;

            //make delete button
            var divDelete = document.createElement("div");
            divDelete.setAttribute("class", "col-lg-1");
            var deletebtn = document.createElement("button");
            deletebtn.setAttribute("class", "btn btn-default delete-post");
            deletebtn.setAttribute("id", "dp" + postsList[i].PostID);
            deletebtn.innerHTML = "Delete";

            //make Reply button
            var divReply = document.createElement("div");
            divReply.setAttribute("class", "col-lg-1");
            var replybtn = document.createElement("button");
            replybtn.setAttribute("class", "btn btn-default reply");
            replybtn.setAttribute("id", "r" + postsList[i].PostID);
            replybtn.innerHTML = "Reply";

            //initially hidden reply textarea
            var divReplyBox = document.createElement("div");
            divReplyBox.setAttribute("class", "form-group col-lg-10");
            var textArea = document.createElement("textarea");
            textArea.setAttribute("class", "form-control");
            textArea.setAttribute("rows", "2");
            textArea.setAttribute("id", "rt" + postsList[i].PostID);
            textArea.setAttribute("style", "visibility: hidden;");
            divReplyBox.appendChild(textArea);

            //button for submitting reply
            var divReplyBtn = document.createElement("div");
            divReplyBtn.setAttribute("class", "col-lg-2");
            var submitReplyBtn = document.createElement("button");
            submitReplyBtn.setAttribute("class", "btn btn-default submit-reply");
            submitReplyBtn.setAttribute("id", "sr" + postsList[i].PostID);
            submitReplyBtn.setAttribute("style", "visibility: hidden;");
            submitReplyBtn.innerHTML = "Submit Reply";
            divReplyBtn.appendChild(submitReplyBtn);



            div3.appendChild(small);
            div3.appendChild(p);

            divDelete.appendChild(deletebtn);
            divReply.appendChild(replybtn);

            div2.appendChild(div3);
            div2.appendChild(divReply);
            div2.appendChild(divDelete);
            div2.appendChild(divReplyBox);
            div2.appendChild(divReplyBtn);
            div1.appendChild(div2);

            feedbackContainer.appendChild(div1);
        }
    }


    //------------------------------------------------------------------------------||
    //                                                                              ||
    //       SET UP BOXES OF REPLIES NESTED ON FEEDBACKS UTLIZING ELEMENT ID's      ||
    //                                                                              ||    
    //                                                                              ||    
    //------------------------------------------------------------------------------||
    function setupCommentsTable(commentsList) {
        for (i = commentsList.length - 1; i >= 0; i--) {
            var currDiv = document.getElementById(commentsList[i].PostID.toString());


            var div2 = document.createElement("div");
            div2.setAttribute("class", "col-lg-10");
            div2.setAttribute("style", "font-style: italic; background: rgba(0,0,0,1);");
            var p = document.createElement("p");
            p.setAttribute("style", "color: white");
            p.innerHTML = commentsList[i].Content;

            //make delete button
            var divDelete = document.createElement("div");
            divDelete.setAttribute("class", "col-lg-2");
            var deletebtn = document.createElement("button");
            deletebtn.setAttribute("class", "btn btn-default delete-comment");
            deletebtn.setAttribute("id", "dc" + commentsList[i].CommentID);
            deletebtn.innerHTML = "Delete Reply";

            div2.appendChild(p);
            divDelete.appendChild(deletebtn);
            currDiv.appendChild(div2);
            currDiv.appendChild(divDelete);
        }

    }
}


//------------------------------------------------------------------------------||
//                                                                              ||
//     POST FEEDBACK BUTTON                                                     ||
//                                                                              ||    
//                                                                              ||    
//------------------------------------------------------------------------------||
function sendFeedback() {
    document.getElementById("postbtn").addEventListener("click", function (e) {
        e.preventDefault();
        var newPost = {
            Author: $("#name").val(),
            Content: $("#feedback").val()
        }

        var posts = (function () {
            return {
                addPosts: function (newPost, callback) {
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "https://mindfind.azurewebsites.net/api/posts/",
                        data: newPost,
                        success: function (data, textStatus, jqXHR) {
                            console.log("success");
                            callback();
                        },
                        error: function (data, textStatus, jqXHR) {
                            console.log("error " + jqXHR.status);
                        }
                    });
                }
            };
        }());

        posts.addPosts(newPost, function () {
            feedbackSent();
        });
    });
}


//------------------------------------------------------------------------------||
//                                                                              ||
//       POST REPLY BUTTON, ASKING FOR STAFF PASSWORD                           ||
//                                                                              ||    
//                                                                              ||    
//------------------------------------------------------------------------------||
function setUpReply() {
    $('button').click(function () {
        if ($(this).hasClass("reply")) {
            //open prompt to ask for password to open reply box
            staffReply($(this));
        } else if ($(this).hasClass("submit-reply")) {
            var postIdString = $(this).attr("id");
            var postId = parseInt(postIdString.substring(2), 10);

            //get data from text area and post as a comment/reply
            var newReply = {
                Content: $("#rt" + postId).val(),
                PostID: postId
            }
            var comments = (function () {
                return {
                    addComment: function (newReply, callback) {
                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "https://mindfind.azurewebsites.net/api/comments/",
                            data: newReply,
                            success: function (data, textStatus, jqXHR) {
                                console.log("success");
                                callback();
                            },
                            error: function (data, textStatus, jqXHR) {
                                console.log("error " + jqXHR.status);
                            }
                        });
                    }
                };
            }());

            comments.addComment(newReply, function () {
                replySent();
            });
        }
    });
}

function openReply(element) {
    var postIdString = element.attr("id");
    var postId = parseInt(postIdString.substring(1), 10);

    //make reply textarea and button appear
    document.getElementById("rt" + postId).setAttribute("style", "visibility: visible;");
    document.getElementById("sr" + postId).setAttribute("style", "visibility: visible;")
}

//------------------------------------------------------------------------------||
//                                                                              ||
//     DELETING A FEEDBACK OR A REPLY                                           ||
//                   (ASKS FOR STAFF PASSWORD IF REPLY)                         ||    
//                                                                              ||    
//------------------------------------------------------------------------------||
function setUpDeleteEntry() {
    //if a button has been clicked
    $('button').click(function () {
        //distinguish from comment delete buttons
        if ($(this).hasClass("delete-post")) {
            confirmDelete($(this));
        } else if ($(this).hasClass("delete-comment")) {
            staffDelete($(this));
        }
    });
}


//triggers when sweet alert warning is confirmed
function deleteFeedback(element) {
    //id is dp + an integer, process id to get id of post to be deleted
    var postIdString = element.attr("id");
    var postId = parseInt(postIdString.substring(2), 10);

    var posts = (function () {
        return {
            deletePost: function (postId, callback) {
                $.ajax({
                    type: "DELETE",
                    dataType: "json",
                    url: "https://mindfind.azurewebsites.net/api/posts/" + postId,
                    success: function (data) {
                        callback();
                    }
                });
            }
        };
    }());
    posts.deletePost(postId, function () {
        location.reload();
    });
}

function deleteReply(element) {
    //id of comment is dc + an integer, process id to get id of comment to be deleted
    var commentIdString = element.attr("id");
    var commentId = parseInt(commentIdString.substring(2), 10);
    var comments = (function () {
        return {
            deleteComment: function (commentId, callback) {
                $.ajax({
                    type: "DELETE",
                    dataType: "json",
                    url: "https://mindfind.azurewebsites.net/api/comments/" + commentId,
                    success: function (data) {
                        callback();
                    }
                });
            }
        };
    }());

    comments.deleteComment(commentId, function () {
        location.reload();
    });
}


//------------------------------------------------------------------------------||
//                                                                              ||
//       SWEETALERT TRIGGERS                                                    ||
//                                                                              ||    
//                                                                              ||    
//------------------------------------------------------------------------------||
function feedbackSent() {
    swal({
        title: "Sweet",
        text: "Your feedback has been posted!",
        type: "success"
    },
  function () {
      location.reload();
  });
}
function replySent() {
    swal({
        title: "Sweet",
        text: "Your reply has been posted!",
        type: "success"
    },
  function () {
      location.reload();
  });
}

//element is element to be deleted
function confirmDelete(element) {
    swal({
        title: "Confirm Deletion",
        text: "Are you sure you want to delete this entry?",
        type: "warning",
        animation: "slide-from-top",
        showCancelButton: true,
        confirmButtonColor: "#5c2d91",
        confirmButtonText: "Yes",
        closeOnConfirm: false
    },
		function () {
		    deleteFeedback(element);
		});
}

//reply deletion by staff
function staffDelete(element) {
    swal({
        title: "Please enter staff password",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Password"
    }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("No password entered!");
            return false
        }
        if (inputValue == "letmein000") {
            deleteReply(element);
        } else {
            swal({
                title: "Whoops",
                text: "Wrong password",
                type: "error"
            })
        }
    });
}

//password to show reply bar
function staffReply(element) {
    swal({
        title: "Please enter staff password",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Password"
    }, function (inputValue) {
        if (inputValue === false) {
            return false;
        }
        if (inputValue === "") {
            swal.showInputError("No password entered!");
            return false;
        }
        if (inputValue == "letmein000") {
            openReply(element);
            swal.close();
            return false;
        } else {
            staffReply(element);
            return false;
        }
    });
}






