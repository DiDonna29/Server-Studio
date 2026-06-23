
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
              { name: 'options', label: 'Options', type: 'select', options: ['default', '-l', '-a', '-la', '-lh', '-R'], defaultValue: '-la' },
              { name: 'path', label: 'Path', type: 'text', placeholder: '.', defaultValue: '' }
            ]
          },
          {
            id: 'cp',
            label: 'Copy Files',
            description: 'Copy files or directories from source to destination.',
            syntax: 'cp {options} {source} {destination}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['default', '-r', '-v', '-p', '-i', '-u'], defaultValue: '-r' },
              { name: 'source', label: 'Source', type: 'text', placeholder: 'file.txt' },
              { name: 'destination', label: 'Destination', type: 'text', placeholder: '/path/to/dest' }
            ]
          },
          {
            id: 'find',
            label: 'Find Files',
            description: 'Search for files in a directory hierarchy.',
            syntax: 'find {path} -name "{pattern}" {options}',
            parameters: [
              { name: 'path', label: 'Path', type: 'text', defaultValue: '.' },
              { name: 'pattern', label: 'Pattern', type: 'text', placeholder: '*.txt' },
              { name: 'options', label: 'Extra Options', type: 'select', options: ['default', '-type f', '-type d', '-empty', '-mtime -7'], defaultValue: 'default' }
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
            id: 'top',
            label: 'Process Monitor',
            description: 'Display Linux processes and system resource usage.',
            syntax: 'top {options}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['default', '-u root', '-p 1', '-n 1', '-b'], defaultValue: 'default' }
            ]
          },
          {
            id: 'journalctl',
            label: 'System Logs',
            description: 'Query and display logs from journald.',
            syntax: 'journalctl {options}',
            parameters: [
              { name: 'options', label: 'Filter', type: 'select', options: ['default', '-u nginx', '-f', '-n 100', '-p err', '--since "1 hour ago"'], defaultValue: '-n 100' }
            ]
          }
        ]
      },
      {
        name: 'Networking',
        icon: 'Network',
        commands: [
          {
            id: 'ssh',
            label: 'SSH Connect',
            description: 'Secure Shell remote login client.',
            syntax: 'ssh {user}@{host} {options}',
            parameters: [
              { name: 'user', label: 'User', type: 'text', defaultValue: 'root' },
              { name: 'host', label: 'Host', type: 'text', placeholder: '1.2.3.4' },
              { name: 'options', label: 'Port/Key', type: 'select', options: ['default', '-p 22', '-i ~/.ssh/id_rsa', '-v', '-C'], defaultValue: 'default' }
            ]
          },
          {
            id: 'netstat',
            label: 'Network Statistics',
            description: 'Print network connections, routing tables, and interface statistics.',
            syntax: 'netstat {options}',
            parameters: [
              { name: 'options', label: 'Filter', type: 'select', options: ['-tulpn', '-an', '-r', '-i'], defaultValue: '-tulpn' }
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
            label: 'IP Config',
            description: 'Displays all current TCP/IP network configuration values.',
            syntax: 'ipconfig {option}',
            parameters: [
              { name: 'option', label: 'Option', type: 'select', options: ['default', '/all', '/release', '/renew', '/flushdns'], defaultValue: '/all' }
            ]
          },
          {
            id: 'ping',
            label: 'Ping Host',
            description: 'Verify connectivity to a remote host.',
            syntax: 'ping {host} {options}',
            parameters: [
              { name: 'host', label: 'Host', type: 'text', defaultValue: '8.8.8.8' },
              { name: 'options', label: 'Options', type: 'select', options: ['default', '-t', '-n 10', '-l 64', '-4'], defaultValue: 'default' }
            ]
          }
        ]
      },
      {
        name: 'System',
        icon: 'Cpu',
        commands: [
          {
            id: 'tasklist',
            label: 'Task List',
            description: 'Displays a list of currently running processes.',
            syntax: 'tasklist {filter}',
            parameters: [
              { name: 'filter', label: 'Filter', type: 'select', options: ['default', '/v', '/svc', '/apps'], defaultValue: 'default' }
            ]
          },
          {
            id: 'sfc',
            label: 'File Checker',
            description: 'Scans and verifies the integrity of all protected system files.',
            syntax: 'sfc /scannow',
            parameters: []
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
        name: 'Package Manager',
        icon: 'Database',
        commands: [
          {
            id: 'brew',
            label: 'Homebrew',
            description: 'Install and manage packages on macOS.',
            syntax: 'brew {action} {package}',
            parameters: [
              { name: 'action', label: 'Action', type: 'select', options: ['install', 'uninstall', 'update', 'upgrade', 'list', 'info'], defaultValue: 'install' },
              { name: 'package', label: 'Package', type: 'text', placeholder: 'node' }
            ]
          }
        ]
      },
      {
        name: 'Utilities',
        icon: 'Terminal',
        commands: [
          {
            id: 'diskutil',
            label: 'Disk Utility',
            description: 'Manage disks and volumes.',
            syntax: 'diskutil {action} {target}',
            parameters: [
              { name: 'action', label: 'Action', type: 'select', options: ['list', 'info', 'verifyDisk', 'repairDisk'], defaultValue: 'list' },
              { name: 'target', label: 'Disk ID', type: 'text', placeholder: '/dev/disk0' }
            ]
          },
          {
            id: 'networksetup',
            label: 'Network Setup',
            description: 'Configuration tool for network settings.',
            syntax: 'networksetup -{action} {interface}',
            parameters: [
              { name: 'action', label: 'Action', type: 'select', options: ['listallnetworkservices', 'getinfo', 'getairportnetwork'], defaultValue: 'listallnetworkservices' },
              { name: 'interface', label: 'Interface', type: 'text', placeholder: 'Wi-Fi' }
            ]
          }
        ]
      }
    ]
  }
];
