FROM node:10

# install dependencies
COPY package.json package.json
RUN npm install

# send source
COPY ./src .

# star the bot
CMD ["node", "bot.js"]

