const mongoose = require('mongoose')
const validator = require('validator')


const User = mongoose.model('user', {
  name: {
		type: String,
		required: true,
		trim: true
	},
	email : {
		type: String,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is not correct')
			}
		},
		trim: true,
		lowercase: true
	},
  age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be a positive number.')
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('You must not use this silly password');
			}
		},
		trim: true
	}
})


module.exports = User