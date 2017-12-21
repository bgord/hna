# raok

read articles on kindle

**raok** is command-line tool to handle news overload problem.

Typical flow looks like this:

### 1. Gather articles.

* You can do it by fetching specified number of articles from Hacker News or from Pocket. In order to be able to retrieve articles from your Pocket account, you must set **consumer_key**, **request_token**, **access_token** in `config.yml`.
* You can add single article, providing it's **title** and **url**.

Every new article has three properties.

* is_reviewed
* is_interesting
* is_sent

By default they're set to **false**.

In `config.yml` you can list **blocked_keywords** - article that contains at least one of this words will not be inserted to database.

### 2. Review.

Important step of using this tool is review. In this process, you decide, which articles you find so interesting, that they're worth pushing them to your Kindle.

> Warning: **be picky**!

After review process, every article has it's **is_reviewed** property set to true, and some of them also have **is_interesting** property set to true.

> To make sure you read only valuable things, you can double-check and review articles already marked as **interesting**.

### 3. Push.

The most spectacular phase - PUSH - **raok** grabs number of articles, gets their content, does some magic and converts them to mobi, and finally sends them to your Kindle device. After that, in **newspapers** directory remains zip file with **.html**, **.epub**, **.mobi**, **.txt** versions.

> You must provide Kindle email and credentials to an email address that your Kindle email can receive content from.

After that, if push succeeds, **is_sent** articles' property is set to **true**.
