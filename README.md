```sh
# must have pnpm installed
git clone <repo>
cd <repo>

pnpm i # install all dependencies

pnpx nx serve platform # will need to log in to Zephyr Cloud as part of this process.
# Might have to repeat the above step for it to work
# navigating to localhost:4200 should work now
# but you might have to be patient...can take several minutes depending on your computer

# make .env file in api-gateway and copy .env.example contents into it
pnpx nx serve api-gateway
# navigate to localhost:3001 should work 

```

Occasionally, the port for one of the MFEs does not get freed up correctly. Try using this command in the terminal (e.g. port 4202 already in use):

`lsof -ti:4202 | xargs kill -9 2>/dev/null || echo "No process found on port 4202"`