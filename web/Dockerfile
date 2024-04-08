FROM caddy:2.7.6-builder AS builder

RUN xcaddy build \
    --with github.com/caddy-dns/cloudflare

FROM caddy:2.7.6

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

COPY Caddyfile /etc/caddy/Caddyfile

ARG PORTS=80 443

EXPOSE $PORTS

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]