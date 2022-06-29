#!/usr/bin/env bash
dir=`realpath $(dirname "$0")`
cp -R ./node_modules/pareto-ts-validator/data/projectTemplate/. .. \

#npm messes with .gitignore, that's why I need to handle it separately
cp ./node_modules/pareto-ts-validator/data/gitignore ../.gitignore \

parts=("lib" "api" "bin")
for part in "${parts[@]}"
do
    if [ -d ../$part ]
    then
        cp ./node_modules/pareto-ts-validator/data/tsconfig.json ../$part
        cp ./node_modules/pareto-ts-validator/data/_globals.ts ../$part/src
    fi

done

#update this package because the copied package.json contains an old version of pareto-ts-validator (by design, the template is not updated every time the package is published)
$dir/updatePackage.sh .
