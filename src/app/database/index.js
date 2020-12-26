const databaseConfig = require('../../config/database.json')
const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(`${databaseConfig.host}/${databaseConfig.database}` )
mongoose.Promise = global.Promise
module.exports = mongoose