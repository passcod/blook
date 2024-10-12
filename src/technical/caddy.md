# Caddy

> July 2023

I encountered [Caddy] in or before 2018. Back then, it was a breath of fresh air in the HTTP server
space, something that you could spin up very quickly and simply, had good modern defaults, and
would handle HTTPS for you. However, while quite useful for running small services for personal
use, it didn't really seem like a strong option for production. In my professional use, I built
considerable experience, both good and bad, with both Nginx and HAProxy.

```caddyfile
example.com {
  file_server /static {
    root /var/www
  }

  reverse_proxy localhost:8001
}
```

Fast-forward to this month, where I encounter Caddy again while researching solutions for two
separate, different situations:

1. As a reverse proxy and static file server for a single non-production application that could
  handle provisioning and using **[Tailscale] certificates**.

2. As a reverse proxy for multiple applications **on Windows** with support for updating the
  configuration without a restart, without the use of signals.

At first blush, Caddy was now a lot more complicated.

Oh, sure, I could have used the continuing support for the Caddyfile format. But the
reconfiguration API only supports the new JSON schema. I wanted to evaluate that, see how viable
Caddy is for my production purposes.

So, there seems to be three main ways to use Caddy now:

1. With a static configuration file, reloading via tool.

   Caddy is started like:
   ```bash
   $ caddy run --config /path/to/caddy.json
   ```

   Reloading happens with:
   ```bash
   $ caddy reload --config /path/to/caddy.json
   ```

2. With a dynamic configuration file saved to disk, reconfiguring via API.

   ```bash
   $ caddy run --resume /path/to/caddy.json
   ```

3. With an ephemeral configuration in memory modifiable via API, initially loading from either no
  or a static configuration file.

   ```bash
   $ caddy run --config /path/to/static.json
   ```

The syntax is also a bit more verbose. Here's what I went with for an initial file server:

```json
{
  "logging": {
    "logs": {
      "default": {
        "encoder": { "format": "json" },
        "writer": {
          "output": "file",
          "filename": "/var/log/caddy/default.log"
        }
      }
    }
  },
  "apps": {
    "http": {
      "servers": {
        "files": {
          "listen": [":80", ":443"],
          "listener_wrappers": [
            { "wrapper": "http_redirect" },
            { "wrapper": "tls" }
          ],
          "routes": [{
            "match": [{
              "host": ["example.com"]
            }],
            "handle": [{
              "handler": "file_server",
              "root": "/var/www",
              "browse": {}
            }]
          }]
        }
      }
    }
  }
}
```

Credit where it's due, this still provisions an appropriate TLS certificate and the logs are
automatically rotated with a reasonable policy.

However, it took me quite a while to figure out that I needed to specify the `listener_wrappers` or
the HTTP→HTTPS redirect wouldn't work, that specifying only an address in the listener like `::1`
wouldn't work and that I'd need to give both ports, and how the matchers work when more than one is
in play. Additionally, configuration errors output typical Go marshal fare:

```
json: cannot unmarshal string into Go value of type caddyhttp.MatchHost
```

(No line numbers, that would be too easy.)

Here's the config I arrived at for my first task, with a Tailscale certificate serving a Gunicorn
plus static files application (`logging` section as before):

```json
{
  "apps": {
    "http": {
      "servers": {
        "app": {
          "listen": [":80", ":443"],
          "listener_wrappers": [
            { "wrapper": "http_redirect" },
            { "wrapper": "tls" }
          ],
          "routes": [
            {
              "match": [{
                "host": ["app.tailnet.ts.net"],
                "path": ["/static/*"]
              }],
              "handle": [{
                "handler": "file_server",
                "root": "/var/www",
                "browse": {}
              }],
              "terminal": true
            },
            {
              "match": [{
                "host": ["app.tailnet.ts.net"]
              }],
              "handle": [{
                "handler": "reverse_proxy",
                "upstreams": [{ "dial": "localhost:8001" }]
              }]
            }
          ]
        }
      }
    },
    "tls": {
      "automation": {
        "policies": [{
          "subjects": ["app.tailnet.ts.net"],
          "get_certificate": [{ "via": "tailscale" }]
        }]
      }
    }
  }
}
```

So, do I like it?

Well, as much as the configuration is very verbose, I do like that it is in good old regular JSON
instead of some custom configuration format that nobody implements a decent serializer for. Writing
templates in Jinja or Consul-Template for Nginx or HAProxy is exceedingly brittle.

The decision to completely eschew signals for configuration reloading in favour of an API is
interesting, too. It certainly makes it a lot easier to use on Windows, where signals are less of a
thing, to say the least. I'm also curious about authentication possibilities there.

My interest is piqued. There's some rough edges to be mindful of, but I'm going to keep looking
into it.

## Update: 2024

Caddy is now my primary server in production for actual real live dayjob
products in critical applications; however I found that in most scenarios where
humans ever have to read and/or write configs, using the Caddyfile format is
still the best.
