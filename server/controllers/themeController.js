const { themeModel } = require('../models');
const { newPost } = require('./postController');
const { transformToRegex } = require('../utils/transformToRegex');

function getThemes(req, res, next) {
    let title = req.query.title || '';

    const pattern = transformToRegex(title);

    themeModel.find({ themeName: { $regex: pattern, $options: 'i' } })
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

function getThemesPaginated(req, res, next) {
    let title = req.query.title || '';
    const pattern = transformToRegex(decodeURIComponent(title));

    const startIndex = Number(req.query.startIndex) || 0;
    const limit = Number(req.query.limit) || Number.MAX_SAFE_INTEGER;

    Promise.all([
        themeModel.find({ themeName: { $regex: pattern, $options: 'i' } })
            .skip(startIndex)
            .limit(limit)
            .populate('userId'),

        themeModel.find({ themeName: { $regex: pattern, $options: 'i' } })
            .countDocuments(),
    ])
        .then(([results, totalResultsCount]) => res.json({ results, totalResultsCount }))
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
    getThemesPaginated,
    createTheme,
    getTheme,
    subscribe,
    unsubscribe,
}
