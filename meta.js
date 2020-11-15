const path = require("path");
const spawn = require("child_process").spawn;

/**
 * Spawns a child process and runs the specified command
 * By default, runs in the CWD and inherits stdio
 * Options are the same as node's child_process.spawn
 * @param {string} cmd
 * @param {array<string>} args
 * @param {object} options
 */
function runCommand(cmd, args, options) {
  return new Promise((resolve, reject) => {
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
          stdio: 'inherit',
          shell: true,
        },
        options
      )
    )

    spwan.on('exit', () => {
      resolve()
    })
  })
}

const installDependencies = () => {
  console.log(`\n\n# ${color("Installing project dependencies ...")}`);
  console.log("# ========================\n");
  return runCommand("npm", ["install"], {
    cwd,
  });
};

/**
 * Meta JS File that will be picked up by the Vue CLI
 */
module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
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
  },
  filters: {
    "src/**/*": "name || description || author"
  },
  complete: function(data, { chalk }){
    const green = chalk.green;
    const cwd = path.join(process.cwd(), data.inPlace ? "" : data.destDirName);

    installDependencies(cwd, data.autoInstall, green)
      .then(() => {
        console.log("green('Project initialization finished!')}");
      })
      .catch((e) => {
        console.log(chalk.red("Error:"), e);
      });
  }
};
