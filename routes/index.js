//web framework
var express = require("express");
var router = express.Router();
//HTTP Client
var axios = require("axios");

//receive the comments most comment count
const getCommentsCount = async postId => {
  const comments = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  return comments.data.length;
};

const addCommentsToPosts = async posts => {
  const result = [];
  for (let i = 0; i < posts.length; i++) {
    const commentCount = await getCommentsCount(posts[i].id);
    result.push({ ...posts[i], commentCount });
  }
  return result;
};

/ GET home page. /
router.get("/", function(req, res, next) {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(async function(response) {
      const allPosts = await addCommentsToPosts(response.data);
      console.log("allPosts", allPosts);
      const sorted = allPosts.sort((a, b) => a.count > b.count);
      console.log("sorted", sorted);
      res.render("index", { title: "TribeHired", posts: sorted.slice(0, 5) });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
});

module.exports = router;

// im able to detect that all the comments has the same amount.
// Edit the code in line 62 and change the response.data[1-100]

/*
const getCommentsCount = async postId => {
  const comments = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  return comments.data.length;
};

/ GET home page. /
router.get("/", function(req, res, next) {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(async function(response) {
      const commentsCount = await getCommentsCount(response.data[100].id);
      console.log("commentsCount", commentsCount);
      res.render("index", { title: "TribeHired", posts: response.data });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
});

module.exports = router; 
 */