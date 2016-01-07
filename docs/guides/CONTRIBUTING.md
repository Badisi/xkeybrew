[issues]: https://github.com/Badisi/xkeybrew/issues

# Contributing to XKeyBrew

 - [Submission Guidelines](#submit)
 - [Translation](#translation)
 - [Theme](#theme)
 - [Wiki](#wiki)
 - [Donate](#donate)
 
## <a name="submit">Submission Guidelines</a>

### Submitting an Issue
Always search the in the [Issues Tracker][issues] before submitting your issue, maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue.
Help us to maximize the effort we can spend fixing issues and adding new
features, by not reporting duplicate issues.  Providing the following information will increase the
chances of your issue being dealt with quickly:

* **XKeyBrew version(s)** - is it a regression?
* **Operating system** - is this a problem with all operating system or only yours?
* **Motivation for or Use Case** - explain why this is a bug for you
* **Overview of the issue** - if an error is being thrown
* **XKeyBrew internal logs** - accessible from the settings section of the application
* **Steps to reproduce the error** - provide an unambiguous set of steps.
* **Related issues** - has a similar issue been reported before?
* **Suggest a fix** - if you can't fix the bug yourself, perhaps you can point to what might be
  causing the problem (line of code or commit)

### Submitting a Pull Request
Before you submit your pull request consider the following guidelines:

* Search the [archive](https://github.com/Badisi/xkeybrew/pulls) for an open or closed Pull Request that relates to your submission to avoid duplicates.

* Make your changes in a new git branch:

    ```shell
    git checkout -b my-fix-branch master
    ```

* Create your patch, **including appropriate test cases**.

* Follow our [Coding Rules](CODING.md#rules).

* Commit your changes using a descriptive commit message that follows our [commit message conventions](CODING.md##commit). This is required because release notes are automatically generated from these messages.

     ```shell
     git commit -a
     ```
  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

* Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

* In GitHub, send a pull request to `xkeybrew:master`.

* If we suggest changes then:
  * Make the required updates.
 
  * Re-run the test suite to ensure tests are still passing.
 
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push origin my-fix-branch -f
    ```

* That's it! Thank you for your contribution

##### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```

## <a name="translation">Translation</a>

...

## <a name="theme">Theme</a>

...

## <a name="wiki">Wiki</a>

...

## <a name="donate">Donate</a>

As a volunteer-based individual i'm working on this project on my free time.

Any contribution to the project are very much appreciated and helps maintain the application and develop new features.

[![paypal-icon](https://bytebucket.org/Badisi/xkeybrew/wiki/images/paypal.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8VETXK2GHPDSJ)

This project also uses additional software (feel free to support them too):

* [DvdStyler](http://www.dvdstyler.org/) by Alex Thüring  
* [abgx360](http://abgx360.xecuter.com/) by Seacrest
