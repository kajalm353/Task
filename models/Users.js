/**
 * This is the user model.
 * Creating schema for user
 *
 * @class user
 */
var mongoose = require('mongoose')
const bcrypt = require('bcrypt')
var userSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String },

	}
);


userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'jwtPrivateKey')

  return token
}



//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this


  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})


userSchema.statics.findByCredential = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    // return {message:'Unable to login'}
    throw new Error('unable to login')

  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    // return {message:'Unable to login'}
    throw new Error('unable to login')
  }
  return user
}
/*
 * create model from schema
 */
var collectionName = "users";
var users = mongoose.model("users", userSchema, collectionName);

/*
 * export users model
 */
module.exports = users;
