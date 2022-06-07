# Minecraft server

I created this project to test the performance of the [Minecraft server](https://minecraft.fandom.com/wiki/Tutorials/Setting_up_a_server) depending on the amount of available resources and the number of logged-in users.
In the project, I also wanted to learn how to use [terraform CDK](https://www.terraform.io/cdktf) to manage the infrastructure using [TypeScript](https://www.typescriptlang.org/).

# Display docker statistics

- `docker stats` - The command returns a live data stream for running containers.

# RCON

A Minecraft server created from the `itzg/minecraft-server` image allows [RCON](https://wiki.vg/RCON) by default. For more information on using RCON to run commands, click [here](https://github.com/itzg/docker-minecraft-server#interacting-with-the-server).

# Random notes

- The Minecraft server configuration is stored in the `server.properties` file. If I want to edit the default configuration then I will probably have to stop the server, edit the `server.properties` file and start the server again.
- There is a chance that I may want a whitelist on the server. Information on how I can set up a whitelist can be found [here](https://github.com/itzg/docker-minecraft-server#whitelist-players), and the minecraft username to uuid converter can be found [here](https://mcuuid.net/).

# Resources

- [Documentation of Minecraft server properties for the Java edition.](https://minecraft.fandom.com/wiki/Server.properties#Java_Edition_2)
- [Introduction to CDK from hashicorp.](https://learn.hashicorp.com/tutorials/terraform/cdktf-install?in=terraform/cdktf)
- [List of NPM packages for various terraform providers.](https://www.npmjs.com/search?q=keywords:cdktf)
- [The official documentation of the `itzg/minecraft-server` image.](https://github.com/itzg/docker-minecraft-server)
- [Tutorial from Oracle how to generate SSH key-pairs.](https://docs.oracle.com/en/cloud/cloud-at-customer/occ-get-started/generate-ssh-key-pair.html)
- [Tutorial showing how to install docker on EC2.](https://www.cyberciti.biz/faq/how-to-install-docker-on-amazon-linux-2/)
