# Minecraft server

I created this project to test the performance of the [Minecraft server](https://minecraft.fandom.com/wiki/Tutorials/Setting_up_a_server) depending on the amount of available resources and the number of logged-in users.
In the project, I also wanted to learn how to use [terraform CDK](https://www.terraform.io/cdktf) to manage the infrastructure using [TypeScript](https://www.typescriptlang.org/).

# Steps to install docker

1. `sudo yum update`
2. `sudo yum search docker`
3. `sudo yum info docker`
4. `sudo yum install docker`
5. `sudo usermod -a -G docker ec2-user`
6. `sudo systemctl enable docker.service`
7. `sudo systemctl start docker.service`

# Display docker statistics

- `docker stats` - The command returns a live data stream for running containers.

# Resources

- [Introduction to CDK from hashicorp.](https://learn.hashicorp.com/tutorials/terraform/cdktf-install?in=terraform/cdktf)
- [List of NPM packages for various terraform providers.](https://www.npmjs.com/search?q=keywords:cdktf)
- [Tutorial from Oracle how to generate SSH key-pairs.](https://docs.oracle.com/en/cloud/cloud-at-customer/occ-get-started/generate-ssh-key-pair.html)
- [Tutorial showing how to install docker on EC2.](https://www.cyberciti.biz/faq/how-to-install-docker-on-amazon-linux-2/)
