import subprocess
import os

# Get the absolute path of the current script
current_script_path = os.path.abspath(__file__)

# Get the directory of the script (excluding the file name)
script_directory = os.path.dirname(current_script_path)

# Define the source folder on your local machine
folder_name = os.path.basename(script_directory)
print("Copying to folder : ", folder_name)
source_folder = os.path.dirname(current_script_path)

# Define the destination folder on the remote server
destination_folder = 'root@192.168.1.2:/root/Docker'

# Build the `rsync` command
rsync_command = f'rsync -av --delete {source_folder} {destination_folder}'

try:
    # Execute the `rsync` command
    subprocess.run(rsync_command, shell=True, check=True)
    print("Folder copied successfully.")
except subprocess.CalledProcessError as e:
    print(f"Error copying folder: {e}")


# code to run server in back ground
# nohup python3 manage.py runserver 192.168.110.14:1111

#to shutdown server 
# pkill -f "python3 manage.py runserver 192.168.110.14:1111"