#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function test_all () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFPATH="$(readlink -m -- "$BASH_SOURCE"/..)"
  cd -- "$SELFPATH" || return $?

  ./why/why.sh || return $?
  NON_ERR='undef' expect_fail non-error.js \
    'Error: unhandledRejection is not an object: "undefined"' || return $?
  NON_ERR='false' expect_fail non-error.js \
    'Error: unhandledRejection is not an object: "false"'  || return $?
  NON_ERR='0bj' expect_fail non-error.js \
    'toString() threw exception' || return $?

  echo "+OK all tests passed."
}


function expect_fail () {
  local SCRIPT="$1"; shift
  echo -n "$FUNCNAME: $SCRIPT … "
  local RV= OUTPUT=
  OUTPUT="$(nodejs -- "$SCRIPT" 2>&1)"; RV=$?
  [ "$RV" == 0 ] && return 3$(echo "E: $FUNCNAME: $SCRIPT rv=0" >&2)
  local EXPECT=
  for EXPECT in "$@"; do
    [[ "$OUTPUT" == *"$EXPECT"* ]] && continue
    echo "E: $FUNCNAME: $SCRIPT output didn't contain '$EXPECT'" >&2
    echo $'D: Actual output:\nD: '"${OUTPUT//$'\n'/$'\nD: '}"
    return 3
  done
  echo "passed."
}










[ "$1" == --lib ] && return 0; test_all "$@"; exit $?
