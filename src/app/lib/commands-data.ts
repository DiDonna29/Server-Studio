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
    name: 'Minecraft Server',
    categories: [
      {
        name: 'Player Admin',
        icon: 'User',
        commands: [
          { id: 'give', label: '/give', description: 'Gives an item to a player.', syntax: '/give {player} {item} {amount}', parameters: [{ name: 'player', label: 'Player', type: 'text', defaultValue: '@p' }, { name: 'item', label: 'Item ID', type: 'text', defaultValue: 'minecraft:diamond' }, { name: 'amount', label: 'Count', type: 'number', defaultValue: '64' }] },
          { id: 'tp', label: '/tp', description: 'Teleport entities.', syntax: '/tp {player} {target}', parameters: [{ name: 'player', label: 'Who', type: 'text', defaultValue: '@s' }, { name: 'target', label: 'Where', type: 'text', placeholder: 'X Y Z' }] },
          { id: 'gamemode', label: '/gamemode', description: 'Sets game mode.', syntax: '/gamemode {mode} {player}', parameters: [{ name: 'mode', label: 'Mode', type: 'select', options: ['creative', 'survival', 'adventure', 'spectator'], defaultValue: 'creative' }, { name: 'player', label: 'Player', type: 'text', defaultValue: '@s' }] },
          { id: 'kick', label: '/kick', description: 'Kicks a player.', syntax: '/kick {player} {reason}', parameters: [{ name: 'player', label: 'Player', type: 'text' }, { name: 'reason', label: 'Reason', type: 'text', defaultValue: 'Violation of rules' }] },
          { id: 'ban', label: '/ban', description: 'Bans a player.', syntax: '/ban {player} {reason}', parameters: [{ name: 'player', label: 'Player', type: 'text' }, { name: 'reason', label: 'Reason', type: 'text', defaultValue: 'Banned by admin' }] },
          { id: 'unban', label: '/pardon', description: 'Unbans a player.', syntax: '/pardon {player}', parameters: [{ name: 'player', label: 'Player', type: 'text' }] },
          { id: 'op', label: '/op', description: 'Makes player an operator.', syntax: '/op {player}', parameters: [{ name: 'player', label: 'Player', type: 'text' }] },
          { id: 'deop', label: '/deop', description: 'Removes operator status.', syntax: '/deop {player}', parameters: [{ name: 'player', label: 'Player', type: 'text' }] }
        ]
      },
      {
        name: 'World & Mechanics',
        icon: 'Globe',
        commands: [
          { id: 'time', label: '/time set', description: 'Sets world time.', syntax: '/time set {value}', parameters: [{ name: 'value', label: 'Time', type: 'select', options: ['day', 'night', 'midnight', 'noon'], defaultValue: 'day' }] },
          { id: 'weather', label: '/weather', description: 'Sets weather.', syntax: '/weather {type} {duration}', parameters: [{ name: 'type', label: 'Type', type: 'select', options: ['clear', 'rain', 'thunder'], defaultValue: 'clear' }, { name: 'duration', label: 'Duration', type: 'number', defaultValue: '300' }] },
          { id: 'difficulty', label: '/difficulty', description: 'Sets difficulty.', syntax: '/difficulty {level}', parameters: [{ name: 'level', label: 'Level', type: 'select', options: ['peaceful', 'easy', 'normal', 'hard'], defaultValue: 'normal' }] },
          { id: 'gamerule', label: '/gamerule', description: 'Modifies game rules.', syntax: '/gamerule {rule} {value}', parameters: [{ name: 'rule', label: 'Rule', type: 'select', options: ['keepInventory', 'doDaylightCycle', 'mobGriefing', 'doFireTick'], defaultValue: 'keepInventory' }, { name: 'value', label: 'Value', type: 'select', options: ['true', 'false'], defaultValue: 'true' }] },
          { id: 'enchant', label: '/enchant', description: 'Enchants item in hand.', syntax: '/enchant {player} {enchantment} {level}', parameters: [{ name: 'player', label: 'Player', type: 'text', defaultValue: '@s' }, { name: 'enchantment', label: 'Enchant', type: 'text', defaultValue: 'minecraft:sharpness' }, { name: 'level', label: 'Level', type: 'number', defaultValue: '5' }] },
          { id: 'summon', label: '/summon', description: 'Summons an entity.', syntax: '/summon {entity} ~ ~ ~', parameters: [{ name: 'entity', label: 'Entity ID', type: 'text', defaultValue: 'minecraft:zombie' }] },
          { id: 'kill', label: '/kill', description: 'Kills entities.', syntax: '/kill {target}', parameters: [{ name: 'target', label: 'Target', type: 'text', defaultValue: '@e[type=!player]' }] },
          { id: 'xp', label: '/xp add', description: 'Adds experience.', syntax: '/xp add {player} {amount} {type}', parameters: [{ name: 'player', label: 'Player', type: 'text', defaultValue: '@s' }, { name: 'amount', label: 'Amount', type: 'number', defaultValue: '100' }, { name: 'type', label: 'Type', type: 'select', options: ['points', 'levels'], defaultValue: 'levels' }] }
        ]
      },
      {
        name: 'Server Management',
        icon: 'Settings',
        commands: [
          { id: 'save-all', label: '/save-all', description: 'Saves the world.', syntax: '/save-all', parameters: [] },
          { id: 'stop', label: '/stop', description: 'Stops the server.', syntax: '/stop', parameters: [] },
          { id: 'whitelist', label: '/whitelist', description: 'Whitelist control.', syntax: '/whitelist {action} {player}', parameters: [{ name: 'action', label: 'Action', type: 'select', options: ['add', 'remove', 'on', 'off', 'list'], defaultValue: 'add' }, { name: 'player', label: 'Player', type: 'text' }] },
          { id: 'seed', label: '/seed', description: 'Displays world seed.', syntax: '/seed', parameters: [] },
          { id: 'locate', label: '/locate', description: 'Locates structure.', syntax: '/locate structure {type}', parameters: [{ name: 'type', label: 'Structure', type: 'text', defaultValue: 'minecraft:village' }] }
        ]
      }
    ]
  },
  {
    id: 'zomboid',
    name: 'Project Zomboid',
    categories: [
      {
        name: 'Administration',
        icon: 'Shield',
        commands: [
          { id: 'grantadmin', label: '/grantadmin', description: 'Grants admin powers.', syntax: '/grantadmin "{user}"', parameters: [{ name: 'user', label: 'Username', type: 'text' }] },
          { id: 'removeadmin', label: '/removeadmin', description: 'Removes admin powers.', syntax: '/removeadmin "{user}"', parameters: [{ name: 'user', label: 'Username', type: 'text' }] },
          { id: 'setaccesslevel', label: '/setaccesslevel', description: 'Sets permission level.', syntax: '/setaccesslevel "{user}" "{level}"', parameters: [{ name: 'user', label: 'User', type: 'text' }, { name: 'level', label: 'Level', type: 'select', options: ['admin', 'moderator', 'overseer', 'gm', 'none'], defaultValue: 'admin' }] },
          { id: 'banuser', label: '/banuser', description: 'Bans a user.', syntax: '/banuser "{user}" -r "{reason}"', parameters: [{ name: 'user', label: 'User', type: 'text' }, { name: 'reason', label: 'Reason', type: 'text', defaultValue: 'Rules violation' }] },
          { id: 'unbanuser', label: '/unbanuser', description: 'Unbans a user.', syntax: '/unbanuser "{user}"', parameters: [{ name: 'user', label: 'User', type: 'text' }] },
          { id: 'kickuser', label: '/kickuser', description: 'Kicks a user.', syntax: '/kickuser "{user}" -r "{reason}"', parameters: [{ name: 'user', label: 'User', type: 'text' }, { name: 'reason', label: 'Reason', type: 'text', defaultValue: 'Relog required' }] },
          { id: 'servermsg', label: '/servermsg', description: 'Global message.', syntax: '/servermsg "{msg}"', parameters: [{ name: 'msg', label: 'Message', type: 'text' }] }
        ]
      },
      {
        name: 'Inventory & World',
        icon: 'Box',
        commands: [
          { id: 'additem', label: '/additem', description: 'Adds item to player.', syntax: '/additem "{user}" "{item}" {count}', parameters: [{ name: 'user', label: 'User', type: 'text' }, { name: 'item', label: 'Item ID', type: 'text', defaultValue: 'Base.Axe' }, { name: 'count', label: 'Count', type: 'number', defaultValue: '1' }] },
          { id: 'addvehicle', label: '/addvehicle', description: 'Spawns a vehicle.', syntax: '/addvehicle "{vehicle}" "{user}"', parameters: [{ name: 'vehicle', label: 'Vehicle ID', type: 'text', defaultValue: 'Base.OffRoad' }, { name: 'user', label: 'Near User', type: 'text' }] },
          { id: 'teleport', label: '/teleport', description: 'Teleport to player.', syntax: '/teleport "{user}" "{target}"', parameters: [{ name: 'user', label: 'Who', type: 'text' }, { name: 'target', label: 'To Whom', type: 'text' }] },
          { id: 'godmode', label: '/godmode', description: 'Toggle invulnerability.', syntax: '/godmode "{user}" {toggle}', parameters: [{ name: 'user', label: 'User', type: 'text' }, { name: 'toggle', label: 'State', type: 'select', options: ['-true', '-false'], defaultValue: '-true' }] },
          { id: 'invisible', label: '/invisible', description: 'Toggle invisibility.', syntax: '/invisible "{user}" {toggle}', parameters: [{ name: 'user', label: 'User', type: 'text' }, { name: 'toggle', label: 'State', type: 'select', options: ['-true', '-false'], defaultValue: '-true' }] },
          { id: 'addxp', label: '/addxp', description: 'Grant skill XP.', syntax: '/addxp "{user}" {skill}={amount}', parameters: [{ name: 'user', label: 'User', type: 'text' }, { name: 'skill', label: 'Skill', type: 'text', defaultValue: 'Carpentry' }, { name: 'amount', label: 'XP', type: 'number', defaultValue: '1000' }] },
          { id: 'createhorde', label: '/createhorde', description: 'Spawns zombie horde.', syntax: '/createhorde {count} "{user}"', parameters: [{ name: 'count', label: 'Count', type: 'number', defaultValue: '50' }, { name: 'user', label: 'Near User', type: 'text' }] }
        ]
      },
      {
        name: 'Server Utility',
        icon: 'Activity',
        commands: [
          { id: 'save', label: '/save', description: 'Saves the server.', syntax: '/save', parameters: [] },
          { id: 'quit', label: '/quit', description: 'Stops the server.', syntax: '/quit', parameters: [] },
          { id: 'reloadoptions', label: '/reloadoptions', description: 'Reloads config.', syntax: '/reloadoptions', parameters: [] },
          { id: 'showoptions', label: '/showoptions', description: 'Shows server settings.', syntax: '/showoptions', parameters: [] },
          { id: 'chopper', label: '/chopper', description: 'Spawns helicopter event.', syntax: '/chopper', parameters: [] }
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
          { id: 'update', label: 'Apt Update', description: 'Update packages.', syntax: 'sudo apt update && sudo apt upgrade -y', parameters: [] },
          { id: 'reboot', label: 'Reboot', description: 'Restarts system.', syntax: 'sudo reboot now', parameters: [] },
          { id: 'shutdown', label: 'Shutdown', description: 'Powers off.', syntax: 'sudo shutdown -h now', parameters: [] },
          { id: 'systemctl', label: 'Systemctl', description: 'Manage services.', syntax: 'sudo systemctl {action} {service}', parameters: [{ name: 'action', label: 'Action', type: 'select', options: ['start', 'stop', 'restart', 'status', 'enable'], defaultValue: 'status' }, { name: 'service', label: 'Service', type: 'text', defaultValue: 'nginx' }] },
          { id: 'journalctl', label: 'Journalctl', description: 'View logs.', syntax: 'journalctl -u {service} -f', parameters: [{ name: 'service', label: 'Service', type: 'text', defaultValue: 'docker' }] },
          { id: 'chmod', label: 'Chmod', description: 'Permissions.', syntax: 'chmod {mode} {path}', parameters: [{ name: 'mode', label: 'Mode', type: 'text', defaultValue: '755' }, { name: 'path', label: 'Path', type: 'text' }] },
          { id: 'chown', label: 'Chown', description: 'Ownership.', syntax: 'sudo chown {user}:{group} {path}', parameters: [{ name: 'user', label: 'User', type: 'text', defaultValue: 'www-data' }, { name: 'group', label: 'Group', type: 'text', defaultValue: 'www-data' }, { name: 'path', label: 'Path', type: 'text' }] }
        ]
      },
      {
        name: 'Networking',
        icon: 'Globe',
        commands: [
          { id: 'ip', label: 'IP Address', description: 'Network info.', syntax: 'ip addr show', parameters: [] },
          { id: 'ping', label: 'Ping', description: 'Test latency.', syntax: 'ping -c {count} {host}', parameters: [{ name: 'count', label: 'Packets', type: 'number', defaultValue: '4' }, { name: 'host', label: 'Host', type: 'text', defaultValue: 'google.com' }] },
          { id: 'curl', label: 'Curl', description: 'Fetch URL.', syntax: 'curl -I {url}', parameters: [{ name: 'url', label: 'URL', type: 'text', defaultValue: 'https://google.com' }] },
          { id: 'netstat', label: 'Netstat', description: 'Active ports.', syntax: 'sudo netstat -tulpn', parameters: [] },
          { id: 'ufw', label: 'Firewall', description: 'Manage UFW.', syntax: 'sudo ufw {action} {port}', parameters: [{ name: 'action', label: 'Action', type: 'select', options: ['allow', 'deny', 'status'], defaultValue: 'status' }, { name: 'port', label: 'Port', type: 'text', defaultValue: '80' }] }
        ]
      },
      {
        name: 'Monitoring',
        icon: 'Cpu',
        commands: [
          { id: 'top', label: 'Top', description: 'Process monitor.', syntax: 'top', parameters: [] },
          { id: 'df', label: 'Disk Free', description: 'Storage info.', syntax: 'df -h', parameters: [] },
          { id: 'du', label: 'Disk Usage', description: 'Folder size.', syntax: 'du -sh {path}', parameters: [{ name: 'path', label: 'Path', type: 'text', defaultValue: './' }] },
          { id: 'free', label: 'RAM Free', description: 'Memory info.', syntax: 'free -h', parameters: [] },
          { id: 'docker-ps', label: 'Docker Status', description: 'List containers.', syntax: 'docker ps -a', parameters: [] },
          { id: 'docker-logs', label: 'Docker Logs', description: 'View container logs.', syntax: 'docker logs -f {id}', parameters: [{ name: 'id', label: 'Container ID', type: 'text' }] }
        ]
      }
    ]
  },
  {
    id: 'windows',
    name: 'Windows CMD/PS',
    categories: [
      {
        name: 'General Tools',
        icon: 'Terminal',
        commands: [
          { id: 'ipconfig', label: 'IPConfig', description: 'Network settings.', syntax: 'ipconfig /all', parameters: [] },
          { id: 'flushdns', label: 'Flush DNS', description: 'Clear DNS cache.', syntax: 'ipconfig /flushdns', parameters: [] },
          { id: 'systeminfo', label: 'System Info', description: 'Hardware stats.', syntax: 'systeminfo', parameters: [] },
          { id: 'tasklist', label: 'Task List', description: 'Show processes.', syntax: 'tasklist', parameters: [] },
          { id: 'taskkill', label: 'Task Kill', description: 'Kill process.', syntax: 'taskkill /IM {proc} /F', parameters: [{ name: 'proc', label: 'Name', type: 'text', defaultValue: 'notepad.exe' }] },
          { id: 'shutdown', label: 'Shutdown', description: 'Turns off PC.', syntax: 'shutdown /s /t {time}', parameters: [{ name: 'time', label: 'Seconds', type: 'number', defaultValue: '0' }] },
          { id: 'restart', label: 'Restart', description: 'Restarts PC.', syntax: 'shutdown /r /t {time}', parameters: [{ name: 'time', label: 'Seconds', type: 'number', defaultValue: '0' }] }
        ]
      },
      {
        name: 'Disk & Health',
        icon: 'HardDrive',
        commands: [
          { id: 'chkdsk', label: 'Check Disk', description: 'Fix disk errors.', syntax: 'chkdsk {drive}: /f', parameters: [{ name: 'drive', label: 'Drive', type: 'text', defaultValue: 'C' }] },
          { id: 'sfc', label: 'SFC Scan', description: 'Repair system files.', syntax: 'sfc /scannow', parameters: [] },
          { id: 'format', label: 'Format', description: 'Format drive.', syntax: 'format {drive}: /Q', parameters: [{ name: 'drive', label: 'Drive', type: 'text' }] },
          { id: 'driverquery', label: 'Drivers', description: 'List drivers.', syntax: 'driverquery', parameters: [] },
          { id: 'gpupdate', label: 'Group Policy', description: 'Update policies.', syntax: 'gpupdate /force', parameters: [] }
        ]
      },
      {
        name: 'Network Pro',
        icon: 'Globe',
        commands: [
          { id: 'ping', label: 'Ping', description: 'Test connection.', syntax: 'ping {host}', parameters: [{ name: 'host', label: 'Host', type: 'text', defaultValue: 'google.com' }] },
          { id: 'tracert', label: 'Traceroute', description: 'Trace hops.', syntax: 'tracert {host}', parameters: [{ name: 'host', label: 'Host', type: 'text', defaultValue: 'google.com' }] },
          { id: 'netstat', label: 'Netstat', description: 'Network stats.', syntax: 'netstat -ano', parameters: [] },
          { id: 'netsh-wlan', label: 'WiFi Export', description: 'Export WiFi keys.', syntax: 'netsh wlan export profile folder=. key=clear', parameters: [] },
          { id: 'net-use', label: 'Map Drive', description: 'Map network drive.', syntax: 'net use {letter}: \\\\{server}\\{share}', parameters: [{ name: 'letter', label: 'Letter', type: 'text', defaultValue: 'Z' }, { name: 'server', label: 'Server IP', type: 'text' }, { name: 'share', label: 'Folder', type: 'text' }] }
        ]
      }
    ]
  },
  {
    id: 'macos',
    name: 'macOS / Darwin',
    categories: [
      {
        name: 'System Utilities',
        icon: 'Terminal',
        commands: [
          { id: 'purge', label: 'Purge RAM', description: 'Clear disk cache.', syntax: 'sudo purge', parameters: [] },
          { id: 'caffeinate', label: 'Caffeinate', description: 'Prevent sleep.', syntax: 'caffeinate -i', parameters: [] },
          { id: 'brew-update', label: 'Brew Update', description: 'Homebrew update.', syntax: 'brew update && brew upgrade', parameters: [] },
          { id: 'softwareupdate', label: 'Update OS', description: 'Check updates.', syntax: 'softwareupdate -l', parameters: [] },
          { id: 'diskutil-list', label: 'Disks', description: 'List all disks.', syntax: 'diskutil list', parameters: [] },
          { id: 'say', label: 'Say', description: 'TTS command.', syntax: 'say "{text}"', parameters: [{ name: 'text', label: 'Text', type: 'text', defaultValue: 'Hello world' }] },
          { id: 'open', label: 'Open', description: 'Open app or file.', syntax: 'open -a "{app}"', parameters: [{ name: 'app', label: 'App Name', type: 'text', defaultValue: 'Safari' }] }
        ]
      },
      {
        name: 'Network & Security',
        icon: 'Shield',
        commands: [
          { id: 'airport', label: 'WiFi Scan', description: 'Scan WiFi networks.', syntax: '/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -s', parameters: [] },
          { id: 'networksetup', label: 'Net Setup', description: 'Network info.', syntax: 'networksetup -listallnetworkservices', parameters: [] },
          { id: 'dscacheutil', label: 'Flush DNS', description: 'Clear DNS.', syntax: 'sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder', parameters: [] },
          { id: 'top', label: 'Top', description: 'Resource usage.', syntax: 'top -o cpu', parameters: [] },
          { id: 'tmutil', label: 'Time Machine', description: 'Start backup.', syntax: 'tmutil startbackup', parameters: [] }
        ]
      }
    ]
  }
];
