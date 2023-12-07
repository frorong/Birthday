'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const config = require('../config/config.json');

const { username, password, database, host, dialect } = config.development;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

const Member = require('./member')(sequelize, Sequelize.DataTypes);
const Comment = require('./comment')(sequelize, Sequelize.DataTypes);

const db = {};
db.Member = Member;
db.Comment = Comment;

Member.associate(db);
Comment.associate(db);

module.exports = db;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
