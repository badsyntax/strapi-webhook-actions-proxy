# Strapi Webhook GitHub Actions Proxy

[![Deploy](https://github.com/badsyntax/strapi-webhook-actions-proxy/actions/workflows/prod-deploy.yml/badge.svg)](https://github.com/badsyntax/strapi-webhook-actions-proxy/actions/workflows/prod-deploy.yml)
[![Analyze](https://github.com/badsyntax/strapi-webhook-actions-proxy/actions/workflows/analyze.yml/badge.svg)](https://github.com/badsyntax/strapi-webhook-actions-proxy/actions/workflows/analyze.yml)
[![CodeQL](https://github.com/badsyntax/strapi-webhook-actions-proxy/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/badsyntax/strapi-webhook-actions-proxy/actions/workflows/codeql-analysis.yml)

A super simple & lightweight Node.js proxy to send `repository_dispatch` events to GitHub from a Strapi Webhook.

Useful when you want to run a GitHub Actions workflow when changes are made in Strapi.

## Usage

1 - Ensure your GitHub Actions workflow file handles the "repository_dispatch" event with your custom type:

```yml
name: Deploy
on:
  repository_dispatch:
    types: [strapi_updated]
```

2 - Create a GitHub Personal access token with `repo` scope

3 - Deploy the service to your server, for example:

```bash
docker run \
  --publish 5000:5000 \
  --env GITHUB_TOKEN=YOURTOKEN \
  ghcr.io/badsyntax/strapi-webhook-actions-proxy:latest
```

(View [available docker tags](https://github.com/users/badsyntax/packages/container/package/strapi-webhook-actions-proxy), or just use `latest`.)

4 - Create a new Webhook in Strapi that points to the service with the following query params:

   - `event_type`: Any string. This value must match the `repository_dispatch` type specified in your GitHub Actions workflow file.
   - `repo`: GitHub `username/repo`

   For example:

   ```
   http://actions-proxy:5000/api?event_type=strapi_updated&repo=username/awesome-website
   ```

## Background

You can't point Strapi webhooks to the [repository dispatch event endpoint](https://docs.github.com/en/rest/reference/repos#create-a-repository-dispatch-event) as the webook request body is not compatible with the dispatches endpoint, thus a proxy is required.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

See [LICENSE.md](./LICENSE.md)
