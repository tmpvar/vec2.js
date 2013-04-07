#! /usr/bin/env bash

DIR=$PWD
_DIR=/tmp/vec2-benchmark

BRANCH=$1
if [ x$BRANCH = x ]; then
  BRANCH=master
fi

echo ----------------------------------
echo running benchmark against: $BRANCH
date
echo ----------------------------------
# setup benchmark env
{
  cd /tmp
  rm -rf vec2-benchmark
  git clone $DIR vec2-benchmark
  cd $_DIR
  git pull $DIR $BRANCH -f
  git checkout $BRANCH -f
  cp -r $DIR/test/bench/*.js $_DIR/test/bench/
} > /dev/null 2> /dev/null

# install if necessary
npm install --noreg

# run benchmarks

cd $DIR/test/bench

for BENCH in *.js; do

  echo --- $BENCH -------------
  echo
  echo $BRANCH
  node $_DIR/test/bench/$BENCH

  echo TEST
  node $DIR/test/bench/$BENCH

  echo

done
