# imstall

Use 'npx imstall ...' as a package installer for more complex installations.

## When You Can't Just `apt-get install...` Something

Many great software packages don't have properly-built packages for the
package managers out there. And, because of the nature of change, it is usually
the newest, most exciting software that hasn't yet put time into package-ifying
their code. Usually, there's only a readme.

So, I decided to build scripts for the ones I've had to install manually, and
here they are. These have been used on Ubuntu 16.04 only. If something fails on
it, leave me an issue. If it fails on 18.04 or 20.04, leave an issue, but it might
not get fixed right away. PRs are appreciated. PRs for non-Ubuntu are doubly appreciated.

# Anaconda

```sh
npx imstall anaconda
```

Installs the data-science-centric Python distro.

# Android-build-tools

TBD

# Ansible

```sh
npx imstall ansible
```

Installs Ansible and adds boto and boto3.

# AWS2

```sh
npx imstall aws
```

Installs the AWS command-line tools, version 2.

# etcd

```sh
npx imstall etcd
```

Installs command-line client for etcd.

* This is not the etcd engine / server, it is just the CLI client.

# fzf

```sh
npx imstall fzf
```

Installs the command-line fuzzy-finder.

# GO

```sh
npx imstall go
```

Installs the programming language GO.

# Node.js

```sh
npx imstall node12
```

Installs Node.js, version 12.

# Redis

```sh
npx imstall redis
```

Installs redis-server, fixes redis.conf to bind to all ifaces, and (re)starts the service.

# Hashicorp Vault

```sh
npx imstall vault
```

Installs `vault_1.3.4_linux_amd64.zip` that I have on S3.

TODO:

* Download latest from Hashicorp, and use that, instead.

# VIM 8

```sh
npx imstall vim8
```

Installs VIM 8+ from `ppa:jonathonf`.

# vimcat

```sh
npx imstall vimcat
```

Installs `vimcat` (and `vimpager`) from github.com/rkitover/vimpager.

