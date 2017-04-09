import jwt from "jwt-simple";

describe("Routes: Bookmarks", () => {
    const Users = app.db.models.Users;
    const Bookmarks = app.db.models.Bookmarks;
    const jwtSecret = app.libs.config.jwtSecret;
    let token;
    let fakeBookmark;

    beforeEach(done => {
        Users
            .destroy({where: {}})
            .then(() => Users.create({
                name: "John",
                email: "john@mail.net",
                password: "12345"
            }))
            .then(user => {
                Bookmarks
                    .destroy({where: {}})
                    .then(() => Bookmarks.bulkCreate([{
                        id: 1,
                        title: "Test 1",
                        url: "http://foo.bar/",
                        user_id: user.id
                    }, {
                        id: 2,
                        title: "Test 42",
                        url: "http://foo.bar/study",
                        user_id: user.id
                    }]))
                    .then(bookmarks => {
                        fakeBookmark = bookmarks[0];
                        token = jwt.encode({id: user.id}, jwtSecret);
                        done();
                    });
            });
    });

    describe("GET /bookmarks", () => {
        describe("status 200", () => {
            it("returns a list of bookmarks", done => {
                request.get("/bookmarks")
                    .set("Authorization", `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.have.length(2);
                        expect(res.body[0].title).to.eql("Test 1");
                        expect(res.body[1].title).to.eql("Test 42");
                        done(err);
                    });
            });
        });
    });

    describe("POST /bookmarks", () => {
        describe("status 200", () => {
            it("creates a new task", done => {
                request.post("/bookmarks")
                    .set("Authorization", `JWT ${token}`)
                    .send({title: "Example", url: "http://example.com/"})
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql("Example");
                        expect(res.body.url).to.eql("http://example.com/");
                        done(err);
                    });
            });
        });
    });

    describe("GET /bookmarks/:id", () => {
        describe("status 200", () => {
            it("returns one bookmark", done => {
                request.get(`/bookmarks/${fakeBookmark.id}`)
                    .set("Authorization", `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql("Test 1");
                        done(err);
                    });
            });
        });
        describe("status 404", () => {
            it("throws error when task not exist", done => {
                request.get("/bookmarks/0")
                    .set("Authorization", `JWT ${token}`)
                    .expect(404)
                    .end((err, res) => done(err));
            });
        });
    });

    describe("PUT /bookmarks/:id", () => {
        describe("status 204", () => {
            it("updates a task", done => {
                request.put(`/bookmarks/${fakeBookmark.id}`)
                    .set("Authorization", `JWT ${token}`)
                    .send({
                        title: "New Title",
                    })
                    .expect(204)
                    .end((err, res) => done(err));
            });
        });
    });

    describe("DELETE /bookmarks/:id", () => {
        describe("status 204", () => {
            it("removes a task", done => {
                request.delete(`/bookmarks/${fakeBookmark.id}`)
                    .set("Authorization", `JWT ${token}`)
                    .expect(204)
                    .end((err, res) => done(err));
            });
        });
    });
});
