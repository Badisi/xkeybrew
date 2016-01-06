[github]: https://github.com/Badisi/xkeybrew
[archive]: https://github.com/Badisi/xkeybrew/pulls
[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#

# Developer Contribution

 - [Installing](#installing)
 - [Testing](#testing)
 - [Building](#building)
 - [Coding Rules](#rules)
 - [Git Commit Guidelines](#commit)

## <a name="installing">Installing</a>

Getting the code:
```bash
git clone https://github.com/Badisi/xkeybrew.git
```

Installing the dependencies:
```bash
# Global dependencies
npm install -g gulp electron-prebuilt

# Local dependencies
npm install
bower install
```

## <a name="testing">Testing</a>

From the project's root directory:

```bash
# Start a web server
gulp serve

# Launch the application
gulp electron
```

## <a name="building">Building</a>

From the project's root directory:

```bash
gulp build
```

## <a name="rules">Coding Rules</a>

To ensure consistency throughout the source code, get inspired by the following rules:

* [Javascript Style Guide](https://github.com/airbnb/javascript) (by Airbnb)
* [Angular Style Guide](https://github.com/johnpapa/angular-styleguide#style-y001) (by John Papa)
* [Angular Style Guide](https://github.com/toddmotto/angularjs-styleguide/) (by Todd Motto)
* [Angular Optimizations](https://www.binpress.com/tutorial/speeding-up-angular-js-with-simple-optimizations) (by Todd Motto)
* [Angular Best Practices](https://github.com/angular/angular.js/wiki/Best-Practices)
* [Angular Anti-patterns](https://github.com/angular/angular.js/wiki/Anti-Patterns)

and keep them in mind as you are working!

## <a name="commit">Git Commit Guidelines</a>

Like the Angular Team we use very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history** but also helps to **generate** the XKeyBrew [Changelog](../../CHANGELOG.md) document.

> A detailed explanation of Angular Team's guidelines and conventions can be found in this
  [document](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```html
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

> Any line of the commit message cannot be longer 100 characters!<br/>
  This allows the message to be easier to read on github as well as in various git tools.

##### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

##### Type

Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

##### Scope

The scope could be anything specifying place of the commit change.

##### Subject

The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

##### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

> This information is optional

##### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

> Breaking Changes are intended to highlight (in the Changelog) changes that will require community
  users to modify their code with this commit.

<br>

##### Sample Commit message:

```text
refactor(content): prefix mdContent scroll- attributes

    BREAKING CHANGE: md-content's `scroll-` attributes are now prefixed with `md-`.

    Change your code from this:

    ```html
    <md-content scroll-x scroll-y scroll-xy>
    ```

    To this:

    ```html
    <md-content md-scroll-x md-scroll-y md-scroll-xy>
    ```
```
