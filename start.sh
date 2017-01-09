#!/usr/bin/env bash
cat motb.txt
cd client/ ; npm start & cd ../mock-api/ ; npm run local & cd ../server/ ; npm run local
