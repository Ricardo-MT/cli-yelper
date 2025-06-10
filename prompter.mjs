import {
    createPrompt,
    useState,
    useKeypress,
    usePrefix,
    isEnterKey,
    isUpKey,
    isDownKey,
} from '@inquirer/core';
import { input } from '@inquirer/prompts';
import chalk from 'chalk';
import readline from 'readline';

export const promptChoices =  async (options) => {
    const {
        renderSelected = (choice) =>
            chalk.green(choice.key? `❯ ${choice.name} (${choice.key})` : `❯ ${choice.name}`),
        renderUnselected = (choice) => choice.key? `  ${choice.name} (${choice.key})` : `  ${choice.name}`,
    } = options;

    let rl;
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.output.write('\x1B[?25l'); // Hide cursor

    const answer = await createPrompt((config, done) => {
        const { choices } = config;
        const [status, setStatus] = useState('pending');
        const [index, setIndex] = useState(0);
        const prefix = usePrefix();

        useKeypress((key, _rl) => {
            if(key.ctrl === true && key.name === "c") {
                    setStatus('done');
                    const exitCommand = choices.find(choice => choice.value === "exit");
                    if (exitCommand) {
                        done(exitCommand.value);
                    }
                    else {
                        process.exit(0);
                    }
            }
            if (isEnterKey(key)) {
                const selectedChoice = choices[index];
                if (selectedChoice) {
                    setStatus('done');
                    done(selectedChoice.value);
                }
            } else if (isUpKey(key)) {
                setIndex(index > 0 ? index - 1 : choices.length - 1);
            } else if (isDownKey(key)) {
                setIndex(
                    index < choices.length - 1 ? index + 1 : 0
                );
            } else {
                const foundIndex = choices.findIndex((choice) => {
                    const keyName = key.name.toLowerCase();
                    return choice.key === keyName;
                });
                if (foundIndex !== -1) {
                    setIndex(foundIndex);
                    // This automatically finishes the prompt. Remove this if you don't want that.
                    setStatus('done');
                    done(choices[foundIndex].value);
                }
            }
        });

        const message = chalk.bold(config.message);

        if (status === 'done') {
            return `${prefix} ${message} ${chalk.cyan(choices[index].name)}`;
        }

        const renderedChoices = choices
            .map((choice, i) => {
                if (i === index) {
                    return renderSelected(choice, index);
                }

                return renderUnselected(choice, i);
            })
            .join('\n');

        return [`${prefix} ${message}`, renderedChoices];
    })(options);

    rl.output.write('\x1B[?25h'); // Show cursor

    rl.close();

    return answer;
};

export const promptResponse = async (question) => {
    const answer = await input({
    message: question,
    });
    return answer;
}
