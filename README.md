# package-inspector

Save time inspecting npm packages by letting package-inspector do most of the work.

Package-inspector provides a cli, helping you to quickly install different versions of different npm packages.

## Installation

```sh
npm install -g package-inspector
```

## Usage

Package-inspector is made to be used on the command line, currently providing the commands `repl`, `dl`, `exec` and `cl`. Also you can always use the argument `-h/--help` to get help.

```console
$ package-inspector -h
Usage: package-inspector <command>

Inspecting npm packages made easy

Options:
  -h, --help                                    display help for command

Commands:
  repl <package> [version]                      Start a REPL with a specific package and version (e.g., package-inspector repl lodash 4).
  dl [options] <package> <versions...>          Create folders for packages (e.g., package-inspector dl lodash 3 4).
  exec [options] <exp> <package> <versions...>  Run either a single expression or a file with expressions on each versions of the package (e.g.,
                                                package-inspector exec exps.txt -f lodash 3 4).
  cl <package>                                  Get changelog urls for the major versions of a package (e.g., package-inspector cl lodash).
```

### The `repl <package> [version]` command

The `repl` command is ment for quickly testing a single version of a package, providing easy access to this package in the node.js repl environment. `repl` takes two arguments, the package name and the version of the package. The second argument is optional, and the default value is the most recent version of the package provided. See the `-h` option for an example.

```console
$ package-inspector repl -h
Usage: package-inspector repl [options] <package> [version]

Start a REPL with a specific package and version (e.g., package-inspector repl lodash 4).

Arguments:
  package     name of the package you want to start a REPL for.
  version     version of the package

Options:
  -h, --help  display help for command
```

### The `dl <package> <versions...>` command

The `dl` command is ment for comparing two versions of the same npm package. By providing severel version arguments, package-inspector will create multiple new directories, with the specified versions installed in their own directory. The command takes two arguments, the first being the package name and the second being a list of version numbers. See the `-h` option for an example.

```console
$ package-inspector dl -h
Usage: package-inspector dl [options] <package> <versions...>

Create folders for packages (e.g., package-inspector dl lodash 3 4).

Arguments:
  package      name of the package you want to create folders for.
  versions     Versions of the packages.

Options:
  -c, --class  Write all the package class interfaces to a seperate file
  -h, --help   display help for command
```

### The `exec [options] <exp> <package> <versions...>` command

The `exec` command can be used for executing one or more expressions on multiple versions of a package at the same time. It takes three arguments, the first being either a string expression to execute or a file consisting of multiple expressions. When providing a string, the package can be accessed through a `lib` constant (e.g. `package-inspector exec "lib.foo();" lodash 3 4`). The second argument is a package name and the third argument is one or more version numbers. If your expression requires additional packages to be installed in the project before execution use the `-ap` option.

```console
$ package-inspector exec -h
Usage: package-inspector exec [options] <exp> <package> <versions...>

Run either a single expression or a file with expressions on each versions of the package (e.g., package-inspector exec -f exps.txt lodash 3 4 -ap express fs).

Arguments:
  exp                                                expression/file.
  package                                            name of the package you want to use.
  versions                                           Versions of the packages.

Options:
  -f, --file                                         Execute a file containing multiple expressions (e.g., package-inspector exec exps.txt -f lodash 3 4).
  -ap, --additionalPackages <additionalPackages...>  Include these additional packages in the project where you execute the expression(s).
  -h, --help                                         display help for command
```

### The `cl <package>` command

The `cl` command can be used for getting the urls of the release pages and the changelog of all the major versions of a package. The command is intended for repositories using the [semantic release](https://github.com/semantic-release/semantic-release) package, and there is a chance some unique version names won't work with this command.

```console
$ package-inspector cl -h
Usage: package-inspector cl [options] <package>

Get changelog urls for the major versions of a package (e.g., package-inspector cl lodash).

Arguments:
  package     name of the package you want the changelogs for.

Options:
  -h, --help  display help for command
```
