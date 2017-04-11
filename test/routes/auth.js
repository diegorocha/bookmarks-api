describe("Routes: Token", () => {
    const Users = app.db.models.Users;
    describe("POST /auth", () => {
        beforeEach(done => {
            Users.destroy({where: {}})
                .then(() => Users.create({
                        name: "Fulano de Tal",
                        email: "fulano.tal@mail.net",
                        password: "123456"
                }))
                .then(done());
        });
        describe("status 200", () => {
            /*
            Por algum motivo que eu ainda não entendi ao certo esse test está rodando antes do beforeEach acabar.
            Esse timeout atrasa a execução do test.
            */
            Users.findAll({});
            it("returns authenticated user token", done => {
                request.post("/auth")
                    .send({
                        email: "fulano.tal@mail.net",
                        password: "123456"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token");
                        done(err);
                    });
            });
        });
        describe("status 400", () => {
            it("throws error when password is incorrect", done => {
                request.post("/auth")
                    .send({
                        email: "fulano.tal@mail.net",
                        password: "asdfg"
                    })
                    .expect(400)
                    .end((err, res) => {
                        done(err);
                    });
            });
            it("throws error when email not exist", done => {
                request.post("/auth")
                    .send({
                        email: "ciclano@mail.net",
                        password: "123456"
                    })
                    .expect(400)
                    .end((err, res) => {
                        done(err);
                    });
            });
            it("throws error when email and password are blank", done => {
                request.post("/auth")
                    .expect(400)
                    .end((err, res) => {
                        done(err);
                    });
            });
        });
    });
});
