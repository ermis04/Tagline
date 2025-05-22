const db = require("../../db");

class Post {
  getUserPosts() {} // Returns all the reviews by a user that are also shared as posts.
  getPostsBasedOnLocation() {}
  getPoiPosts() {} // Returns all the posts related to a POI
  getPostData() {} // Returns all the data related to a single post

  // Returns all the posts unrelated to user or location (This is for the homepage or feed)
  async getPosts() {
    // Get posts with user data
    const [posts] = await db.query(`
    SELECT p.*, 
      per.PersonID, per.username, per.first_name, per.last_name, per.src,
      u.points_collected
    FROM Post p
    JOIN Person per ON p.uploaded_by = per.PersonID
    JOIN User u ON per.PersonID = u.PersonID
    WHERE p.status = 'Approved' AND p.status_by_user = 'Active'
    ORDER BY p.uploadDate DESC
  `);

    if (posts.length === 0) {
      return [];
    }

    // Get comments for these posts
    const postIds = posts.map((p) => p.PostID);
    const [comments] = await db.query(
      `
    SELECT c.*, 
      per.PersonID, per.username, per.src
    FROM Comment c
    JOIN Person per ON c.commenter = per.PersonID
    WHERE c.post_commented IN (?)
    ORDER BY c.CommentDate
  `,
      [postIds]
    );

    return posts.map((post) => ({
      ...post,
      user_data: {
        PersonID: post.PersonID,
        username: post.username,
        first_name: post.first_name,
        last_name: post.last_name,
        avatar: post.src,
        points: post.points_collected,
      },
      comments: comments
        .filter((c) => c.post_commented === post.PostID)
        .map((c) => ({
          CommentID: c.CommentID,
          text: c.text,
          CommentDate: c.CommentDate,
          commenter: {
            PersonID: c.PersonID,
            username: c.username,
            avatar: c.src,
          },
        })),
    }));
  }

  deletePost() {} // Delete post by user
  editPost() {} // Edit post by user
}

module.exports = Post;
