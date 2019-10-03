# Deployment step by step

```
install gcloud

gcloud auth login < YOUR EMAIL >

-- sets the project once and don't worry about it again
gcloud config set project sherwa-staging

gcloud app create
(select region us-west2)

-- make sure app.yaml is present, and env_variables.yaml is configured and correct
gcloud app deploy

gcloud app browse
```


## links

- Tutorial Reference: https://cloud.google.com/nodejs/getting-started/hello-world
- On [environment variables](https://cloud.google.com/appengine/docs/flexible/nodejs/runtime#environment_variables) + [stack overflow suggestion](https://stackoverflow.com/questions/22669528/securely-storing-environment-variables-in-gae-with-app-yaml)

