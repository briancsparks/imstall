#!/usr/bin/env node

const fs                  = require('fs');
const os                  = require('os');
const path                = require('path');
const { spawn, execSync } = require('child_process');

main();


// --------------------------------------------------------------------------------------------------------------------
/**
 * The main function.
 */
function main() {

  // Determine args
  var args            = Array.from(process.argv);
  var npxName         = args.shift();
  var imstallName     = args.shift();
  var commandName     = args.shift();

  // Get the distro
  var distro          = 'mac';
  if (os.platform() === 'linux') {
    distro            = ''+ execSync('lsb_release -is');
  }
  distro = distro.trim();

  // Is this an apt-get install? ------------------------------------------------------------------
  if (commandName === 'agu') {
    var command = path.join(__dirname, 'lib', commandName);
    return spawnIt(commandName, command, args, function(code) {
      console.log(`imstall |agu ${args.join(' ')}| exited with code ${code}`);
      return;
    });
  }

  // Is this an echo? -----------------------------------------------------------------------------
  if (commandName === 'echo') {
    var command = path.join(__dirname, 'lib', commandName);
    return spawnIt(commandName, command, process.argv, function(code) {
      console.log(`imstall |echo ${process.argv.join(' ')}| exited with code ${code}`);
      return;
    });
  }

  // A general package-ish ------------------------------------------------------------------------
  var command = path.join(__dirname, 'lib', distro, commandName);

  var success = false;
  if (fs.existsSync(command)) {
    //console.log(`clog ${command}`, args);

//    const proc = spawn(command, args);
//
//    proc.stdout.on('data', (data) => {
//      //console.log(`stdout: ${data}`);
//      console.log(''+ data);
//    });
//
//    proc.stderr.on('data', (data) => {
//      //console.error(`stderr: ${data}`);
//      console.error(''+ data);
//    });
//
//    proc.on('close', (code) => {
//      console.log(`imstall ${commandName} exited with code ${code}`);
//    });

    return spawnIt(commandName, command, args, function(code) {
      console.log(`imstall |${commandName}| exited with code ${code}`);
    });

  } else {
    console.error(`No recipe for "${command}"`);
    //console.log(`Cannot find command: ${command}`);
  }
}


// --------------------------------------------------------------------------------------------------------------------
/**
 *  spawn the command.
 */
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
    callback(code);
  });
}

