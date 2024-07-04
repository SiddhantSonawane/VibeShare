import Post from "../models/Post.js"
import User from "../models/User.js"

// this controller is for the route in the index.js file 
// here we require the picture also so we have already configured multer storage there 
// export const createPost = async (req, res) => {
//     try {
//         const { userId, description, picturePath } = req.body
//         const user = await User.findById(userId)

//         const newPost = new Post({
//             userId,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             location: user.location,
//             description,
//             picturePath,
//             userPicturePath: user.picturePath,
//             likes: {},
//             comments: []
//         })

//         await newPost.save()

//         const posts = await Post.find() // retrieve all the posts including the current post in order to return all the post to the feed
//         res.status(201).json(posts)

//     } catch (err) {
//         res.status(409).json({ message: err.message})
//     }
// }

export const createPost = async (req, res) => {
    try {
      const { userId, description } = req.body;
      const user = await User.findById(userId);
      const mediaPath = req.file ? req.file.originalname : null;
      const mediaType = req.file ? req.file.mimetype.split('/')[0] : null; // image or video
  
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        mediaPath,
        mediaType,
        userPicturePath: user.picturePath,
        likes: {},
        comments: [],
      });
  
      await newPost.save();
  
      const posts = await Post.find(); // retrieve all the posts including the current post
      res.status(201).json(posts);
  
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };
  


// this are controllers for the postRoutes file in the routes folder

export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find() // retrieve all the posts to return all the post to the feed
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ message: err.message})
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params
        const posts = await Post.find({ userId })
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ message: err.message})
    }
}

// like functionality

// we are using a map for this and it works as if the userId is present in the map means the user has liked it
// remember if userId is there in the map then value is always true that means the user has liked
// and for dislike we remove the userId from the map 

// I could have used an array here but I am using a map because it is time efficient
// for an array at worst case the time would have taken is O(n) and by using map it usually happens in O(1) constant time

export const likePost = async(req, res) => {
    try {
        const { id } = req.params // this is the post id
        const { userId } = req.body // this will be user Id

        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if(isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { likes: post.likes},
            { new: true }
        )

        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(404).json({ message: err.message})   
    }
}

// Add a comment to a post
export const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, comment, fullName } = req.body;

        var date = new Date()
        const commentTime = date.toDateString() + " " + date.toLocaleTimeString()

        const post = await Post.findById(postId);
        post.comments.push({ userId, fullName, comment, commentTime });
        await post.save();

        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const {postId} = req.params

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully", deletedPost });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}