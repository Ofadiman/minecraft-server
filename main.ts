import { Construct } from 'constructs'
import { App, TerraformOutput, TerraformStack, LocalBackend } from 'cdktf'
import { AwsProvider, ec2, vpc } from '@cdktf/provider-aws'
import * as fs from 'fs'

class MinecraftServerStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name)

    new AwsProvider(this, 'aws', {
      region: 'eu-west-1',
      defaultTags: {
        tags: {
          Environment: 'staging',
          Iac: 'terraform',
          Owner: 'ofadiman',
          Project: 'minecraft_server',
        },
      },
    })

    const virtualPrivateCloud = new vpc.Vpc(this, 'minecraft_server_vpc', {
      cidrBlock: '10.0.0.0/16',
      enableDnsHostnames: true,
      enableDnsSupport: true,
    })

    const publicSubnet = new vpc.Subnet(this, 'minecraft_server_public_subnet', {
      vpcId: virtualPrivateCloud.id,
      cidrBlock: '10.0.0.0/24',
      availabilityZone: 'eu-west-1a',
      mapPublicIpOnLaunch: true,
    })

    const internetGateway = new vpc.InternetGateway(this, 'minecraft_server_internet_gateway', {
      vpcId: virtualPrivateCloud.id,
    })

    const routeTable = new vpc.RouteTable(this, 'minecraft_server_route_table', {
      vpcId: virtualPrivateCloud.id,
      route: [
        {
          cidrBlock: '0.0.0.0/0',
          gatewayId: internetGateway.id,
        },
      ],
    })

    new vpc.RouteTableAssociation(this, 'minecraft_server_route_table_association', {
      routeTableId: routeTable.id,
      subnetId: publicSubnet.id,
    })

    const securityGroup = new vpc.SecurityGroup(this, 'minecraft_server_security_group', {
      name: 'allow_access_to_minecraft_server',
      vpcId: virtualPrivateCloud.id,
      ingress: [
        {
          cidrBlocks: ['0.0.0.0/0'],
          fromPort: 22,
          protocol: 'tcp',
          toPort: 22,
          description: 'Allow SSH access.',
        },
        {
          cidrBlocks: ['0.0.0.0/0'],
          fromPort: 25565,
          protocol: 'tcp',
          toPort: 25565,
          description: 'Allow access to the minecraft server port itself.',
        },
      ],
      egress: [
        {
          cidrBlocks: ['0.0.0.0/0'],
          fromPort: 0,
          protocol: '-1',
          toPort: 0,
          description: 'Allow all egress traffic.',
        },
      ],
    })

    const publicKey = fs.readFileSync('./public_ec2_rsa.pub', { encoding: 'utf-8' })
    const sshKeyPair = new ec2.KeyPair(this, 'minecraft_server_key_pair', {
      keyName: 'ssh_key_for_minecraft_server',
      publicKey: publicKey,
      tags: {},
    })

    const userData = fs.readFileSync('./userdata.sh', 'utf-8')
    const instance = new ec2.Instance(this, 'minecraft_server_ec2_instance', {
      ami: 'ami-0c1bc246476a5572b',
      associatePublicIpAddress: true,
      instanceType: 'c5.xlarge',
      keyName: sshKeyPair.keyName,
      subnetId: publicSubnet.id,
      tags: {},
      vpcSecurityGroupIds: [securityGroup.id],
      userData: userData,
    })

    new TerraformOutput(this, 'public_ip', {
      value: instance.publicIp,
    })
  }
}

const app = new App()
const stack = new MinecraftServerStack(app, 'infrastructure')

new LocalBackend(stack)

app.synth()
