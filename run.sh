#!/bin/bash
docker build -t discord-bot.

docker stop discord-bot
docker rm discord-bot

docker run --name discord-bot -v /mp3:/mp3 -td discord-bot