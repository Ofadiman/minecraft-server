TERRAFORM_CDK_VERSION := $(shell cdktf --version)

version:
	@echo "Installed cloud development kit version is ${TERRAFORM_CDK_VERSION}."

deploy:
	@aws-vault exec ofadiman -- cdktf deploy

destroy:
	@aws-vault exec ofadiman -- cdktf destroy

ssh_into_ec2:
	@ssh -i ./public_ec2_rsa ec2-user@ec2-54-73-21-42.eu-west-1.compute.amazonaws.com
