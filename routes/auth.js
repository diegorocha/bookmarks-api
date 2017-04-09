import jwt from "jwt-simple";

module.exports = app => {
    const cfg = app.libs.config;
    const Users = app.db.models.Users;
    app.post("/auth", (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            Users.findOne({where: {email: email}})
                .then(user => {
                    if (Users.isPasswordCorrect(user.password, password)) {
                        const payload = {id: user.id};
                        res.json({
                            token: jwt.encode(payload, cfg.jwtSecret)
                        });
                    } else {
                        res.sendStatus(400);
                    }
                })
                .catch(error => res.status(400).json({msg: error.message}));
        } else {
            res.sendStatus(400);
        }
    });
};
