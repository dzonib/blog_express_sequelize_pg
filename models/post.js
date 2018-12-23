const Sequelize = require('sequelize')

const sequelize = require('../database/database')

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey:true
    },
    title: Sequelize.STRING,
    body: Sequelize.STRING,
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

module.exports = Post