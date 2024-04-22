# docker-node

This is the web app from this [Docker tutorial](https://youtu.be/pg19Z8LL06w) video.

My cursory notes are below ...

## Image vs Container
* image: analogous to zip or jar package, has executable application artifact, includes app source code but also complete environment config (OS layer, services, application)
* container: a running instance of an image; need to start the image somewhere; the container actually starts the application
* you can run multiple containers from one image .. application: increase performance 

## Install docker: 
* get from docker website, install .deb

## Where to get images: dockerhub
* online spot for downloading verified docker images
* don't need an account
* images have tags indicating their release/version
* "latest" is a default .. you'll get this if you don't specify a tag

## Download an Image
* at terminal: 
```
docker pull nginx:1.24
```
or: 
```
docker pull nginx (gets latest)
```

## Run an image
Run in job in foreground.
```
docker run nginx:1.24
```
Run in background (i.e. detach and run in background).
```
docker run -d nginx:1.24
```
If you don't specify a name then docker assigns an arbitrary name


## Details about images: 
Show currently-installed images.
```
docker images
```

Show currently-running images.
```
docker ps
```
Container id from ps command is the argument.
```
docker logs ab81c0d46dcb69f
```

Docker will pull and run image directly from dockerhub if you specify a not-yet-downloaded image.

## How to access the container? port binding
* first expose it to local network: port binding
* if you try to access the container on the specified port then it won't be running there (yet)
* check localhost:80 and you'll see it isn't running .. or, in my case, apache2 or another server might be running
```
docker run -d -p 9000:80 nginx:1.24
```
* note that it is standard practice to use the same port on local and host machines (e.g. MySQL commonly uses port 3306 .. so -p 3306:3306)

## Starting & Stopping containers
`docker run` creates a new *container* every time it is executed

Use -a to see all running or stopped containers:
```
docker ps -a
```

Stop a specific container: 
```
docker stop {containerid}
```

Restart an existing container: 
```
docker start {containerid}
```

* can also use container's name rather than id

Specify a meaningful `--name` for docker container:
```
docker run --name web-app -d -p 9000:80 nginx:1.24
```

## Docker Registries
* private docker registries: Amazon ECR, Google, Nexus, etc
* registry vs repository: Amazon ECR is a registry that holds multiple docker repositories
* Docker Hub registry hosts public or private repositories

## Create your own custom docker image: Dockerfile
`Dockerfile` is definition of how to build and image from our application: 

## Web-app Example
Dockerfile directives
`FROM`: build this image from the specified image
* using node image .. which is a lightweight linux os with node, npm, etc

`RUN`: execute linux shell command in the shell environment

`COPY`: copy src files into the container's file structure

```	
COPY package.json /app/
```	

* the last slash tells docker to create the directory if it doesn't exist

`WORKDIR`: same as cd, commands that follow will exectute in this directory

`CMD` is same as RUN, but used as last directive


## now, build the image
```
docker build -t node-app:1.0 .
```
* builds the image with name based on the directives in the Dockerfile in current directory

