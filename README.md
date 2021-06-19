# Strapi Webhook Actions Proxy

A super simple & lightweight Node.js proxy to send `repository_dispatch` events to GitHub from a Strapi Webhook.

## Usage

Ensure your GitHub Actions workflow file handles the "repository_dispatch" event with your custom type:

```yml
name: Deploy
on:
  repository_dispatch:
    types: [strapi_updated]
```

Deploy the service to your server, for example:

```bash
docker run --publish 5000:5000 ghcr.io/badsyntax/strapi-webhook-actions-proxy:latest
```

TODO: env

Create a new Webhook in strapi that points to the service with the following query params:

- `event_type`: Any string. This value must match the `repository_dispatch` type specified in your GitHub Actions workflow file.
- `repo`: GitHub `username/repo`

For example:

```
http://strapi-webhook-actions-proxy.example.com/api?event_type=strapi_updated&repo=badsyntax/awesome-website
```
