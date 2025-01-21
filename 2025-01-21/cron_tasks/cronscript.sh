#!/bin/bash
echo -e "\n"
echo "These are the top 5 processes which consumes the most resources"
#TO PRINT THE TIMESTAMP
echo "TIMESTAMP :$(date)"

echo "======================================================"
#THIS WILL SHOW THE 5 PROCESSES WHICH CONSUME THE MOST RESOURCES 
ps -eo pid,ppid,cmd,%cpu,%mem --sort=-%cpu | head -n 6 
echo "======================================================"
