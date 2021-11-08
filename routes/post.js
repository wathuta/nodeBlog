const router = require('express').Router();
const Post = require('../models/post')

router.post('/', async (req, res) => {
    const newpost = new Post(req.body)
    try {
        const savedPost = await newpost.save();
        res.status(200).json(savedPost)

    } catch (error) {
        res.status(500).json(error)
    }
});
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        console.log(post);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(post.id, {
                    $set: req.body
                }, {
                    new: true
                })
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("you can only update your post");
        }
    } catch (error) {
        res.status(500).json(error)
    }
});
//to fix
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        console.log(post._doc);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("post has been deleted")
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("you can only delete your posts")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let postsRes;
        if (username) {
            postsRes = await Post.find({
                username
            });
        } else if (catName) {
        console.log(catName);
            postsRes = await Post.find({category:{$all:[catName]}});
            console.log(postsRes)
        } else {
            postsRes = await Post.find();
        }
        res.status(200).json(postsRes);
    } catch (error) {
        res.status(500).json(error);
    }
})
router.get('/:id', async (req, res) => {
    try {
        const post =await Post.findById(req.params.id)

        if (!post) {
            res.status(404).json("post not found")
        } else {
            res.status(200).json(post)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router