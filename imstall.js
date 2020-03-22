#!/usr/bin/env node

const fs                  = require('fs');
const os                  = require('os');
const path                = require('path');
const { spawn, execSync } = require('child_process');

var os_distro       = 'mac';
var os_release      = '10.14.5';
var os_codename     = 'Mojave';

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

  // Get the os_distro
  if (os.platform() === 'linux') {
    os_distro         = ''+ execSync('lsb_release -is');
    os_release        = ''+ execSync('lsb_release -rs');
    os_codename       = ''+ execSync('lsb_release -cs');
  }
  os_distro     = os_distro.trim();
  os_release    = os_release.trim();
  os_codename   = os_codename.trim();


  // Is this an apt-get install? ------------------------------------------------------------------
  if (commandName === 'agui' || commandName === 'agi') {
    var command = path.join(__dirname, 'lib', commandName);
    return spawnIt(commandName, command, args, function(code) {
      console.log(`imstall |agui ${args.join(' ')}| exited with code ${code}`);
      return;
    });
  }


  // Is this a setup? -----------------------------------------------------------------------------
  if (commandName === 'setup') {
    var command = path.join(__dirname, 'lib', commandName);
    return spawnIt(commandName, command, args, function(code) {
      console.log(`imstall |setup ${args.join(' ')}| exited with code ${code}`);
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
  var command = path.join(__dirname, 'lib', os_distro, os_release, commandName);

  if (fs.existsSync(command)) {
    //console.log(`clog ${command}`, args);

    return spawnIt(commandName, command, args, function(code) {
      console.log(`imstall |${commandName}| exited with code ${code}`);
    });
  }

  /* otherwise -- try shorter name */
  var command = path.join(__dirname, 'lib', os_distro, commandName);
  if (fs.existsSync(command)) {
    //console.log(`clog ${command}`, args);

    return spawnIt(commandName, command, args, function(code) {
      console.log(`imstall |${commandName}| exited with code ${code}`);
    });
  }

  /* otherwise -- not found */
  console.error(`No recipe for "${command}"`);
}


// --------------------------------------------------------------------------------------------------------------------
/**
 *  spawn the command.
 */
function spawnIt(commandName, command, args, callback) {

  var env     = Object.assign({}, process.env, {OS_DISTRO: os_distro, OS_RELEASE: os_release, OS_CODENAME: os_codename});

  const proc  = spawn(command, args, {env});

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

