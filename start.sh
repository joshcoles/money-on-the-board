#!/usr/bin/env bash

cd client/ ; webpack -w & npm start & cd ../mock-api/ ; npm run local & cd ../server/ ; npm run local
