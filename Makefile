TERRAFORM_CDK_VERSION := $(shell cdktf --version)

version:
	@echo "Installed cloud development kit version is ${TERRAFORM_CDK_VERSION}."

deploy:
	@clear
	@aws-vault exec ofadiman -- cdktf deploy

destroy:
	@clear
	@aws-vault exec ofadiman -- cdktf destroy

ssh_into_ec2:
	@ssh -i ./public_ec2_rsa ec2-user@63.33.195.92
