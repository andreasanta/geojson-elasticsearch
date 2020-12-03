# pull official base image
FROM mhart/alpine-node:15

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

EXPOSE 3000

# add app
COPY . ./

# start app
CMD ["yarn", "start"]