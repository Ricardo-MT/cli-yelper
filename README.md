[![es](https://img.shields.io/badge/lang-es-blue.svg)](https://github.com/Ricardo-MT/cli-yelper/blob/master/README.es.md)
---

# CLI Yelper 🚀

CLI Yelper is a simple and intuitive command-line interface tool that helps you manage, store, and quickly execute your frequently used terminal commands. Say goodbye to retyping long commands or searching through your shell history!

## Features

* **Store Commands:** Easily save your most used CLI commands with custom names.
* **Quick Execution:** Run your saved commands directly from an interactive menu.
* **Organized List:** View all your stored commands at a glance.
* **Create & Delete:** Add new commands or remove old ones effortlessly.
* **Persistent Storage:** Your commands are saved locally and are available across sessions.

## Installation

You can install CLI Yelper globally via npm:

```bash
npm install -g cli-yelper
```

## Usage

After installation, simply run `cli-yelper` in your terminal to start the interactive menu:

```bash
cli-yelper
```

---

### Interactive Menu

When you run `cli-yelper`, you'll be greeted with a welcome message and a menu of options:

```
-------------------------------------------------------------
------------------- WELCOME TO CLI-YELPER -------------------
-------------------------------------------------------------
Your commands are being saved in /path/to/your/data/commands.json
-------------------------------------------------------------

Select what to do:
❯ Create new
  List all
  Delete
  Exit
```

---

Here's how to interact with the menu:

* **Navigate:** Use the **arrow keys** ($\uparrow$, $\downarrow$) to move between options.
* **Select:** Press **Enter** to choose an option.

---

### Available Actions

#### 1. Create New Command

If you don't have any commands saved, or you want to add a new one, select **"Create new"**.

You'll be prompted for two pieces of information:

* **Name of the command:** A friendly name for your command (e.g., "Update System", "Start Dev Server").
* **Command to execute:** The actual terminal command (e.g., `sudo apt update && sudo apt upgrade -y`, `npm run dev`).

**Example:**

```
Select what to do:
  List all
❯ Create new
  Delete
  Exit
```

```
Name of the command: My First Command
Command to execute: echo "Hello, CLI Yelper!"
```

#### 2. Run a Saved Command

If you have saved commands, they will appear in the main menu. Simply select the command you want to run.

**Example:**

```
Select what to do:
  My First Command
❯ List all
  Create new
  Delete
  Exit
```

After selecting a command, CLI Yelper will execute it and display the output.

#### 3. List All Commands

Choose **"List all"** to see a clear overview of all your saved commands, including their names and the commands they execute.

```
Select what to do:
  My First Command
❯ List all
  Create new
  Delete
  Exit

--- Available commands ---
0. My First Command -> echo "Hello, CLI Yelper!"
----------------------
```

#### 4. Delete a Command

Select **"Delete"** to remove an existing command. You'll then be prompted to choose which command to delete from a list. To prevent accidental deletions, you'll need to confirm your choice by typing the command's name.

**Example:**

```
Select what to do:
  My First Command
  List all
  Create new
❯ Delete
  Exit
```

```
Select command to delete:
❯ My First Command
  Exit

You are about to delete the following command:

        name - My First Command
command line - echo "Hello, CLI Yelper!"

Type the name of the command to confirm: My First Command
```

#### 5. Exit

Select **"Exit"** to quit CLI Yelper.

### Version Information

To check the installed version of CLI Yelper, use the `--version` or `-v` flag:

```bash
cli-yelper --version
# or
cli-yelper -v
```

## How It Works

CLI Yelper stores your commands in a JSON file named `commands.json` within a dedicated data directory on your system. This ensures your commands are persistent and available every time you run the tool. The location of this file is displayed when you start CLI Yelper.

## Contributing

CLI Yelper is an open-source project, and contributions are welcome! Feel free to open issues for bug reports or feature requests, or submit pull requests with your improvements.

## License

This project is licensed under the MIT License.

---
