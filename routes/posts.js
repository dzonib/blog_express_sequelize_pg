const express = require('express')

const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

// get all posts (public)
router.get('/', async (req, res, next) => {
	try {
		const posts = await Post.findAll({
			include: [ User, Comment ]
		})

		res.json(posts)
	} catch (e) {
		console.log(e.message)
	}
})

// add post (private)
router.post('/add', isAuth, async (req, res, next) => {
	try {
		const { title, body } = req.body

		const post = await Post.create({
			title,
			body,
			userId: req.usersData.id
		})

		res.json(post)
	} catch (e) {
		console.log(e.message)
	}
})

// edit post (private)
router.put('/:id', isAuth, async (req, res, next) => {
	const { title, body } = req.body
	try {
		const post = await Post.update(
			{
				title,
				body
			},
			{
				returning: true,
				where: {
					id: req.params.id,
					userId: req.usersData.id
				}
			}
		)
		res.json(post)
	} catch (e) {
		console.log(e.message)
	}
})

// delete post
router.delete('/:id', isAuth, async (req, res, next) => {
	try {
		await Post.destroy({ where: { id: req.params.id, userId: req.usersData.id } })
		res.status(200)
	} catch (e) {
		console.log(e.message)
	}
})

module.exports = router
