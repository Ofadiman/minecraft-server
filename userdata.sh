#!/usr/bin/env sh

yum update -y
yum search docker
yum info docker
yum install docker -y
usermod -a -G docker ec2-user
systemctl enable docker.service
systemctl start docker.service
docker pull sirplexus/minecraft-server-standalone:1.18.2
docker container create --publish 25565:25565/tcp --name "minecraft" --env RAM=7G sirplexus/minecraft-server-standalone:1.18.2
docker container start minecraft
