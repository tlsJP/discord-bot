#!/bin/bash
docker build -t discord-bot.

docker stop discord-bot
docker rm discord-bot

docker run --name discord-bot -td discord-bot