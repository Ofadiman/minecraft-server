TERRAFORM_CDK_VERSION := $(shell cdktf --version)

terraform/version:
	@echo "Installed cloud development kit version is ${TERRAFORM_CDK_VERSION}."

terraform/deploy:
	@clear
	@aws-vault exec ofadiman -- cdktf deploy

terraform/destroy:
	@clear
	@aws-vault exec ofadiman -- cdktf destroy

aws/ssh_into_ec2:
	@ssh -i ./public_ec2_rsa ec2-user@63.33.195.92

docker/up:
	@docker-compose up -d --build
	@docker-compose logs -f minecraft

docker/down:
	@docker-compose down

docker/logs:
	@docker-compose logs -f minecraft

docker/stop:
	@docker-compose stop
