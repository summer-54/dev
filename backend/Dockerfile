FROM oven/bun:canary

WORKDIR /app

COPY . .

RUN bun i
#RUN npm run build

#CMD ["node", "./dist/main.js"]
CMD ["bun", "./main.ts"]