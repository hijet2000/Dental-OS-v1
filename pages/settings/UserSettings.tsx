import React, { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Toggle } from '../../components/common/Toggle';
import { User, Role } from '../../types';
import { generateId } from '../../utils/helpers';

const UserSettings = () => {
  const { settings, setSettings } = useSettings();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = () => {
    const newUser: User = {
      id: generateId(),
      name: 'New User',
      roles: [Role.RECEPTIONIST],
      locationIds: settings.locations[0] ? [settings.locations[0].id] : [],
      pin: Math.floor(1000 + Math.random() * 9000).toString(),
      twoFactorEnabled: false
    };
    setSettings(prev => ({...prev, users: [...prev.users, newUser]}), 'Added User', 'Users');
    setEditingUser(newUser);
  };
  
  const handleUpdateUser = (userId: string, field: keyof User, value: any) => {
    setSettings(prev => ({
        ...prev,
        users: prev.users.map(u => u.id === userId ? { ...u, [field]: value } : u)
    }), 'Updated User', 'Users');
    if (editingUser?.id === userId) {
        setEditingUser(prev => prev ? {...prev, [field]: value} : null);
    }
  };

  const handleRoleToggle = (userId: string, role: Role, checked: boolean) => {
    const user = settings.users.find(u => u.id === userId);
    if (!user) return;
    const newRoles = checked 
      ? [...user.roles, role]
      : user.roles.filter(r => r !== role);
    handleUpdateUser(userId, 'roles', newRoles);
  };
  
  const handleLocationToggle = (userId: string, locationId: string, checked: boolean) => {
    const user = settings.users.find(u => u.id === userId);
    if (!user) return;
    const newLocationIds = checked
      ? [...user.locationIds, locationId]
      : user.locationIds.filter(id => id !== locationId);
    handleUpdateUser(userId, 'locationIds', newLocationIds);
  };
  
  const handleRemoveUser = (userId: string) => {
    setSettings(prev => ({...prev, users: prev.users.filter(u => u.id !== userId)}), 'Removed User', 'Users');
    if (editingUser?.id === userId) setEditingUser(null);
  }

  return (
    <Card title="Users & Access">
      <div className="space-y-4">
        <Button onClick={handleAddUser} variant="primary">Add New Staff User</Button>
        <div className="space-y-2">
            {settings.users.map(user => (
                <div key={user.id} className="flex justify-between items-center p-2 border rounded dark:border-gray-600">
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.roles.join(', ')} @ {settings.locations.filter(l => user.locationIds.includes(l.id)).map(l => l.name).join(', ')}</p>
                    </div>
                    <div>
                        <Button onClick={() => setEditingUser(user)} className="mr-2">Edit</Button>
                        <Button onClick={() => handleRemoveUser(user.id)} variant="danger">Remove</Button>
                    </div>
                </div>
            ))}
        </div>
        
        {editingUser && (
            <div className="mt-6 p-4 border-t dark:border-gray-600 space-y-4">
                <h3 className="text-lg font-semibold">Editing {editingUser.name}</h3>
                 <Input label="Name" value={editingUser.name} onChange={e => handleUpdateUser(editingUser.id, 'name', e.target.value)} />
                 
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Roles</label>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {settings.roles.map(role => (
                            <label key={role} className="flex items-center space-x-2">
                                <input type="checkbox" checked={editingUser.roles.includes(role)} onChange={e => handleRoleToggle(editingUser.id, role, e.target.checked)} className="rounded text-brand-primary focus:ring-brand-primary" />
                                <span>{role}</span>
                            </label>
                        ))}
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Locations</label>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {settings.locations.map(loc => (
                             <label key={loc.id} className="flex items-center space-x-2">
                                <input type="checkbox" checked={editingUser.locationIds.includes(loc.id)} onChange={e => handleLocationToggle(editingUser.id, loc.id, e.target.checked)} className="rounded text-brand-primary focus:ring-brand-primary" />
                                <span>{loc.name}</span>
                            </label>
                        ))}
                    </div>
                 </div>
                 
                 <Input label="PIN" type="text" value={editingUser.pin} onChange={e => handleUpdateUser(editingUser.id, 'pin', e.target.value)} />
                 <Toggle label="2FA Enabled" enabled={editingUser.twoFactorEnabled} onChange={checked => handleUpdateUser(editingUser.id, 'twoFactorEnabled', checked)} />
                 <Button onClick={() => setEditingUser(null)}>Done Editing</Button>
            </div>
        )}
      </div>
    </Card>
  );
};

export default UserSettings;
