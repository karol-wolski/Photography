import { EMAIL, LETTERS, PHONE_NO } from '../constants'

const isEmail = str => EMAIL.test(str)
const isPhoneNo = str => PHONE_NO.test(str)
const isLetters = str => LETTERS.test(str)
const isRequired = str => str.length <= 0

export { isEmail, isPhoneNo, isLetters, isRequired }
