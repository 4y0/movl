# Personal project scaffolder

Simple (quicker) alt to using Yeoman. (Personal opinion)

What does it do?

You can use movl to quickly scaffold 'freely' available seed projects (that are sometimes not available on generators). Instead of git cloning / copy pasting everytime you need to use a seed project, you can just `movl -a 'em`.

## How to use

`npm install -g movl`

### Download a seed so you can re-use it later
`movl -d https://github.com/btford/angular-express-seed/archive/master.zip`

### List saved seeds (Defaults to 5 per page)
`movl -l [perpage]`
```
[ 0  ] *** angular-express-seed.zip
[ 1  ] *** morx-web.zip
[ 2  ] *** ui-router-seed.zip
```

0, 1 and 2 in the above are referred to as seed IDs / Indexes. Use them when scaffolding a seed project.

### To Scaffold Seed project
`movl -a [ID/Index of seed to scaffold]`


If you get an `EACCES` error when running `movl -d githubprojectzipurl` try running with admin rights.

Contributions are welcome :) 

.. Add issues [here](https://github.com/4y0/movl/issues)
