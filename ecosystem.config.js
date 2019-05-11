module.exports = {
    apps: [{
      name: 'team-member-management',
      script: './src/index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-34-203-244-233.compute-1.amazonaws.com',
        key: '~/.ssh/tutorial.pem',
        ref: 'origin/develop',
        repo: 'git@github.com:kumar-rahul/team-member-management.git',
        path: '/home/ubuntu/team-member-management',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }