# README

## Objective
Create a shell script that demonstrates basic system administration tasks in Linux using shell commands.

## Requirements

### Task 1: Directory Management
- Created a new directory named `project_files` in the `/home` directory.
  - Used the `mkdir` command with the `--verbose` option to confirm creation.

### Task 2: User and Group Management
- Created a new group named `developers` using the `groupadd` command.
- Created a new user named `intern_user` using the `useradd` command.
- Added `intern_user` to the `developers` group using the `usermod` command with the `-aG` option.
- Set an appropriate password for `intern_user` using the `passwd` command.

### Task 3: Permissions and Ownership
- Changed ownership of the `project_files` directory to `intern_user` using the `chown` command.
- Changed group ownership of the `project_files` directory to `developers` using the `chgrp` command.
- Set directory permissions to `750` using the `chmod` command:
  - Owner: Read, write, and execute.
  - Group: Read and execute.
  - Others: No permissions.

### Task 4: Additional Tasks
- Created a `welcome.txt` file inside the `project_files` directory using the `touch` command.
- Updated permissions for `welcome.txt` to `644`:
  - Owner: Read and write.
  - Group: Read-only.
  - Others: Read-only.
- Changed ownership of `welcome.txt` to `intern_user` and group ownership to `developers`.
- Added the following information to `welcome.txt`:
  - **Creation date and time**: Retrieved using the `date` command.
  - **Directory path**: Manually specified as `/home/project_files`.
  - **Owner and group information**: Retrieved using the `ls -l` command and appended to the file.

### Task 5: Verification
- Verified the directory creation and permissions using the `ls -ld` command:
  ```bash
  ls -ld ~/project_files
  drwxr-x--- 2 intern_user developers 4096 [Insert Date and Time] /home/project_files
  ```
- Verified user creation and group membership using the `id` command:
  ```bash
  id intern_user
  uid=1001(intern_user) gid=1001(intern_user) groups=1001(intern_user),1002(developers)
  ```
- Verified file creation and contents using the `cat` command:
  ```bash
  cat ~/project_files/welcome.txt
  Welcome File
  Creation Date: [Insert Date and Time]
  Directory Path: /home/project_files
  Owner: intern_user
  Group: developers
  ```

