
export type Parameter = {
  name: string;
  label: string;
  type: 'text' | 'select' | 'number';
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
};

export type CommandDefinition = {
  id: string;
  label: string;
  description: string;
  syntax: string;
  parameters: Parameter[];
};

export type Category = {
  name: string;
  icon: string;
  commands: CommandDefinition[];
};

export type OSData = {
  id: 'linux' | 'windows' | 'macos';
  name: string;
  categories: Category[];
};

export const COMMANDS_BY_OS: OSData[] = [
  {
    id: 'linux',
    name: 'Linux',
    categories: [
      {
        name: 'File Management',
        icon: 'Files',
        commands: [
          {
            id: 'ls',
            label: 'List Directory',
            description: 'List information about files in the current directory.',
            syntax: 'ls {options} {path}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['', '-l', '-a', '-la', '-lh', '-R'], defaultValue: '-la' },
              { name: 'path', label: 'Path', type: 'text', placeholder: '.', defaultValue: '' }
            ]
          },
          {
            id: 'cp',
            label: 'Copy Files',
            description: 'Copy files or directories from source to destination.',
            syntax: 'cp {options} {source} {destination}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['', '-r', '-v', '-p', '-i', '-u'], defaultValue: '-r' },
              { name: 'source', label: 'Source', type: 'text', placeholder: 'file.txt' },
              { name: 'destination', label: 'Destination', type: 'text', placeholder: '/path/to/dest' }
            ]
          },
          {
            id: 'chmod',
            label: 'Change Permissions',
            description: 'Change the access permissions of a file or directory.',
            syntax: 'chmod {permissions} {path}',
            parameters: [
              { name: 'permissions', label: 'Mode', type: 'select', options: ['777', '755', '644', '600', '+x', '-x', 'u+s'], defaultValue: '755' },
              { name: 'path', label: 'File/Dir', type: 'text', placeholder: 'script.sh' }
            ]
          },
          {
            id: 'mkdir',
            label: 'Create Directory',
            description: 'Create one or more directories.',
            syntax: 'mkdir {options} {name}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['', '-p', '-v', '-m 755'], defaultValue: '-p' },
              { name: 'name', label: 'Directory Name', type: 'text', placeholder: 'my_new_folder' }
            ]
          }
        ]
      },
      {
        name: 'System Control',
        icon: 'Cpu',
        commands: [
          {
            id: 'systemctl',
            label: 'System Services',
            description: 'Control the systemd system and service manager.',
            syntax: 'sudo systemctl {action} {service}',
            parameters: [
              { name: 'action', label: 'Action', type: 'select', options: ['start', 'stop', 'restart', 'status', 'enable', 'disable', 'daemon-reload'], defaultValue: 'status' },
              { name: 'service', label: 'Service Name', type: 'text', placeholder: 'nginx' }
            ]
          },
          {
            id: 'df',
            label: 'Disk Usage',
            description: 'Display the amount of disk space used and available.',
            syntax: 'df {options}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['-h', '-T', '-i', '--total'], defaultValue: '-h' }
            ]
          },
          {
            id: 'free',
            label: 'Memory Info',
            description: 'Display amount of free and used memory in the system.',
            syntax: 'free {options}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['-m', '-g', '-h', '-s 5'], defaultValue: '-h' }
            ]
          }
        ]
      },
      {
        name: 'Network & Connectivity',
        icon: 'Network',
        commands: [
          {
            id: 'ssh',
            label: 'SSH Connect',
            description: 'Open-source implementation of the Secure Shell protocol.',
            syntax: 'ssh {user}@{host} {options}',
            parameters: [
              { name: 'user', label: 'User', type: 'text', placeholder: 'root' },
              { name: 'host', label: 'Host/IP', type: 'text', placeholder: '192.168.1.1' },
              { name: 'options', label: 'Options', type: 'select', options: ['', '-p 22', '-i key.pem', '-v'], defaultValue: '' }
            ]
          },
          {
            id: 'curl',
            label: 'HTTP Request',
            description: 'Transfer data from or to a server.',
            syntax: 'curl {options} {url}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['-L', '-v', '-O', '-I', '-X POST', '-H "Content-Type: application/json"'], defaultValue: '-L' },
              { name: 'url', label: 'URL', type: 'text', placeholder: 'https://api.example.com' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'windows',
    name: 'Windows',
    categories: [
      {
        name: 'Networking',
        icon: 'Network',
        commands: [
          {
            id: 'ipconfig',
            label: 'IP Configuration',
            description: 'Displays all current TCP/IP network configuration values.',
            syntax: 'ipconfig {option}',
            parameters: [
              { name: 'option', label: 'Option', type: 'select', options: ['', '/all', '/release', '/renew', '/flushdns', '/displaydns'], defaultValue: '/all' }
            ]
          },
          {
            id: 'ping',
            label: 'Ping Host',
            description: 'Sends ICMP Echo Request messages to verify connectivity.',
            syntax: 'ping {host} {options}',
            parameters: [
              { name: 'host', label: 'Hostname/IP', type: 'text', placeholder: 'google.com', defaultValue: '8.8.8.8' },
              { name: 'options', label: 'Options', type: 'select', options: ['', '-t', '-n 10', '-l 64', '-4', '-6'], defaultValue: '' }
            ]
          },
          {
            id: 'netstat',
            label: 'Network Stats',
            description: 'Displays active TCP connections, ports on which the computer is listening.',
            syntax: 'netstat {options}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['-a', '-n', '-o', '-an', '-p tcp', '-r'], defaultValue: '-an' }
            ]
          }
        ]
      },
      {
        name: 'Maintenance',
        icon: 'ShieldCheck',
        commands: [
          {
            id: 'sfc',
            label: 'System File Checker',
            description: 'Scans and verifies the integrity of all protected system files.',
            syntax: 'sfc /scannow',
            parameters: []
          },
          {
            id: 'chkdsk',
            label: 'Check Disk',
            description: 'Checks the file system and file system metadata of a volume for logical and physical errors.',
            syntax: 'chkdsk {drive} {options}',
            parameters: [
              { name: 'drive', label: 'Drive', type: 'text', placeholder: 'C:', defaultValue: 'C:' },
              { name: 'options', label: 'Options', type: 'select', options: ['', '/f', '/r', '/x'], defaultValue: '/f' }
            ]
          },
          {
            id: 'tasklist',
            label: 'List Processes',
            description: 'Displays a list of currently running processes.',
            syntax: 'tasklist {filter}',
            parameters: [
              { name: 'filter', label: 'Filter', type: 'text', placeholder: '/FI "MEMUSAGE gt 10000"' }
            ]
          }
        ]
      },
      {
        name: 'System Utilities',
        icon: 'Terminal',
        commands: [
          {
            id: 'systeminfo',
            label: 'System Info',
            description: 'Displays detailed configuration information about a computer and its operating system.',
            syntax: 'systeminfo',
            parameters: []
          },
          {
            id: 'gpupdate',
            label: 'Policy Update',
            description: 'Refreshes local and Active Directory-based Group Policy settings.',
            syntax: 'gpupdate {options}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['', '/force', '/wait:0'], defaultValue: '/force' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'macos',
    name: 'macOS',
    categories: [
      {
        name: 'Package Management',
        icon: 'Database',
        commands: [
          {
            id: 'brew',
            label: 'Homebrew',
            description: 'The missing package manager for macOS.',
            syntax: 'brew {action} {package}',
            parameters: [
              { name: 'action', label: 'Action', type: 'select', options: ['install', 'uninstall', 'update', 'upgrade', 'list', 'info', 'doctor'], defaultValue: 'install' },
              { name: 'package', label: 'Package Name', type: 'text', placeholder: 'node' }
            ]
          }
        ]
      },
      {
        name: 'System Utilities',
        icon: 'Terminal',
        commands: [
          {
            id: 'diskutil',
            label: 'Disk Utility',
            description: 'Modify, verify and repair local disks.',
            syntax: 'diskutil {action} {disk}',
            parameters: [
              { name: 'action', label: 'Action', type: 'select', options: ['list', 'info', 'verifyDisk', 'repairDisk', 'eject'], defaultValue: 'list' },
              { name: 'disk', label: 'Disk ID', type: 'text', placeholder: '/dev/disk1' }
            ]
          },
          {
            id: 'open',
            label: 'Open App/File',
            description: 'Opens a file, directory, or URL.',
            syntax: 'open {path} {options}',
            parameters: [
              { name: 'path', label: 'Path/URL', type: 'text', placeholder: 'https://google.com' },
              { name: 'options', label: 'Options', type: 'select', options: ['', '-a "Google Chrome"', '-e', '-R'], defaultValue: '' }
            ]
          },
          {
            id: 'say',
            label: 'Text to Speech',
            description: 'Converts text to audible speech.',
            syntax: 'say "{text}" -v {voice}',
            parameters: [
              { name: 'text', label: 'Message', type: 'text', placeholder: 'Hello world' },
              { name: 'voice', label: 'Voice', type: 'select', options: ['Alex', 'Samantha', 'Daniel', 'Victoria', 'Fred', 'Karen'], defaultValue: 'Samantha' }
            ]
          }
        ]
      },
      {
        name: 'Networking',
        icon: 'Network',
        commands: [
          {
            id: 'networksetup',
            label: 'Network Setup',
            description: 'Configuration tool for network settings.',
            syntax: 'networksetup -{action} {service}',
            parameters: [
              { name: 'action', label: 'Action', type: 'select', options: ['getairportnetwork', 'listallnetworkservices', 'getinfo', 'setdhcp'], defaultValue: 'getairportnetwork' },
              { name: 'service', label: 'Interface', type: 'text', placeholder: 'en0' }
            ]
          }
        ]
      }
    ]
  }
];
