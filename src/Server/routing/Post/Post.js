const db = require("../../db");

/*
Paraggelia pizza shmeioseis
  1 ellhniki
  1 classic special no mushrooms
  1 chicken bbq
  1 classic special
*/

class Post {
  // Returns all the reviews by a user that are also shared as posts.
  async getUserPosts(userID) {
    try {
      // 1. Get posts uploaded by the given user
      const [posts] = await db.query(
        `
      SELECT 
        p.PostID, p.caption, p.src AS postSrc, p.uploadDate, p.like_count,
        per.PersonID, per.username, per.first_name, per.last_name, per.src AS userSrc,
        u.points_collected
      FROM Post p
      JOIN User u ON p.uploaded_by = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      WHERE u.UserID = ? AND p.status = 'Approved' AND p.status_by_user = 'Active'
      ORDER BY p.uploadDate DESC
    `,
        [userID]
      );

      if (!posts.length) return [];

      // 2. Get comments for these posts
      const postIds = posts.map((p) => p.PostID);
      const [comments] = await db.query(
        `
      SELECT 
        c.CommentID, c.text, c.CommentDate, c.post_commented,
        per.PersonID, per.username, per.src AS commenterSrc
      FROM Comment c
      JOIN User u ON c.commenter = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      WHERE c.post_commented IN (?)
      ORDER BY c.CommentDate ASC
    `,
        [postIds]
      );

      // 3. Group comments by post
      const commentsByPost = {};
      for (const c of comments) {
        if (!commentsByPost[c.post_commented]) {
          commentsByPost[c.post_commented] = [];
        }
        commentsByPost[c.post_commented].push({
          CommentID: c.CommentID,
          text: c.text,
          CommentDate: c.CommentDate,
          commenter: {
            PersonID: c.PersonID,
            username: c.username,
            src: c.commenterSrc,
          },
        });
      }

      // 4. Attach comments to their corresponding posts
      return posts.map((post) => ({
        ...post,
        comments: commentsByPost[post.PostID] || [],
      }));
    } catch (error) {
      console.error("Error in getUserPosts:", error);
      throw error;
    }
  }

  async getPostsBasedOnLocation(location_id) {
    try {
      // 1. Get all posts related to POIs in the specified location
      const [posts] = await db.query(
        `
      SELECT 
        p.PostID, p.caption, p.src AS postSrc, p.uploadDate, 
        per.PersonID, per.username, per.first_name, per.last_name, per.src AS userSrc,
        u.points_collected
      FROM Post p
      JOIN POI poi ON p.PoiID = poi.POIID
      JOIN Location loc ON poi.location_id = loc.location_id
      JOIN User u ON p.uploaded_by = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      WHERE loc.location_id = ? AND p.status = 'Approved' AND p.status_by_user = 'Active'
      ORDER BY p.uploadDate DESC
    `,
        [location_id]
      );

      if (!posts.length) return [];

      // 2. Get comments for the found posts
      const postIds = posts.map((p) => p.PostID);
      const [comments] = await db.query(
        `
      SELECT 
        c.CommentID, c.text, c.CommentDate, c.post_commented,
        per.PersonID, per.username, per.src AS commenterSrc
      FROM Comment c
      JOIN User u ON c.commenter = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      WHERE c.post_commented IN (?)
      ORDER BY c.CommentDate ASC
    `,
        [postIds]
      );

      // 3. Group comments by post ID
      const commentsByPost = {};
      for (const c of comments) {
        if (!commentsByPost[c.post_commented]) {
          commentsByPost[c.post_commented] = [];
        }
        commentsByPost[c.post_commented].push({
          CommentID: c.CommentID,
          text: c.text,
          CommentDate: c.CommentDate,
          commenter: {
            PersonID: c.PersonID,
            username: c.username,
            src: c.commenterSrc,
          },
        });
      }

      // 4. Attach comments to their respective posts
      return posts.map((post) => ({
        ...post,
        comments: commentsByPost[post.PostID] || [],
      }));
    } catch (error) {
      console.error("Error in getPostsBasedOnLocation:", error);
      throw error;
    }
  }

