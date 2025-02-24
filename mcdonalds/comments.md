## Running seed.ts

To populate the initial database, we created a seed.ts file, inside the prisma folder, and in order to execute this, we
need to install the ts-node library, which is a library that executes typescript files.

After the installation, we create a new script in our package.json, here we'll name it "prisma" with the content of
"prisma": {
"seed": "ts-node ./prisma/seed.ts"
}

Now, by running "npx prisma db seed", this is the script it will look for
