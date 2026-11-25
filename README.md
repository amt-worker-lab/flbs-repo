# FLBS Browser Extensions Repository

This repository contains the browser-extension codebase used operationally by FLBS during its active years.

It includes the primary MTurk automation, task-routing, submission, and supporting browser extensions, including:

- `AMT, Core, mturk.com, s3.amazonaws.com, mturkcontent.com`
- `AMT, Core, All Pages`
- `AMT, Scripting, HitDB compiled`
- `AMT, Submit Checker`
- `Submit Checker 2.0`

The repository was maintained in production with an automated Git process that committed changes every 10 minutes whenever modifications were detected. As a result, the history provides a fine-grained record of the system’s development and operational evolution.

The code reflects a long-lived production system and includes legacy assumptions, requester-specific logic, browser automation, scraping, task handling, and infrastructure accumulated over several years. It is being published primarily as a historical and research artifact rather than as a modern, supported software package.