  // Returns all the posts related to a POI
  async getPoiPosts(poi_id) {
    try {
      // 1. Get all posts for the given POI with user data
      const [posts] = await db.query(
        `
      SELECT 
        p.PostID, p.caption, p.src AS postSrc, p.uploadDate, p.POIID,
        per.PersonID, per.username, per.first_name, per.last_name, per.src AS userSrc,
        u.points_collected
      FROM Post p
      JOIN User u ON p.uploaded_by = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      WHERE p.PoiID = ? AND p.status = 'Approved' AND p.status_by_user = 'Active'
      ORDER BY p.uploadDate DESC
    `,
        [poi_id]
      );

      if (!posts.length) return [];

      // 2. Get comments for these posts
      const postIds = posts.map((p) => p.PostID);
      const [comments] = await db.query(
        `
      SELECT 
        c.CommentID, c.text, c.CommentDate, c.post_commented,
        per.PersonID, per.username, per.src AS commenterSrc
      FROM Comment c
      JOIN User u ON c.commenter = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      WHERE c.post_commented IN (?)
      ORDER BY c.CommentDate ASC
    `,
        [postIds]
      );

      // 3. Group comments by post
      const commentsByPost = {};
      for (const c of comments) {
        if (!commentsByPost[c.post_commented]) {
          commentsByPost[c.post_commented] = [];
        }
        commentsByPost[c.post_commented].push({
          CommentID: c.CommentID,
          text: c.text,
          CommentDate: c.CommentDate,
          commenter: {
            PersonID: c.PersonID,
            username: c.username,
            src: c.commenterSrc,
          },
        });
      }

      // 4. Attach comments to each post
      return posts.map((post) => ({
        ...post,
        comments: commentsByPost[post.PostID] || [],
      }));
    } catch (error) {
      console.error("Error in getPoiPosts:", error);
      throw error;
    }
  }

  // Returns all the data related to a single post
  async getPostData(post_id) {
    try {
      // 1. Get the post and uploader's user data
      const [posts] = await db.query(
        `
      SELECT 
        p.PostID, p.caption, p.src AS postSrc, p.uploadDate, 
        per.PersonID, per.username, per.first_name, per.last_name, per.src AS userSrc,
        u.points_collected
      FROM Post p
      JOIN User u ON p.uploaded_by = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      WHERE p.PostID = ? AND p.status = 'Approved' AND p.status_by_user = 'Active'
      LIMIT 1
    `,
        [post_id]
      );

      if (!posts.length) return null;
      const post = posts[0];

      // 2. Get comments for this post
      const [comments] = await db.query(
        `
      SELECT 
        c.CommentID, c.text, c.CommentDate, c.post_commented,
        per.PersonID, per.username, per.src AS commenterSrc
      FROM Comment c
      JOIN User u ON c.commenter = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      WHERE c.post_commented = ?
      ORDER BY c.CommentDate ASC
    `,
        [post_id]
      );

      // 3. Format comments
      const formattedComments = comments.map((c) => ({
        CommentID: c.CommentID,
        text: c.text,
        CommentDate: c.CommentDate,
        commenter: {
          PersonID: c.PersonID,
          username: c.username,
          src: c.commenterSrc,
        },
      }));

      // 4. Return full post object
      return {
        ...post,
        comments: formattedComments,
      };
    } catch (error) {
      console.error("Error in getPostData:", error);
      throw error;
    }
  }

