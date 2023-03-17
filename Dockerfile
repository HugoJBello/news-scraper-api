# from base image node
FROM node:15-slim

WORKDIR /app
COPY . .
 
# install all dependencies
RUN npm i

RUN npm i sqlite3

RUN npm run build


# copy other files as well
 

#expose the port
EXPOSE 3000

# command to run when intantiate an image
CMD ["npm","start"]