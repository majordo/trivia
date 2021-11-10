FROM node:14-alpine

# RUN apk add --no-cache python3 py3-pip

# RUN apk --no-cache update && \
#     apk --no-cache upgrade

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm git python3 py3-pip && \
  npm install --quiet node-gyp -g


# RUN mkdir -p /app/frontend
# COPY packages/frontend /app/frontend
# WORKDIR /app/frontend
# RUN yarn install

# RUN echo CWD
# RUN mkdir -p /app/backend
# COPY packages/backend /app/backend
# WORKDIR /app/backend
# RUN yarn install

RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN yarn install

EXPOSE 4000
EXPOSE 3000
CMD [ "yarn", "start" ]

# docker build -t trivia .
# docker run -it --rm -p 4000:4000 trivia ash

