## Vindow API

Present code is a proposal of how to tackle the technical assessment for the backend position. 

## Install requirements 

- npm 9.5.1
- pnpm 7.17.0 (app uses pnpm as package manager)
- docker (for running image and compose)
- mongodb version v6.0.6

### Before running 

For running the application properly without any errors, there're a couple of environment variables needed previously, provided at `.env.sample`. Please don't hesitate reaching out for such values.

Also, for other tasks such as deploying the application through `aws-cdk`, you'd need an aws username (`AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`) configured correctly within your cli.

### How to run:

For running it locally, you need to have at least a `mongodb community` edition installed, and running on its default port. 

Once mongo is running locally, you'd need for consistency and running tests, to run the script `pnpm run db:seed`, which will load the database with initial data for testing purposes. 

Finally, you can run `pnpm run start:dev` which will start the development server in watch mode. 

------

Alternatively, prefered way is to build the docker image and run docker compose, which will run the server and mongodb inside a docker image.

From the root directory, run: 

```bash
docker image build .
docker compose up
```

### Testing 

For running the whole test suites, run: 
`pnpm run tests`

### Swagger (OPEN API)

For quick glimpse of endpoints and its documentation, please make sure the server is running and then access to the `{serverUrl}:/api` endpoint.

### CDK 

* Please make sure to have a proper user with permissions set on your CLI before running.

AWS CDK is used to deploy the application as an Elastic Beanstalk app. In order to run it make sure to already have a CDKToolkit created on CloudFormation. If not, please run `cdk bootstrap` before everything. 

In order to deploy the application with the latest changes, please run the following: 

```bash 
pnpm run zip // will compress the app
cdk synth // checks previously if the cloudformation template is ok, if not errors will arise here, similar to a build process
cdk deploy
```

That should deploy a new version of the elastic beanstalk application. 

## License

Nest is [MIT licensed](LICENSE).
