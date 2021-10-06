const router = require('express').Router();
const User = require('../models/user');
const Post = require('../models/post')
const bcrypt = require('bcrypt');

//update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            console.log(req.body)
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {
                new: true
            });
            const {password,...others}=updatedUser._doc
            res.status(200).json(others);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(401).json("you can only update your account");
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = User.findById(req.params.id)

        try {
            await Post.deleteMany({
                username:user.username, 
            });
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user  has been deleted")

        } catch (error) {
            res.status(500).json(error);
        }
    } catch {
        res.status(404).json("user not found");
    }
})
//get one user
router.get('/:id',async (req,res)=>{
try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json("user not found");
    
    const {password,...others}= user._doc
    res.status(200).json(others)

} catch (error) {
res.status(500).json(error)    
}
})
module.exports = router;