const skills = [
  {text: 'JavaScript', expertise: false, _id: 125223},
  {text: 'HTML', expertise: false, _id: 127904},
  {text: 'Lunch', expertise: true, _id: 139608},
  {text: 'CSS', expertise: false, _id: 149608},
  {text: 'Node', expertise: false, _id: 165223},
  {text: 'GitHub', expertise: false, _id: 179608},
  {text: 'Taking a Break', expertise: true, _id: 177804},
  {text: 'Breathing', expertise: false, _id: 127534},
]

const findById = (id, callback) => {
  // see if this works, if not, execute the code in the catch block
  try {
    // make sure that conditions is an object - if not throw a TypeError
    const skill = skills.find(skill => skill._id === parseInt(id))
    if (!skill) throw new Error ('No skill was found')
    return callback(null, skill)
  } catch (error) {
    console.log(error)
    return callback(error, null)
  }
}

function find(conditions, callback) {
  try {
    if (!(conditions instanceof Object)) {
      throw new TypeError('Please pass in an object')
    }
    let conditionKeys = Object.keys(conditions)
    if (conditionKeys.length === 0) return callback(null, skills)
    if (!conditionKeys.every((i) => Object.keys(skills[0]).includes(i))) {
      throw new Error('Must find by properties that exist on the array items')
    } else {
      return callback(null, skills.filter((skill) =>
        conditionKeys.every((propKey) => skill[propKey] === conditions[propKey])
      ))
    }
  } catch (error) {
    console.log(error)
    callback(error, [])
  }
}

function create(skill, callback) {
  skill._id = Date.now() % 1000000
  skill.expertise = false
  skills.push(skill)
  return callback(null, skill)
}

function findByIdAndDelete(id, callback) {
  try {
    const idx = skills.findIndex(skill => skill._id == parseInt(id))
    const deletedSkill = skills.splice(idx, 1)
    if (!deletedSkill.length) throw new Error ('No skill was deleted')
    return callback(null, deletedSkill[0])
  } catch(error) {
    return callback(error, null)
  }
}

export { 
	find,
  findById,
  create,
  findByIdAndDelete,
}