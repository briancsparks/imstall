#!/bin/bash -e

curl -L https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
sudo echo "deb https://deb.nodesource.com/node_12.x $(lsb_release -cs) main" | sudo tee -a /etc/apt/sources.list.d/node.list

sudo apt-get update
sudo apt-get install -y --no-install-recommends nodejs
