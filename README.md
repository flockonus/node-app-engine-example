# Deployment step by step

```
# install gcloud: https://cloud.google.com/sdk/docs/quickstart-macos

gcloud auth login < YOUR EMAIL >

-- sets the project once and don't worry about it again
gcloud config set project sherwa-staging

# only 1 time per GC project (select region us-west2)
gcloud app create

-- make sure app.yaml is present, and env_variables.yaml is configured and correct
gcloud app deploy demo1-app.yaml

gcloud app browse
```

After deployment there should be a line saying `target url: https://...` Your application is deployed at this URL!

Next, try to access some endpoints like
- /
- /env
- /slow/1
- /slow/2

## Instance management

App engine will **auto scale**, depending on [some configurable factors](https://cloud.google.com/appengine/docs/standard/nodejs/config/appref#scaling_elements) such as CPU, memory, requests in parallel.

If you hit slower endpoints that bring the memory or CPU up, will cause GC to deploy more instances, and because of the way we programmed the `/slow/:time` endpoint it will cause the CPU usage to increase very fast.

You can monitore some status in (near) real time at GC > App Engine > Dashboard

## Application logs

On https://console.cloud.google.com, in the correct project, search "logging" and go to that part.
There should be a window 

App engine also comes with [a few env vars](https://cloud.google.com/appengine/docs/standard/nodejs/runtime#environment_variables) including `PORT` and `NODE_ENV=production`.

## links

- Multiple services under node.js: https://cloud.google.com/appengine/docs/standard/nodejs/configuration-files
- Tutorial Reference: https://cloud.google.com/nodejs/getting-started/hello-world
- On [environment variables](https://cloud.google.com/appengine/docs/flexible/nodejs/runtime#environment_variables) + [stack overflow suggestion](https://stackoverflow.com/questions/22669528/securely-storing-environment-variables-in-gae-with-app-yaml)

