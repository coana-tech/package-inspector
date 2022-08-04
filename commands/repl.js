import { exec } from 'child_process';
import repl from 'repl'
import chalk from 'chalk';
import { join } from 'path'
import * as url from 'url';
import fs from 'fs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default (packageName, packageVersion) => {
    const nameFolder = packageName.replace('/', '_').replace('@', '+') // @ -> +, / -> _, not sure what to use as the new symbols...
    const versionFolder = (packageVersion ? `${packageVersion}.x` : `latestVersion`)
    const pNameAndVersion = (packageVersion ? `${packageName}@${packageVersion}` : `${packageName}`)
    if (fs.existsSync(nameFolder)) {
        console.log(chalk.red(`The folder ${nameFolder} already exists`))
    } else {
        exec(`mkdir ${nameFolder}`);
        exec(`cd ${nameFolder} && ${join(__dirname, 'scripts', 'installPackage')} ${pNameAndVersion} ${versionFolder}`, function(err){
            if (err) {
                console.log(err)
                // If the folder was created before the error, remove the folder again
                if(fs.existsSync(`${nameFolder}`)) {
                    exec(`${join(__dirname, 'scripts', 'removeFolder')} ${nameFolder}`);
                }
                console.log(chalk.red(`The error was most likely caused by ${pNameAndVersion} not being a valid package on npm.`))
            }
            else {
                console.log(chalk.green(chalk.bold(`\n${pNameAndVersion} was successfully installed in the new folder
                ${process.cwd()}/${nameFolder}/${versionFolder}`))); 
                
                process.chdir(`./${nameFolder}/${versionFolder}`);
                repl.start().write(`const lib = require('${process.cwd()}/node_modules/${packageName}')\r\n`)
            } 
        });
    }
  };
