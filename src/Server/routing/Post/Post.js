const db = require("../../db");

class Post {
  getUserPosts() {} // Returns all the reviews by a user that are also shared as posts.
  getPostsBasedOnLocation() {}
  getPoiPosts() {} // Returns all the posts related to a POI
  getPostData() {} // Returns all the data related to a single post
  async getPosts() {
    const res = await db.query("select * from post");
    return res[0];
  } // Returns all the posts unrelated to user or location (This is for the homepage or feed)
  deletePost() {} // Delete post by user
  editPost() {} // Edit post by user
}

module.exports = Post;
