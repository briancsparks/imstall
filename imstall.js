#!/usr/bin/env node

const fs                  = require('fs');
const os                  = require('os');
const path                = require('path');
const { spawn, execSync } = require('child_process');

//if (require.module === module) {
  main();
//}

function main() {

  //console.error(`No recipe for "${process.argv[2]}"`);

  var args            = Array.from(process.argv);
  var npxName         = args.shift();
  var imstallName     = args.shift();
  var commandName     = args.shift();

  var distro          = 'mac';
  if (os.platform() === 'linux') {
    distro            = ''+ execSync('lsb_release -is');
  }
  distro = distro.trim();

  // Is this an apt-get install?
  if (commandName === 'agu') {
    var command = path.join(process.cwd(), 'lib', commandName);
    return spawnIt(commandName, command, args, function(code) {
      return;
    });
  }

  var command = path.join(process.cwd(), 'lib', distro, commandName);

  var success = false;
  if (fs.existsSync(command)) {
    //console.log(`clog ${command}`, args);

    const proc = spawn(command, args);

    proc.stdout.on('data', (data) => {
      //console.log(`stdout: ${data}`);
      console.log(''+ data);
    });

    proc.stderr.on('data', (data) => {
      //console.error(`stderr: ${data}`);
      console.error(''+ data);
    });

    proc.on('close', (code) => {
      console.log(`imstall ${commandName} exited with code ${code}`);
    });

  } else {
    console.log(`Cannot find command: ${command}`);
  }

  //if (!success) {
  //  console.error(`Failed to run: ${command}`);
  //}
}

function spawnIt(commandName, command, args, callback) {
  const proc = spawn(command, args);

  proc.stdout.on('data', (data) => {
    //console.log(`stdout: ${data}`);
    console.log(''+ data);
  });

  proc.stderr.on('data', (data) => {
    //console.error(`stderr: ${data}`);
    console.error(''+ data);
  });

  proc.on('close', (code) => {
    console.log(`imstall ${commandName} exited with code ${code}`);
    callback(code);
  });
}

