#!/bin/bash

# Get the current timestamp
timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Update the last-updated-topics.json file
echo "{\"lastUpdatedTopics\": \"$timestamp\"}" > ../data/last-updated-topics.json

# Debug: Confirm file update
cat ../data/last-updated-topics.json
