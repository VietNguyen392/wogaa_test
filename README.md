# Wogaa_test
Prerequisite 

Nodejs v18 _>

Docker

Introduce

Open terminal or powershell
First cd to Be folder, then run 

```bash 
docker build -t be.
```
to build a docker image of back-end server then run

```bash
docker run -it -p 6030:6030 be
```
to run the backend server in localhost

In the fe folder run 

```bash
docker build -t fe .
```
then run 
```bash
docker run -it -p 8000:8000 fe
```
if don't want to run with docker then cd to each folder
first run 
```bash
npm install
```
to install all dependencies library

then in be folder run 
```bash
npm run start
```
to run server
and in the fe folder run

```bash
npm run dev
```
to start the web

Demo

Register and login

https://github.com/VietNguyen392/wogaa_test/assets/88361260/c2ddaf44-6f35-4929-9b5b-28d1a1f2cbe7

Create a poll


https://github.com/VietNguyen392/wogaa_test/assets/88361260/10596bc9-6099-42b5-a3b9-afdb0d7dccc8

Realtime vote


https://github.com/VietNguyen392/wogaa_test/assets/88361260/8668b57f-a8bf-4810-b282-1697275a9ef4









