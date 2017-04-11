import bodyParser from "body-parser";
module.exports = app => {
    app.set("port", 5000);
    app.set("json spaces", 4);  // Facilita o debug. Não deve ser setado em produção
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
};
