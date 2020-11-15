/**
 * Meta JS File that will be picked up by the Vue CLI
 */
module.exports = {
  prompts: {
    name: {
      type: 'string', // Question type
      required: true, // Is question Required
      message: 'Project name' // Question it's self
    },
    description: {
      type: 'string',
      required: false,
      message: 'Description',
    },
    author: {
      type: 'string',
      message: 'Author',
      required: true
    },
  }
};
