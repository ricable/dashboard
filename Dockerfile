FROM alpine:3.5

LABEL maintainer "sebastian@loodse.com"

RUN apk add -U ca-certificates && rm -rf /var/cache/apk/*

COPY ./dashboard-v2 /
CMD ["/dashboard-v2"]