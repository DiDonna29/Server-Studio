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
  id: string;
  name: string;
  categories: Category[];
};

export const COMMANDS_BY_OS: OSData[] = [
  {
    id: 'minecraft',
    name: 'Minecraft',
    categories: [
      {
        name: 'Player Management',
        icon: 'User',
        commands: [
          {
            id: 'give',
            label: '/give',
            description: 'Give an item to a player.',
            syntax: '/give {player} {item} {amount}',
            parameters: [
              { name: 'player', label: 'Player Name', type: 'text', placeholder: '@p', defaultValue: '@p' },
              { name: 'item', label: 'Item ID', type: 'text', placeholder: 'minecraft:diamond', defaultValue: 'minecraft:diamond' },
              { name: 'amount', label: 'Amount', type: 'number', defaultValue: '64' }
            ]
          },
          {
            id: 'tp',
            label: '/tp',
            description: 'Teleport players or entities.',
            syntax: '/tp {player} {target}',
            parameters: [
              { name: 'player', label: 'Player', type: 'text', placeholder: 'PlayerName' },
              { name: 'target', label: 'Target / Coordinates', type: 'text', placeholder: 'X Y Z or PlayerName' }
            ]
          },
          {
            id: 'gamemode',
            label: '/gamemode',
            description: 'Sets a player\'s game mode.',
            syntax: '/gamemode {mode} {player}',
            parameters: [
              { name: 'mode', label: 'Mode', type: 'select', options: ['creative', 'survival', 'adventure', 'spectator'], defaultValue: 'creative' },
              { name: 'player', label: 'Player', type: 'text', placeholder: '@s', defaultValue: '@s' }
            ]
          }
        ]
      },
      {
        name: 'World Control',
        icon: 'Globe',
        commands: [
          {
            id: 'weather',
            label: '/weather',
            description: 'Sets the weather.',
            syntax: '/weather {type} {duration}',
            parameters: [
              { name: 'type', label: 'Weather Type', type: 'select', options: ['clear', 'rain', 'thunder'], defaultValue: 'clear' },
              { name: 'duration', label: 'Duration (seconds)', type: 'number', defaultValue: '1000' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'zomboid',
    name: 'Project Zomboid',
    categories: [
      {
        name: 'Admin Tools',
        icon: 'ShieldCheck',
        commands: [
          {
            id: 'grantadmin',
            label: '/grantadmin',
            description: 'Give admin powers to a user.',
            syntax: '/grantadmin "{username}"',
            parameters: [
              { name: 'username', label: 'Username', type: 'text', placeholder: 'SurvivorName' }
            ]
          },
          {
            id: 'additem',
            label: '/additem',
            description: 'Add an item to a player\'s inventory.',
            syntax: '/additem "{username}" "{item}" {count}',
            parameters: [
              { name: 'username', label: 'Username', type: 'text' },
              { name: 'item', label: 'Item Module.ID', type: 'text', placeholder: 'Base.Axe', defaultValue: 'Base.Axe' },
              { name: 'count', label: 'Amount', type: 'number', defaultValue: '1' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'linux',
    name: 'Linux Terminal',
    categories: [
      {
        name: 'System Control',
        icon: 'Terminal',
        commands: [
          {
            id: 'update',
            label: 'System Update',
            description: 'Update package lists and upgrade system.',
            syntax: 'sudo apt update && sudo apt upgrade -y',
            parameters: []
          },
          {
            id: 'reboot',
            label: 'Reboot',
            description: 'Restart the system immediately.',
            syntax: 'sudo reboot now',
            parameters: []
          },
          {
            id: 'permissions',
            label: 'Chmod',
            description: 'Change file/directory permissions.',
            syntax: 'chmod {mode} {path}',
            parameters: [
              { name: 'mode', label: 'Mode', type: 'text', placeholder: '755', defaultValue: '755' },
              { name: 'path', label: 'Target Path', type: 'text', placeholder: '/var/www/html' }
            ]
          }
        ]
      },
      {
        name: 'Networking',
        icon: 'Globe',
        commands: [
          {
            id: 'ip',
            label: 'IP Info',
            description: 'Show network interfaces and IP addresses.',
            syntax: 'ip addr show',
            parameters: []
          },
          {
            id: 'netstat',
            label: 'Netstat',
            description: 'List active network connections.',
            syntax: 'netstat -tulpn',
            parameters: []
          }
        ]
      }
    ]
  },
  {
    id: 'windows',
    name: 'Windows CMD/PS',
    categories: [
      {
        name: 'Process Management',
        icon: 'Cpu',
        commands: [
          {
            id: 'tasklist',
            label: 'Task List',
            description: 'Display all running tasks.',
            syntax: 'tasklist',
            parameters: []
          },
          {
            id: 'taskkill',
            label: 'Task Kill',
            description: 'Stop a running process by name.',
            syntax: 'taskkill /IM "{process}" /F',
            parameters: [
              { name: 'process', label: 'Process Name', type: 'text', placeholder: 'notepad.exe', defaultValue: 'notepad.exe' }
            ]
          }
        ]
      },
      {
        name: 'Disk & Files',
        icon: 'Box',
        commands: [
          {
            id: 'chkdsk',
            label: 'Check Disk',
            description: 'Check for disk errors.',
            syntax: 'chkdsk {drive}: /f',
            parameters: [
              { name: 'drive', label: 'Drive Letter', type: 'text', placeholder: 'C', defaultValue: 'C' }
            ]
          },
          {
            id: 'flushdns',
            label: 'Flush DNS',
            description: 'Clear the DNS resolver cache.',
            syntax: 'ipconfig /flushdns',
            parameters: []
          }
        ]
      }
    ]
  },
  {
    id: 'macos',
    name: 'macOS / Darwin',
    categories: [
      {
        name: 'Utilities',
        icon: 'Terminal',
        commands: [
          {
            id: 'purge',
            label: 'Purge RAM',
            description: 'Clear system disk cache and memory.',
            syntax: 'sudo purge',
            parameters: []
          },
          {
            id: 'pmset',
            label: 'Power Management',
            description: 'Force Mac to stay awake.',
            syntax: 'caffeinate -i',
            parameters: []
          }
        ]
      }
    ]
  }
];
