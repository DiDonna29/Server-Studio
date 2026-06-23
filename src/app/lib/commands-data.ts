
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
              { name: 'options', label: 'Options', type: 'select', options: ['', '-l', '-a', '-la', '-h', '-R'], defaultValue: '-la' },
              { name: 'path', label: 'Path', type: 'text', placeholder: '.', defaultValue: '' }
            ]
          },
          {
            id: 'cp',
            label: 'Copy Files',
            description: 'Copy files or directories from source to destination.',
            syntax: 'cp {options} {source} {destination}',
            parameters: [
              { name: 'options', label: 'Options', type: 'select', options: ['', '-r', '-v', '-p', '-i'], defaultValue: '-r' },
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
              { name: 'permissions', label: 'Mode', type: 'select', options: ['777', '755', '644', '600', '+x', '-x'], defaultValue: '755' },
              { name: 'path', label: 'File/Dir', type: 'text', placeholder: 'script.sh' }
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
              { name: 'action', label: 'Action', type: 'select', options: ['start', 'stop', 'restart', 'status', 'enable', 'disable'], defaultValue: 'status' },
              { name: 'service', label: 'Service Name', type: 'text', placeholder: 'nginx' }
            ]
          },
          {
            id: 'top',
            label: 'Process Monitor',
            description: 'Display Linux processes in real-time.',
            syntax: 'top',
            parameters: []
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
              { name: 'option', label: 'Option', type: 'select', options: ['', '/all', '/release', '/renew', '/flushdns'], defaultValue: '/all' }
            ]
          },
          {
            id: 'ping',
            label: 'Ping Host',
            description: 'Sends ICMP Echo Request messages to verify connectivity.',
            syntax: 'ping {host} {options}',
            parameters: [
              { name: 'host', label: 'Hostname/IP', type: 'text', placeholder: 'google.com', defaultValue: '8.8.8.8' },
              { name: 'options', label: 'Options', type: 'select', options: ['', '-t', '-n 10', '-l 64'], defaultValue: '' }
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
            id: 'tasklist',
            label: 'List Processes',
            description: 'Displays a list of currently running processes.',
            syntax: 'tasklist {filter}',
            parameters: [
              { name: 'filter', label: 'Filter', type: 'text', placeholder: '/FI "MEMUSAGE gt 10000"' }
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
        name: 'Utilities',
        icon: 'Terminal',
        commands: [
          {
            id: 'brew',
            label: 'Homebrew Install',
            description: 'The missing package manager for macOS.',
            syntax: 'brew install {package}',
            parameters: [
              { name: 'package', label: 'Package Name', type: 'text', placeholder: 'node' }
            ]
          },
          {
            id: 'say',
            label: 'Text to Speech',
            description: 'Converts text to audible speech.',
            syntax: 'say "{text}" -v {voice}',
            parameters: [
              { name: 'text', label: 'Message', type: 'text', placeholder: 'Hello world' },
              { name: 'voice', label: 'Voice', type: 'select', options: ['Alex', 'Samantha', 'Daniel', 'Victoria'], defaultValue: 'Samantha' }
            ]
          }
        ]
      }
    ]
  }
];
