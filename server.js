const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const sequelize = require('./database/database');

const Director = require('./models/Director');
const Pelicula = require('./models/Pelicula');
const Actor = require('./models/Actor');
const Elenco = require('./models/Elenco');

const schema = require('./schema/schema');

Director.hasMany(Pelicula);
Pelicula.belongsTo(Director);

Pelicula.belongsToMany(Actor, { through: Elenco });
Actor.belongsToMany(Pelicula, { through: Elenco });

const app = express();

// Ruta principal
app.get('/', (req, res) => {
    res.send('API GraphQL de Películas funcionando correctamente');
});

app.use('/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {

    await sequelize.sync();

    console.log(`Servidor ejecutándose en puerto ${PORT}`);

});