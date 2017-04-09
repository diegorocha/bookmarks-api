module.exports = app => {
    const Bookmarks = app.db.models.Bookmarks;

    app.route("/bookmarks")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Bookmarks.findAll({where: { user_id: req.user.id }})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(400).json({message: error.message})
                });
        })
        .post((req, res) => {
            req.body.user_id = req.user.id;
            Bookmarks.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(400).json({message: error.message})
                });
        });

    app.route("/bookmarks/:id")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Bookmarks.findOne({where: {id: req.params.id, user_id: req.user.id}})
                .then(result => {
                    if(result){
                        res.json(result);
                    }else{
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(400).json({message: error.message})
                });
        })
        .put((req, res) => {
            Bookmarks.update(req.body, {where: {id: req.params.id, user_id: req.user.id}})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(400).json({message: error.message})
                });
        })
        .delete((req, res) => {
            Bookmarks.destroy({where: {id: req.params.id, user_id: req.user.id}})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(400).json({message: error.message})
                });
        });
};
