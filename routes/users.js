const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Post = require('../models/post')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.post('/register', async (req, res) => {
	try {
		const checkIfRegistered = await User.findAll({ where: { email: req.body.email } })
		if (checkIfRegistered.length > 0) {
			res.status(400).json('Email already used')
		}

		const user = {
			name: req.body.name,
			email: req.body.email,
		}

		user.password = await bcrypt.hash(req.body.password, 10)

		await User.create(user)

		res.json(user)
	} catch (e) {
		console.log(e.message)
		res.status(400)
	}
})

router.post('/login', async (req, res, next) => {
	try {
		const [ user ] = await User.findAll({ where: { email: req.body.email } })

		if (!user) {
			res.status(404).json('User not registered')
		}

		const passwordCheck = await bcrypt.compare(req.body.password, user.password)

		if (!passwordCheck) {
			res.status(500).json('Wrong password')
		}

		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
				id: user.id
			},
			'spacemarmun',
			{ expiresIn: '100h' }
		)

		res.json('Bearer ' + token)
	} catch (e) {
		console.log(e.message)
		res.status(501)
	}
})

// get user by id
router.get('/:id', async (req, res, next) => {
	
	try {
		const user = await User.findOne({ where: { id: req.params.id }, include: [Post] })
		res.json(user)
	} catch (e) {
		console.log(e.message)
	}
})

// get my profile and posts
router.get('/', isAuth, async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.usersData.id }, include: [Post] })
		res.json(user)
	} catch (e) {
		console.log(e.message)
	}
})

module.exports = router