  async getPosts() {
    try {
      // 1. Get all posts with user data
      const [posts] = await db.query(`
      SELECT 
        p.PostID, p.caption, p.src AS postSrc, p.uploadDate, p.like_count,
        per.PersonID, per.username, per.first_name, per.last_name, per.src AS userSrc,
        u.points_collected
      FROM Post p
      JOIN User u ON p.uploaded_by = u.UserID
      JOIN Person per ON u.PersonID = per.PersonID
      WHERE p.status = 'Approved' AND p.status_by_user = 'Active'
      ORDER BY p.uploadDate DESC
    `);

      if (!posts.length) return [];

      // 2. Inline comment batching
      const postIds = posts.map((p) => p.PostID);
      const batchSize = 50;
      let allComments = [];

      for (let i = 0; i < postIds.length; i += batchSize) {
        const batch = postIds.slice(i, i + batchSize);
        const [batchComments] = await db.query(
          `
        SELECT 
          c.CommentID, c.text, c.CommentDate, c.post_commented,
          per.PersonID, per.username, per.src AS commenterSrc
        FROM Comment c
        JOIN User u ON c.commenter = u.UserID
        JOIN Person per ON u.PersonID = per.PersonID
        WHERE c.post_commented IN (?)
        ORDER BY c.CommentDate ASC
      `,
          [batch]
        );

        allComments.push(...batchComments);
      }

      // 3. Inline grouping of comments
      const commentsByPost = {};
      for (const c of allComments) {
        if (!commentsByPost[c.post_commented]) {
          commentsByPost[c.post_commented] = [];
        }
        commentsByPost[c.post_commented].push({
          CommentID: c.CommentID,
          text: c.text,
          CommentDate: c.CommentDate,
          commenter: {
            PersonID: c.PersonID,
            username: c.username,
            src: c.commenterSrc,
          },
        });
      }

      // 4. Combine comments with posts
      return posts.map((post) => ({
        ...post,
        comments: commentsByPost[post.PostID] || [],
      }));
    } catch (error) {
      console.error("Error in getPosts:", error);
      throw error;
    }
  }

  // to delete the post by the user.
  async deletePost(postID, userID) {
    try {
      const [result] = await db.query(
        `
      UPDATE Post
      SET status_by_user = 'DeletedByUser'
      WHERE PostID = ? AND uploaded_by = ?
    `,
        [postID, userID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Post not found or user is not the owner.");
      }

      return { success: true, message: "Post deleted successfully." };
    } catch (error) {
      console.error("Error in deletePost:", error);
      throw error;
    }
  }

  async editPost(postID, userID, newCaption) {
    try {
      const [result] = await db.query(
        `
      UPDATE Post
      SET caption = ?, status_by_user = 'Edited'
      WHERE PostID = ? AND uploaded_by = ?
    `,
        [newCaption, postID, userID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Post not found or user is not the owner.");
      }

      return { success: true, message: "Post updated successfully." };
    } catch (error) {
      console.error("Error in editPost:", error);
      throw error;
    }
  }

  async likePost(postID) {
    try {
      const [result] = await db.query(
        `
      UPDATE Post
      SET like_count = like_count + 1
      WHERE PostID = ?
    `,
        [postID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Post not found.");
      }

      return { success: true, message: "Post liked successfully." };
    } catch (error) {
      console.error("Error in likePost:", error);
      throw error;
    }
  }

  async commentOnPost(postID, userID, comment) {
    try {
      const [result] = await db.query(
        `
      INSERT INTO Comment (commenter, post_commented, text)
      VALUES (?, ?, ?)
    `,
        [userID, postID, comment]
      );

      return {
        success: true,
        message: "Comment added successfully.",
        commentId: result.insertId,
      };
    } catch (error) {
      console.error("Error in commentOnPost:", error);
      throw error;
    }
  }

  async deleteComment(commentID, userID) {
    try {
      console.log("Deleting comment with ID:", commentID, "by user:", userID);
      const [result] = await db.query(
        `
      DELETE FROM Comment
      WHERE CommentID = ? AND commenter = ?
    `,
        [commentID, userID]
      );
      return { success: true, message: "Comment deleted successfully." };
    } catch (error) {
      console.error("Error in deleteComment:", error);
      throw error;
    }
  }

  async editComment(commentID, userID, newComment) {
    try {
      const [result] = await db.query(
        `
      UPDATE Comment
      SET text = ?
      WHERE CommentID = ? AND commenter = ?
    `,
        [newComment, commentID, userID]
      );

      if (result.affectedRows === 0) {
        throw new Error("Comment not found or user is not the owner.");
      }

      return { success: true, message: "Comment updated successfully." };
    } catch (error) {
      console.error("Error in editComment:", error);
      throw error;
    }
  }
}

module.exports = Post;
