module.exports = {
    database: "bookmarks",
    username: "",
    password: "",
    params: {
        /*
        Utilizado para facilitar o desenvolvimento.
        Num projeto de verdade seria um banco mais roboustocomo Postgres ou MySQL.
        */
        dialect: "sqlite",
        storage: "db.sqlite",
        define: {
            underscored: true
        }
    },
    /*
    Procura o secret em uma váriável de ambiente.
    Para facilitar o desenvolvimento é utilizado um valor padrão caso a variavel não esteja setada.
    Em condições normais esse valor padrão não existiria
    */
    jwtSecret: process.env.JWT_SECRET || 'jm_=e58zdtk7sg*8h_)6f6$ndfu#cbp9qwqsls5_*+tho$7$l-',
    jwtSession: {session: false}
};
