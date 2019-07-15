FROM node:11

# install ffmpeg
RUN apt-get update
RUN apt-get install -y ffmpeg

RUN npm install -g typescript

# Set up working directory
RUN mkdir bot

# install dependencies
COPY package.json /bot/package.json
RUN cd /bot && npm install

# send source
COPY ./src /bot/src
COPY tsconfig.json /bot/tsconfig.json

# Compile
RUN cd /bot && tsc

# We could clean up by removing all assets except 
# /bot/built 
# /bot/node_modules

# start the bot
CMD ["node", "/bot/built/bot.js"]

