module.exports = app => {
    const Users = app.db.models.Users;
    app.route("/user")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Users.findById(req.user.id, {
                attributes: ["id", "name", "email"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(400).json({msg: error.message});
            });
        })
        .put((req, res) => {
            Users.update(req.body, {where: {id: req.user.id} })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(400).json({msg: error.message});
            });
        })
        .delete((req, res) => {
            Users.destroy({where: {id: req.user.id} })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(400).json({msg: error.message});
            });
        });
    app.route("/users")
        .post((req, res) => {
            Users.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(400).json({msg: error.message});
            });
        });
    app.route("/users/all")
        .all(app.auth.authenticate())
        .get((req, res) => {
            Users.findById(req.user.id)
            .then(user => {
                if(user.isAdmin){
                    Users.findAll({
                        attributes: ["id", "name", "email", "isAdmin"]
                    })
                    .then(result => res.json(result));
                }else{
                    res.sendStatus(400);
                }
            })
            .catch(error => {
                res.status(400).json({msg: error.message});
            });
        });
};
