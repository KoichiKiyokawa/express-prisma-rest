yarn prisma generate
yarn build
cp -r src/generated dist/
# prisma のバイナリのうち、App Engineで使うものだけを残す
rm dist/generated/client/query-engine-darwin*
cp src/generated/client/query-engine-debian-openssl-1.1.x dist/generated/client

gcloud app deploy --project kiyo-dev-944