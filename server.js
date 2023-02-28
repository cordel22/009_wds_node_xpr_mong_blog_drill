const express = require('express')
//	const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()

//	mongoose.connect('mongodb://localhost/blog'/* , { useNewUrlParser: true, useUnifiedTopology: true } */)

const  mongoose = require('mongoose');
//	this is the database not populated automatically yet for mdn node expresss tutoril not used b4
//	const  mongoDB = 'mongodb+srv://cordel22:dopici123@cluster0.ioypxqt.mongodb.net/?retryWrites=true&w=majority';
const  mongoDB = 'mongodb+srv://cordelfenevall:dopici123@cluster0.jxjw1ew.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
//	app.use('/articles', articleRouter)
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
	//	res.send('Hello Ma Niggaz')
	/*
	const articles = [{
		title: 'more Testes Articles',
		//	createdAt: Date.now(),
		createdAt: new Date(),
		description: 'Test description'
	},
	{
		title: 'Testes Articles',
		createdAt: new Date(),
		description: 'Test description'
	}]
	*/
	const articles = await Article.find().sort({ createdAt: 'desc' })
	res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)



