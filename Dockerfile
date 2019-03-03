FROM node:11

# install ffmpeg
RUN apt-get update
RUN apt-get install -y ffmpeg

# install dependencies
COPY package.json package.json
RUN npm install

# send source
COPY ./src .

# star the bot
CMD ["node", "bot.js"]

