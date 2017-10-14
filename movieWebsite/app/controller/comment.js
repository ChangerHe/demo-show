
/**
 * 电影评论逻辑
 */

const commentModel = require('../model/mongoose/model/commentModel');

exports.comment_save = function(req, res) {
    let post_comment = req.body.comment;
    let movie_id = post_comment.movie;

    let commentEntity = new commentModel(post_comment);

    commentEntity.save(function(err, comment) {
        if (err) {
            console.log(err);
        }

        // 重定向
        res.redirect('/detail/' + movie_id);
    });
};
