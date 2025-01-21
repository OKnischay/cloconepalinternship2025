# Task 2: Intro to Cron Jobs - System Monitoring Task

# Objective:
 -To create a simple script to monitor system processes and learn how to automate tasks using cron jobs.

## Task done

### 1. Created a bash script that:
 - Listed the top 5 processes using the most system resources 
 - Saved the output with a timestamp using `date` command to a log file

### 2. Set up a cron job to:
 - Edited the crontab using 'crontab -e'
 - Added cronjob to run the script every 5 minutes
```
*/5 * * * * $FILE_PATH/cronscript.sh >> $FILE_PATH/cronlog.log 2>&1
```
 - `2>&1`: stores both access logs and error logs in same log file
 
### 3. Ensured the the shell script file has access to execute
 - Executed ```chmod +x cronscript.sh``` to add executable access
 - Restart the cron service ```sudo service cron restart```
 - Check status using ```sudo service cron status```

