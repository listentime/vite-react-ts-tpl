#!/bin/bash
if $PREINSTALL_ENV
 then 
  npx -y only-allow npm
else 
  npx -y only-allow pnpm
fi