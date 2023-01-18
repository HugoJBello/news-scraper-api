pm2 stop puppeteer_news_scraper_api
pm2 delete puppeteer_news_scraper_api
pm2 start npm --name "puppeteer_news_scraper_api" -- start