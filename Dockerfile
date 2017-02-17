FROM alpine:3.5
COPY ./entrypoint.sh .
ENTRYPOINT ["./entrypoint.sh"]
