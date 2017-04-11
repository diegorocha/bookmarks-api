module.exports = app => {
    const env = process.env.NODE_ENV;
    if (Boolean(env)) {
        // Importa o arquivo correto de cada ambiente (test, qa, prod, etc)
        return require(`./config.${env}.js`);
    }
    return require("./config.dev.js");
};
