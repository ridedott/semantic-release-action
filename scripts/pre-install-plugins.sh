#!/usr/bin/env sh

SCRIPTS_PATH="$(cd "$(dirname "${0}")" >/dev/null 2>&1 && pwd)"
ROOT_PATH="$(dirname ${SCRIPTS_PATH})"

echo $ROOT_PATH
echo $SCRIPTS_PATH

cd "${ROOT_PATH}"

if [[ ! -f CHANGELOG.md ]] ; then
  echo 'CHANGELOG.md not found, aborting.'
  exit
fi

npm install \
@semantic-release/changelog \
@semantic-release/commit-analyzer \
@semantic-release/exec \
@semantic-release/git \
@semantic-release/npm \
@semantic-release/release-notes-generator
