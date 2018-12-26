const express = require('express')

const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.post('/:postId', isAuth, async (req, res, next) => {
	try {
		const { postId } = req.params
		const post = await Post.findOne({ where: { id: postId } })

		const comment = await post.createComment({ text: req.body.text, userId: req.usersData.id })

		res.json(comment)
	} catch (e) {
		console.log(e.message)
	}
})

router.delete('/:commentId', isAuth, async (req, res, next) => {
	try {
		await Comment.destroy({
			where: {
				id: req.params.commentId,
				userId: req.usersData.id
			}
		})

		next()
	} catch (e) {
		console.log(e.message)
	}
})

module.exports = router
