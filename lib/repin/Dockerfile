FROM golang:1.21 as build

WORKDIR /usr/src/app

COPY . .

RUN go install github.com/playwright-community/playwright-go/cmd/playwright@latest
RUN playwright install --with-deps

RUN go build -o ./app .
EXPOSE 1323
