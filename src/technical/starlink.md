# IPv6 on Mikrotik on Starlink

> 11 June 2023

I've just gotten a Starlink satellite internet connection as a temporary stopgap until I get fibre wire in.

My previous ISP didn't provide native IPv6, so I long played with various tunnels, to various effect;
Netflix for example is very much not happy if your IPv4 appears to be in New Zealand but your IPv6 comes out in Sydney.
Most recently I was with Route48, which provided an Auckland-based Wireguard tunnel, which was pretty good, but they shut down over spam.
Thus, with Starlink having IPv6, I immediately wanted to get it going.

Some starlink setup details:
- I have a rectangular dishy
- I'm not bypassing the router
- I'm wired in with the official ethernet adapter

Some mikrotik setup details:
- RouterOS 7.8 everywhere. I'll upgrade to 7.9 soon but not today.
- I have a hEX PoE at the "comms centre" of my house, which has the Starlink intake on its `ether1` (PoE in, via a 57V AC/DC adapter)
- That powers two wifi APs in the form of two ac²s at either end of the house
- ...I've promised myself that I'll get ax²s when fibre arrives, so I can have proper Wifi 6
  - (I did have Wifi 6 via an OpenWRT'd Ubiquiti Unify but it was still too dodgy/unconfigurable for my tastes)

Some network details:
- An IPv4 /23 in the 10/8 block, with the upper /24 for DHCP and the lower for statics
- The hEX acts as router with dhcp/dns/ntp. I don't do queueing so the mips is plenty for that.
- Double NAT for IPv4, because I don't want starlink to be able to see my network.
- DNS "terminated" at the hEX with DoH for the upstream, again because I don't want my DNS to be snoopable.

The AP setup is uninteresting save that on the topic of IPv6, I didn't do anything special but cleared the firewall.

Now, the router setup. Credit where credit is due, I cribbed a bunch of it from:
- [tim4324 on r/starlink](https://www.reddit.com/r/Starlink/comments/xv2p04/starlink_ipv6_config_for_mikrotik_routers/)
- [gmanual on that same thread](https://www.reddit.com/r/Starlink/comments/xv2p04/comment/iz8htnl/)
- [tyd on github](https://github.com/tyd/mikrotik-starlink-ipv6)

## Interfaces

You should probably already have that or something like it, but just in case:

```mikrotik
/interface list
add name=WAN
add name=LAN

/interface list member
add interface=ether1 list=WAN
add interface=ether2 list=LAN
add interface=ether3 list=LAN
add interface=ether4 list=LAN
add interface=ether5 list=LAN
add interface=bridge list=LAN

# Eventually I'll get the fibre intake on the SFP, so:
add interface=sfp1 list=WAN
```

And the bridge:

```mikrotik
/interface bridge port
add bridge=bridge ingress-filtering=no interface=ether2
add bridge=bridge ingress-filtering=no interface=ether3
add bridge=bridge ingress-filtering=no interface=ether4
add bridge=bridge ingress-filtering=no interface=ether5

# I like to put my non-bridged ports in but disabled so it's clear where they're at
add bridge=bridge disabled=yes ingress-filtering=no interface=ether1
add bridge=bridge disabled=yes ingress-filtering=no interface=sfp1
```

## The actual IPv6 config

```mikrotik
/ipv6 settings
set disable-ipv6=no forward=yes accept-redirects=no \
    accept-router-advertisements=yes max-neighbor-entries=8192

# that little script is just to print the prefix to logs; originally (see tim's thread) it also warns
# on prefix change but Starlink no longer changes prefixes willy nilly so it never occurs. but just in case... 
/ipv6 dhcp-client
add interface=ether1 pool-name=starlink rapid-commit=no request=prefix \
    script=":log info (\$\"pd-prefix\" . \" DHCP\")\
    \n:if (\$oldpd = \$\"pd-prefix\") do={ } else={ :log warning \"different P\
    D\"  }\
    \n:global oldpd \$\"pd-prefix\"\
    \n" use-interface-duid=yes

# wait for prefix delegation
:delay 5000ms

# Take ::2 in the pool. Leaving ::1 alone may or may not help.
/ipv6 address
add address=::2 from-pool=starlink interface=bridge

# If no address was added automatically here only:
# Replace 2406:xxxx:xxxx:xxxx with your starlink's address prefix
# again we take ::2; in this case ::1 is nominally the starlink's
add address=2406:xxxx:xxxx:xxxx::2 advertise=no interface=ether1

# This was the critical bit for me.
# Other guides insist routing is automatic, but it wasn't in my case. YKMV.
/ipv6 route
add disabled=no distance=1 dst-address=2000::/3 gateway=\
    [/ipv6/dhcp-client get value-name=dhcp-server-v6 number=ether1] \
    routing-table=main scope=30 target-scope=10

/ipv6 nd prefix default
set preferred-lifetime=10m valid-lifetime=15m

/ipv6 nd
set [ find default=yes ] disabled=yes
add advertise-dns=no advertise-mac-address=no interface=ether1 ra-lifetime=none

# if you're not doing DNS on mikrotik, you'll want to change/remove `dns` here
add dns=[<your address on bridge>] hop-limit=64 interface=bridge \
    managed-address-configuration=yes mtu=1280 other-configuration=yes \
    ra-interval=3m20s-8m20s
```

## v6 Firewall

_This is basically copied from tyd._

First, some address lists:

```mikrotik
/ipv6 firewall address-list
add address=::/128 comment="defconf: unspecified address" list=bad_ipv6
add address=::1/128 comment="defconf: lo" list=bad_ipv6
add address=fec0::/10 comment="defconf: site-local" list=bad_ipv6
add address=::ffff:0.0.0.0/96 comment="defconf: ipv4-mapped" list=bad_ipv6
add address=::/96 comment="defconf: ipv4 compat" list=bad_ipv6
add address=100::/64 comment="defconf: discard only " list=bad_ipv6
add address=2001:db8::/32 comment="defconf: documentation" list=bad_ipv6
add address=2001:10::/28 comment="defconf: ORCHID" list=bad_ipv6
add address=fe80::/10 list=prefix_delegation
add address=[/ipv6/dhcp-client get value-name=dhcp-server-v6 number=ether1] \
    list=prefix_delegation comment="dhcp6 client server value"
```

Then some rules:

```mikrotik
/ipv6 firewall filter
add action=accept chain=input dst-port=5678 protocol=udp
add action=accept chain=input comment=\
    "defconf: accept established,related,untracked" connection-state=\
    established,related,untracked
add action=drop chain=input comment="defconf: drop invalid" connection-state=\
    invalid
add action=accept chain=input comment="defconf: accept ICMPv6" protocol=\
    icmpv6
add action=accept chain=input comment="defconf: accept UDP traceroute" port=\
    33434-33534 protocol=udp
add action=accept chain=input comment=\
    "defconf: accept DHCPv6-Client prefix delegation." dst-port=546 protocol=\
    udp src-address-list=prefix_delegation
add action=drop chain=input comment=\
    "defconf: drop everything else not coming from LAN" in-interface=!bridge
add action=accept chain=forward comment=\
    "defconf: accept established,related,untracked" connection-state=\
    established,related,untracked
add action=drop chain=forward comment="defconf: drop invalid" \
    connection-state=invalid
add action=drop chain=forward comment=\
    "defconf: drop packets with bad src ipv6" src-address-list=bad_ipv6
add action=drop chain=forward comment=\
    "defconf: drop packets with bad dst ipv6" dst-address-list=bad_ipv6
add action=drop chain=forward comment="defconf: rfc4890 drop hop-limit=1" \
    hop-limit=equal:1 protocol=icmpv6
add action=accept chain=forward comment="defconf: accept ICMPv6" protocol=\
    icmpv6
add action=accept chain=forward comment="defconf: accept HIP" protocol=139
add action=drop chain=forward comment=\
    "defconf: drop everything else not coming from LAN" in-interface=!bridge
```

## Optionals; my setup

### NTP

```mikrotik
/system ntp client
set enabled=yes

/system ntp server
set enabled=yes

/system ntp client servers
add address=nz.pool.ntp.org
```

### DNS

```mikrotik
/tool fetch url=https://curl.se/ca/cacert.pem
/certificate import file-name=cacert.pem password=""

/ip dns static
add address=9.9.9.9 name=dns.quad9.net
add address=149.112.112.112 name=dns.quad9.net
add address=2620:fe::fe name=dns.quad9.net type=AAAA
add address=2620:fe::9 name=dns.quad9.net type=AAAA
/ip dns
set allow-remote-requests=yes cache-size=4096KiB use-doh-server=\
    https://dns.quad9.net/dns-query verify-doh-cert=yes
```
