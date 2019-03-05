#!/bin/bash
clear
SCRIPT_PATH=$0
function set_current_working_dir() {
  cd "$(dirname "$(realpath $SCRIPT_PATH)")/../$1";
}

set_current_working_dir "back-end"
npm run start
cd ..