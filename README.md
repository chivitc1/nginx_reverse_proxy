# Using NGINX as a gateway for web application running SSL
## Explainations

- Build three docker containers for nginx, web-api, web-app (however the nginx config for nginx, web-api, web-app running in single host will be provided)

- Your web-api running in a process which listening in port 3000, while web-app running simple react front-end listen in port 40000

    upstream docker-webapi {
        server web-api:3000;
    }
 
    upstream docker-webapp {
        server web-app:4000;
    }

- Nginx as a reverse proxy, or api gateway will expose port 443 as web-app, and forward requests from outside-world to host web-app port 4000.
and expose port 3000 as web-api service to outside-world, then forward requests to host web-api port 3000.

Note: If running in single host, the port expose for web-api to outside-world need to be different with the inside port of web-api (or conflict will be occured). For example, front-end code api_url need to be https://example.com:3002/api/products, web-api will listen to port 3000 internally, nginx will listen to port 3002 and forward incoming request to port 3000.

server {
    listen 3000 ssl;

    location / {
        proxy_pass         http://docker-webapi;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;

        proxy_set_header   Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;
    }
  }
  server {
    listen 443 ssl;

    location / {
        proxy_pass         http://docker-webapp;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host $server_name;
        proxy_set_header   Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;
    }
  }

- For SSL, I will generate a self-signed cert including a public and private key files

openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 360

(You may prefer to name files as: example.com.crt for cert and example.com.key for private key file)

You can also buy the SSL cert from domain registra and using cert and key files

In my case, I also choose passphrase as "abc123" => need to let nginx know the passphrase

- Config cert in /etc/nginx/nginx.conf

http {
    ssl_password_file /etc/nginx/cert/passphrase.txt;
    ssl_certificate /etc/nginx/cert/cert.pem;
    ssl_certificate_key /etc/nginx/cert/key.pem;
  ...
}

You can check the content of passphrase in api-gateway/cert/passphrase.txt

- You may also want to redirect incoming webapp request using http (80) to https (443) in nginx

http {
  ...
  server {
     listen 80;
     return 301 https://$host/$request_uri;
  }
}

## Run demo in docker

Build app:

npm run build
(or yarn build)

docker-compose up -d --build

## Test api
Browse to:
- http://localhost

- https://localhost