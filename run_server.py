import paramiko
import os

# SSH credentials and commands
hostname = '192.168.1.2'
username = 'root'
password = input('Please enter password: ')
current_script_path = os.path.abspath(__file__)
script_directory = os.path.dirname(current_script_path)
folder_name = os.path.basename(script_directory)
commands = [
    # 'nohup python3 /root/Docker/divyansh_website/manage.py runserver 192.168.110.14:1111',
    f'sudo docker-compose -f /root/Docker/{folder_name}/docker-compose.yml down', 
    f'sudo docker-compose -f /root/Docker/{folder_name}/docker-compose.yml up -d --build'
]

# Establish SSH connection
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    ssh.connect(hostname, username=username, password=password)

    # Execute commands
    for command in commands:
        stdin, stdout, stderr = ssh.exec_command(command)
        print(f"Command: {command}")
        print(f"Output:\n{stdout.read().decode('utf-8')}")
        print(f"Errors:\n{stderr.read().decode('utf-8')}")

finally:
    # Close SSH connection
    ssh.close()

#   pkill -f "python3 /root/Docker/divyansh_website/manage.py runserver 192.168.110.14:1111"