#!/usr/bin/env node

// @ts-nocheck
// Import necessary modules using ES Module syntax
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promptChoices, promptResponse } from "./prompter.js";
import chalk from 'chalk';
import ora from 'ora';
import { getPackageJson, getUserDataPath } from './utils.js';

const DATA_DIR = getUserDataPath();

// Define the path to the commands JSON file
const COMMANDS_FILE = path.join(DATA_DIR, 'commands.json');

/**
 * Loads commands from the commands.json file.
 * @returns {Array<{name: string;command: string;}>} An array of command objects, or an empty array if an error occurs.
 */
function loadCommands() {
  try {
      const exists = fs.existsSync(COMMANDS_FILE);
      if (exists) {
          // Read the file synchronously and parse it as JSON
          const data = fs.readFileSync(COMMANDS_FILE, 'utf8');
          return JSON.parse(data);
      }
      fs.writeFileSync(COMMANDS_FILE, JSON.stringify([]), 'utf8');
      return [];
  } catch (error) {
    // Log an error if the file cannot be read or parsed
    // @ts-ignore
    console.error(chalk.red(`Error loading commands from ${COMMANDS_FILE}: ${error.message}`));
    throw error;
  }
}

/**
 * Save commands to the commands.json file.
 * @param {Array<{name: string;command: string;}>} commands An array of command objects.
 */
function saveCommands(commands) {
  try {
    // Read the file synchronously and parse it as JSON
    fs.writeFileSync(COMMANDS_FILE, JSON.stringify(commands), 'utf8');
  } catch (error) {
    // Log an error if the file cannot be read or parsed
    // @ts-ignore
    console.error(chalk.red(`Error saving commands from ${COMMANDS_FILE}: ${error.message}`));
  }
}

/**
 * List all commands from the commands.json file.
 */
function listCommands() {
  try {
    console.log(chalk.blue('\n--- Available commands ---'));
    const commands = loadCommands();
    commands.forEach(({name, command}, i) => {
      console.log(chalk.bgGreen(`${i}. ${name} -> ${command}`))
    });    
    console.log(chalk.blue('----------------------'));
  } catch (error) {
    // Log an error if the file cannot be read or parsed
    // @ts-ignore
    console.error(chalk.red(`Error saving commands from ${COMMANDS_FILE}: ${error.message}`));
  }
}

/**
 * Executes a given shell command and displays its output.
 * @param {string} command The shell command to execute.
 * @returns {Promise<void>} A promise that resolves when the command finishes execution.
 */
async function executeCommand(command) {
  // Initialize a spinner to indicate that a command is running
  const spinner = ora(chalk.yellow(`Executing: ${command}`)).start();

  return new Promise((resolve) => {
    // Execute the command using child_process.exec
    // This function buffers the command's stdout and stderr and passes them to the callback
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // If there's an error, stop the spinner and report the error
        spinner.fail(chalk.red(`Command failed: ${error.message}`));
        if (stderr) {
          console.error(chalk.red('Stderr:'));
          console.error(stderr);
        }
        // Resolve the promise even on error to allow the main loop to continue
        resolve();
        return;
      }

      // If the command was successful, stop the spinner
      spinner.succeed(chalk.green('Command completed.'));

      // Display the standard output if available
      if (stdout) {
        console.log(chalk.blue('\n--- Command Output ---'));
        console.log(stdout.trim()); // Trim to remove any leading/trailing whitespace
        console.log(chalk.blue('----------------------\n'));
      }

      // Display standard error if available (even if command succeeded, some tools output warnings to stderr)
      if (stderr) {
        console.warn(chalk.yellow('\n--- Command Stderr (Warnings/Info) ---'));
        console.warn(stderr.trim());
        console.warn(chalk.yellow('--------------------------------------\n'));
      }

      // Resolve the promise
      resolve();
    });
  });
}

/**
 * Displays the list of commands and prompts the user to select one.
 * After selection, it executes the command and then offers to run another.
 */
