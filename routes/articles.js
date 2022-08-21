const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
/* 
router.get('/', (req, res) => {
	res.send('In articles')
})
 */
 
 
router.get('/new', (req, res) => {
	res.render('articles/new', { article: new Article() })
})
 
router.get('/edit/:id', async (req, res) => {
	const article = await Article.findById(req.params.id)
	res.render('articles/edit', { article: article })
})


router.get('/:slug', async (req, res) => {
	const article = await Article.findOne({ slug: req.params.slug })
	if (article == null) res.redirect('/')
	res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
	/*
	let article = new Article({
		title: req.body.title,
		description: req.body.description,
		markdown: req.body.markdown
	})
	try {
		article = await article.save()
		res.redirect(`/articles/${article.slug}`)
	} catch (e) {
		console.log(e)
		res.render('articles/new', { article: article })
	}	*/
	req.article = new Article()
	next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
	req.article = await Article.findById(req.params.id)
	next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
	await Article.findByIdAndDelete(req.params.id)
	res.redirect('/')
})

function saveArticleAndRedirect(path) {
	return async (req, res) => {
		let article = req.article
			/* let article = new Article({ */
		article.title = req.body.title,
		article.description = req.body.description,
		article.markdown = req.body.markdown
	
	try {
		article = await article.save()
		res.redirect(`/articles/${article.slug}`)
	} catch (e) {
		
		res.render(`articles/${path}`, { article: article })
	}
	}
}


module.exports = router

