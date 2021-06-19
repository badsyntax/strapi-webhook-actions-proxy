## Getting Started

1. Install Node.js 16.x
2. Install dependencies: `npm install`
3. Create a file called `.env` in the root of the application with the following contents:
   ```bash
   GITHUB_TOKEN="YOUR_GITHUB_TOKEN"
   ```
4. Start the app: `DEBUG=strapi-webhook-actions-proxy:* npm start`

## Testing Locally

```json
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"event":"entry.create","created_at":"2020-01-10T08:47:36.649Z","model":"example","entry":{}}' \
  "http://localhost:5000/api?event_type=strapi_updated&repo=badsyntax/thirlby-village"
```

## Build, Run, Publish Docker Image

```bash
docker build -t ghcr.io/badsyntax/strapi-webhook-actions-proxy:latest .
docker run --publish 5000:5000 --env-file .env ghcr.io/badsyntax/strapi-webhook-actions-proxy:latest
docker push ghcr.io/badsyntax/strapi-webhook-actions-proxy:latest
```
