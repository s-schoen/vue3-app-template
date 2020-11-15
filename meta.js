/**
 * Meta JS File that will be picked up by the Vue CLI
 */
module.exports = {
  prompts: {
    templatename: {
      type: 'string',
      required: true,
      message: 'Project name'
    },
    templatename: {
      type: 'string',
      required: false,
      message: 'Description',
    },
    templatename: {
      type: 'string',
      message: 'Author',
      required: true
    },
  }
};
