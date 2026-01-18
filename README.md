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