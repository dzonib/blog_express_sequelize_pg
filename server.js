const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sequelize = require('./database/database')
const User = require('./models/user')
const Post = require('./models/post')
const Comment = require('./models/comment')

const app = express()
app.use(cors())
app.use(bodyParser.json())

User.hasMany(Post)
User.hasMany(Comment)
Post.belongsTo(User)
Post.hasMany(Comment)
Comment.belongsTo(Post, { onDelete: 'SET NULL' })
Comment.belongsTo(User, { onDelete: 'SET NULL' })

const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')
const commentsRoute = require('./routes/comments')

app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/api/comments', commentsRoute)

sequelize
	.sync()
	.then(() => {
		app.listen(5000, () => console.log('App running on http://localhost:3000'))
	})
	.catch((e) => console.log(e))