async function showCommandList() {
  const commands = loadCommands();
  const hasAvailableCommands = !!commands.length;

  const commandKeys = "abcdefghijklmnopkrstuvwxyz";
  // Map commands to a format suitable for @inquirer/prompts' list prompt
  const choices = commands.map((cmd, i) => ({
    name: cmd.name, // Display name for the user
    value: cmd.name, // Actual command to execute
    key: commandKeys[i%commandKeys.length]
  }));

  const crudChoices = [];

  if (hasAvailableCommands) {
    crudChoices.push({ name: chalk.blue('List all'), value: 'list all'});
  }
  crudChoices.push({ name: chalk.blue('Create new'), value: 'create'});
  if (hasAvailableCommands) {
    crudChoices.push({ name: chalk.redBright('Delete'), value: 'delete'});
  }
  crudChoices.push({ name: chalk.blue('Exit'), value: 'exit', key: "escape" });

  console.log(hasAvailableCommands? "" : "You don't have any saved commands. Start by adding a command.");

  // Prompt the user to select a command
  const selectedCommand = await promptChoices({
    type: 'list',
    name: 'selectedCommand', // This 'name' property is still used by prompt internally
    message: chalk.cyan('Select what to do:'),
    choices: [...choices, ...crudChoices],
  });

  // Check if the user selected "Exit"
  if (selectedCommand === 'exit') {
    console.log(chalk.green('Exiting command line manager. Goodbye!\n'));
    process.exit(0); // Exit the process cleanly
  }
  if (selectedCommand === "list all") {
    listCommands();
    return showCommandList();
  }
  if (selectedCommand === 'create') {
    const newName = await promptResponse("Name of the command");
    if (!newName) {
      console.log(chalk.redBright("Command name cannot be empty.\n"));
      return showCommandList();
    }
    const newCommand = await promptResponse("Command to execute");
    if (!newCommand) {
      console.log(chalk.redBright("Command to execute cannot be empty.\n"));
      return showCommandList();
    }
    const newCommands = [...commands, {
      name: newName,
      command: newCommand
    }];
    saveCommands(newCommands);
      return showCommandList();
  }

  if (selectedCommand === "delete"){
    const toDelete = await promptChoices({
    type: 'list',
    name: 'commandToDelete', // This 'name' property is still used by prompt internally
    message: chalk.cyan('Select command to delete:'),
    choices: [...choices, { name: chalk.blue('Exit'), value: 'exit', key: "escape" }],
  });
  if (toDelete === 'exit') {
    return showCommandList();
  }
    const commandToDelete = commands.find(c => c.name === toDelete);
    console.log(chalk.red("You are about to delete the following command:\n"));
    console.log(`        name - ${commandToDelete.name}`);
    console.log(`command line - ${commandToDelete.command}\n`);
    const confirmInput = await promptResponse("Type the name of the command to confirm:");
    if (commandToDelete.name.toLowerCase() !== confirmInput.toLowerCase()) {
      console.log(chalk.blue("Operation canceled by the user.\n"));
    }
    else {
      const newCommands = commands.filter(({name}) => name !== commandToDelete.name);
      saveCommands(newCommands);
    }
    return showCommandList();
  }
    // Execute the selected command
    const commandToRun = commands.find(c => c.name === selectedCommand).command;
    await executeCommand(commandToRun);
    return showCommandList();
}

function getPackageVersion() {
  try {
    return getPackageJson().version;
  } catch (error) {
    console.error('Error reading version:', error.message);
    return 'unknown';
  }
}

const args = process.argv.slice(2);

if (args.includes('-v') || args.includes('--version')) {
  const version = getPackageVersion();
  console.log(version);
  process.exit(0); // Exit successfully after displaying version
}

const start = () => {
  console.log("");
  console.log("-------------------------------------------------------------");
  console.log("------------------- WELCOME TO CLI-YELPER -------------------");
  console.log("-------------------------------------------------------------");
  console.log("Your commands are being saved in " + COMMANDS_FILE);
  console.log("-------------------------------------------------------------");
  console.log("");
  
  showCommandList();
}

fs.promises.mkdir(DATA_DIR, { recursive: true }).then(start).catch(e => {
  console.error(e);
})
