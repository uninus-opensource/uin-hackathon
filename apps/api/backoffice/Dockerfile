FROM docker.io/node:lts-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install --omit=dev --frozen-lockfile

FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init
ARG DATABASE_URL 
ARG ACCESS_SECRET=ini_access_secret 
ARG REFRESH_SECRET=ini_refresh_secret 
ARG CORS_ORIGIN=http://localhost:3000/ 
ARG GOOGLE_CLIENT_ID=google_client_id  
ARG GOOGLE_CLIENT_SECRET=google_client_secret
ARG GOOGLE_CALLBACK_URL==google_callback_url
ARG SMTP_PASS=smtp_pass
ARG SMTP_PORT=smtp_port
ARG SMTP_USER=smtp_user
ARG REDIRECT_FE_URL=redirect_fe_url
ARG AWS_BUCKET=aws_bucket
ARG AWS_REGION=aws_region
ARG AWS_ACCESS_KEY=aws_acess_key
ARG AWS_SECRET_ACCESS_KEY=aws_secret_key

ENV NODE_ENV production
ENV PORT 3000
ENV DATABASE_URL $DATABASE_URL
ENV ACCESS_SECRET $ACCESS_SECRET
ENV REFRESH_SECRET $REFRESH_SECRET
ENV CORS_ORIGIN $CORS_ORIGIN
ENV GOOGLE_CLIENT_ID $GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_SECRET $GOOGLE_CLIENT_SECRET
ENV GOOGLE_CALLBACK_URL $GOOGLE_CALLBACK_URL
ENV SMTP_PASS $SMTP_PASS
ENV SMTP_PORT $SMTP_PORT
ENV SMTP_USER $SMTP_USER
ENV REDIRECT_FE_URL $REDIRECT_FE_URL
ENV AWS_BUCKET $AWS_BUCKET
ENV AWS_REGION $AWS_REGION
ENV AWS_ACCESS_KEY $AWS_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY dist/apps/api/backoffice .
RUN chown -R node:node .
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "main.js"]
