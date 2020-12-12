Author: ShivKumarSaini
# Server:
## Run in development mode:
    
    1. Use 'VdoServer' launch profile.
    2. Dynamic configuration values can be changed in directory 'config' inside server root.


# Client:
## Run in development mode:
    1. This will first build the client application with environment described in environments/.env.development file and then will host the build.

`npm run start:development`

    2. Similarly, can be done for production environment with below command:
   
`npm run start:production`

    3. Dynamic configuration values can be changed in directory 'environments' inside client root.