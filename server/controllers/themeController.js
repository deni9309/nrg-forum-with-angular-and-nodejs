const { themeModel } = require('../models');
const { newPost } = require('./postController')

function getThemes(req, res, next) {
    let title = req.query.title || '';
    if (title.includes('+')) { title = title.replace(/\+/g, '\\+') }
    if (title.includes('#')) { title = title.replace(/\#/g, '\\#') }
    if (title.includes('.')) { title = title.replace(/\./g, '\\.') }

    themeModel.find({ themeName: { $regex: title, $options: 'i' } })
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .populate({
            path: 'posts',
            populate: {
                path: 'userId'
            }
        })
        .then(theme => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    const { themeName, postText } = req.body;
    const { _id: userId } = req.user;

    themeModel.create({ themeName, userId, subscribers: [userId] })
        .then(theme => {
            newPost(postText, userId, theme._id)
                .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;

    themeModel.findByIdAndUpdate(
        { _id: themeId },
        { $addToSet: { subscribers: userId } },
        { upsert: true, populate: { path: 'posts' }, new: true }
    )
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

function unsubscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;

    themeModel.findByIdAndUpdate(
        { _id: themeId },
        { $pull: { subscribers: userId } },
        { upsert: true, populate: { path: 'posts' }, new: true }
    )
        .then(updatedTheme => {
            res.status(200).json(updatedTheme);
        })
        .catch(next);
}

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
    unsubscribe,
}
