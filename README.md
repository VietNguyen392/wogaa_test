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


