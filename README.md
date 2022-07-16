Single Sigin On API


## Installation

```bash
npm install
```


## Dev Configuration

Generate certificate keys:

```bash
# Generate cert keys
openssl genrsa -des3 -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

# Comppress to one line (Using node)
node
writeFileSync('./private-single-line.pem', readFileSync('./private.pem', 'utf-8').replace(/\n/g, '\\n'), 'utf-8');
writeFileSync('./public-single-line.pem', readFileSync('./public.pem', 'utf-8').replace(/\n/g, '\\n'), 'utf-8');
```

Create *.env* file:

```.env
Certificate.PrivateKey="private-single-line.pem content"
Certificate.PublicKey="public-single-line.pem content"
Certificate.PrivateKeyPassPhrase="pass-private-key"
DATABASE_URL=postgres://postgres:masterkey@localhost:5432/sso-app
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Example - Installation

Run Example Api:
```bash
cd example/webapi
npm install
```

Run Example Site:
```
cd example/webapp
npm install
```

## Example - Running

Run Example Api:
```bash
cd example/webapi
npm start
```

Run Example Site:
```
cd example/webapp
npm start
```
