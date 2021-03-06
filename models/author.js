var moment = require('moment');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: {type: String, required: true, max: 100},
  family_name: {type: String, required: true, max: 100},
  date_of_birth: {type: Date},
  date_of_death: {type: Date},
});

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual property to format date_of_birth using `moment`
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return moment(this.date_of_birth).format('MMMM Do, YYYY');
});

// Virtual property to format date_of_death using `moment`
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return moment(this.date_of_death).format('MMMM Do, YYYY');
});


// Virtual property for lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return this.date_of_birth_formatted+' - '+this.date_of_death_formatted;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);