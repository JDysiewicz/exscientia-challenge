FROM golang:1.17-alpine3.14

# copy file contents into container /app dir
RUN mkdir -p /app
WORKDIR /app
COPY . /app/

# build exe
RUN go build -o exscientia-go-be /app

CMD ["./exscientia-go-be"]
