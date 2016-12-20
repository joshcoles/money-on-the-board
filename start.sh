#!/usr/bin/env bash

cd client/ ; npm start & cd ../mock-api/ ; npm run local & cd ../server/ ; npm run local
