import jwt from "jwt-simple";

describe("Routes: Users", () => {
    const Users = app.db.models.Users;
    const jwtSecret = app.libs.config.jwtSecret;
    let token;
    let adminToken;
    beforeEach(done => {
        Users
            .destroy({where: {}})
            .then(() => Users.create({
                name: "Beltrano",
                email: "beltrano@foo.com",
                password: "12345"
            }))
            .then(user => {
                token = jwt.encode({id: user.id}, jwtSecret);
            })
            .then(() => Users.create({
                name: "Admin User",
                email: "admin@foo.com",
                isAdmin: true,
                password: "4dm1n"
            }))
            .then(user => {
                adminToken = jwt.encode({id: user.id}, jwtSecret);
                done();
            });
    });
    describe("GET /user", () => {
        describe("status 200", () => {
            it("returns an authenticated user", done => {
                request.get("/user")
                    .set("Authorization", `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql("Beltrano");
                        expect(res.body.email).to.eql("beltrano@foo.com");
                        done(err);
                    });
            });
        });
    });
    describe("PUT /user", () => {
        describe("status 204", () => {
            it("updates an authenticated user", done => {
                request.put("/user")
                    .set("Authorization", `JWT ${token}`)
                    .send({name: "New Name"})
                    .expect(204)
                    .end((err, res) => done(err));
            });
        });
    });
    describe("DELETE /user", () => {
        describe("status 204", () => {
            it("deletes an authenticated user", done => {
                request.delete("/user")
                    .set("Authorization", `JWT ${token}`)
                    .expect(204)
                    .end((err, res) => done(err));
            });
        });
    });
    describe("POST /users", () => {
        describe("status 200", () => {
            it("creates a new user", done => {
                request.post("/users")
                    .send({
                        name: "Mary",
                        email: "mary@mail.net",
                        password: "asdfg"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql("Mary");
                        expect(res.body.email).to.eql("mary@mail.net");
                        done(err);
                    });
            });
        });
    });
    describe("GET /users/all", () => {
        describe("status 200", () => {
            it("admin get list of all users", done => {
                request.get("/users/all")
                    .set("Authorization", `JWT ${adminToken}`)
                    .expect(200)
                    .end((err, res) => done(err));
            });
        });
        describe("status 400", () => {
            it("not an admin get error", done => {
                request.get("/users/all")
                    .set("Authorization", `JWT ${token}`)
                    .expect(400)
                    .end((err, res) => done(err));
            });
            it("not authenticated get error", done => {
                request.get("/users/all")
                    .expect(401)
                    .end((err, res) => done(err));
            });
        });
    });
});
