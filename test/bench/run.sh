#! /usr/bin/env bash

DIR=$PWD
_DIR=/tmp/vec2-benchmark

BRANCH=$1
if [ x$BRANCH = x ]; then
  BRANCH=master
fi

echo running benchmark against: $BRANCH

# setup benchmark env
{
  cd /tmp
  git clone $DIR vec2-benchmark
  cd $_DIR
  git pull $DIR benchmark
  git checkout benchmark
} > /dev/null 2> /dev/null

# install if necessary
npm install

# run benchmarks

cd $DIR/test/bench

for BENCH in *.js; do

echo master / $BENCH
node $_DIR/test/bench/$BENCH

echo test / $BENCH
node $DIR/test/bench/$BENCH

done
