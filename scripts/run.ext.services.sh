#! /bin/bash

docker-compose --project-name=valhalla-ext --project-directory=../ -f ./docker/docker-compose.ext.yml up -d
