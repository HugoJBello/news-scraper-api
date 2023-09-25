
 


   docker build . -t news-api
   docker stop -t news-api

   docker run -d --name news-api --restart always --network="bridge" -p 3000:3000 news-api 

   docker run -d --name news-api --restart always --network="bridge" -v ./database_news.sqlite3:/database_news.sqlite3 -p 3000:3000 news-api 

# Logs   
   
   docker logs --follow news-api


   docker run -d --network="bridge" news-api 

 ## Original repo
 https://github.com/arifintahu/project-structure-api/issues
  

    docker build -t node-api-typescript .
    docker run -it -p 3080:3070 --name=nodeapitypesctipt node-api-typescript