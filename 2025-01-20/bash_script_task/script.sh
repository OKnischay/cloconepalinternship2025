#!/bin/bash

# Task 1: Directory Management
echo -e "\n"
echo "Creating 'project_files' directory in /home directory."
mkdir --verbose ~/project_files
echo -e "=====================================================================\n\n"
#--verbose with mkdir will display message confirming the creation of directory

#Task 2: User and Group Management
echo "Creating 'developers' group."
sudo groupadd developers
echo -e "\n"
echo "Creating 'intern_user' user"
sudo useradd intern_user
echo -e "\n"

sudo usermod -aG developers intern_user
echo "Added intern_user to developers group"
#usermod cmd is used to modify user. -a is for append(adds user without removing them from any existing groups, -G specifies which group to add.) 
echo -e "\n"
sudo passwd intern_user
#passwd cmd is used to change user's password
echo -e "=====================================================================\n\n"

#Task 3: Permission and Ownership
sudo chown -v intern_user ~/project_files
sudo chgrp -v developers ~/project_files
echo -e "\n"
echo "Changed the ownership of 'project_files' directory to 'intern_user' and group to 'developers'"
#we can also change the group by sudo chown :developers project_files command

echo -e "\n"
echo "Setting permission of project_files"
sudo chmod 750 ~/project_files
#750 is 7 is for owner who has all the permission i.e 111(rwx), 5 is for group who has 101(rwx), and other have no permission i.e 0
echo -e "======================================================================\n\n"
echo -e "\n"


#Task 4: Additional Tasks
sudo touch ~/project_files/welcome.txt
echo "Created welcome.txt inside the 'project_files' successfully"
echo -e "\n"

sudo chmod -v 644 ~/project_files/welcome.txt
echo "Updated permission for welcome.txt"
#644 means owner,group and other with access to rw-,r--,and r-- 
echo -e "\n"

sudo chown -v intern_user ~/project_files/welcome.txt
echo "Changed the ownership of welcome.txt to intern_user"
echo -e "\n"
sudo chgrp -v developers ~/project_files/welcome.txt
echo "Changed the group ownership of welcome.txt to developers"
#Add creation date and time of welcome.txt
echo -e "\n"
echo "Creation time:" $(date) | sudo tee -a ~/project_files/welcome.txt

#Add directory path
echo "Directory path:" ~/project_files/welcome.txt | sudo tee -a ~/project_files/welcome.txt

#Add owner and group information
echo "Owner and group information:" $(sudo ls -l ~/project_files | grep "welcome.txt") | sudo tee -a ~/project_files/welcome.txt
echo -e "\n"
echo -e "======================================================================\n\n"

echo -e "\n"
#Task 5: Verification
ls -ld ~/project_files
echo "Verified the directory creation and permission."
echo -e "\n"

id intern_user
echo "Verified user creation and group membership."
echo -e "\n"

sudo cat ~/project_files/welcome.txt
echo "Verified file creation and its contents."

