import React, { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { generateId } from '../../utils/helpers';
import { Location, Room, Surgery } from '../../types';
import { useTranslations } from '../../hooks/useTranslations';


const LocationSettings = () => {
    const { settings, setSettings } = useSettings();
    const { t } = useTranslations();

    const handleUpdate = <T,>(path: string, value: T) => {
      setSettings(prev => {
        const keys = path.split('.');
        let current: any = { ...prev };
        const newSettings = current;

        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newSettings;
      }, 'Updated Locations', 'Locations');
    };

    const addLocation = () => {
        const newLocation: Location = { id: generateId(), name: 'New Location', isDefault: false, rooms: [] };
        handleUpdate('locations', [...settings.locations, newLocation]);
    };
    
    const addRoom = (locId: string) => {
        const newRoom: Room = { id: generateId(), name: 'New Room', surgeries: [] };
        const locIndex = settings.locations.findIndex(l => l.id === locId);
        if (locIndex === -1) return;
        const newLocations = [...settings.locations];
        newLocations[locIndex].rooms.push(newRoom);
        handleUpdate('locations', newLocations);
    };

    const addSurgery = (locId: string, roomId: string) => {
        const newSurgery: Surgery = { id: generateId(), name: 'New Surgery' };
        const locIndex = settings.locations.findIndex(l => l.id === locId);
        if (locIndex === -1) return;
        const roomIndex = settings.locations[locIndex].rooms.findIndex(r => r.id === roomId);
        if (roomIndex === -1) return;

        const newLocations = [...settings.locations];
        newLocations[locIndex].rooms[roomIndex].surgeries.push(newSurgery);
        handleUpdate('locations', newLocations);
    };

    const remove = (path: string) => {
        const keys = path.split('.');
        setSettings(prev => {
            let current: any = { ...prev };
            const newSettings = current;

            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }

            const finalKey = keys[keys.length - 1];
            const indexToRemove = parseInt(finalKey.match(/\[(\d+)\]/)?.[1] || '-1', 10);
            const arrayKey = finalKey.split('[')[0];

            if (Array.isArray(current[arrayKey]) && indexToRemove !== -1) {
                current[arrayKey] = current[arrayKey].filter((_: any, i: number) => i !== indexToRemove);
            }
            return newSettings;
        }, 'Removed item from Locations', 'Locations');
    };

    return (
        <Card title={`${t('locations')} & ${t('surgeries')}`}>
            <div className="space-y-4">
                {settings.locations.map((loc, locIndex) => (
                    <div key={loc.id} className="p-4 border rounded-md dark:border-gray-600 space-y-3">
                        <div className="flex justify-between items-center">
                            <Input value={loc.name} onChange={e => handleUpdate(`locations.${locIndex}.name`, e.target.value)} className="font-semibold text-lg" />
                            <Button variant="danger" onClick={() => remove(`locations[${locIndex}]`)}>Remove</Button>
                        </div>

                        {loc.rooms.map((room, roomIndex) => (
                             <div key={room.id} className="p-3 border-l-4 dark:border-gray-500 ml-4">
                                <div className="flex justify-between items-center">
                                    <Input value={room.name} onChange={e => handleUpdate(`locations.${locIndex}.rooms.${roomIndex}.name`, e.target.value)} className="font-medium" />
                                    <Button variant="danger" size-sm="true" onClick={() => remove(`locations[${locIndex}].rooms[${roomIndex}]`)}>Remove Room</Button>
                                </div>
                                <div className="ml-4 mt-2 space-y-2">
                                {room.surgeries.map((surgery, surgIndex) => (
                                    <div key={surgery.id} className="flex justify-between items-center">
                                        <Input value={surgery.name} onChange={e => handleUpdate(`locations.${locIndex}.rooms.${roomIndex}.surgeries.${surgIndex}.name`, e.target.value)} />
                                        <Button variant="danger" size-sm="true" onClick={() => remove(`locations[${locIndex}].rooms[${roomIndex}].surgeries[${surgIndex}]`)}>X</Button>
                                    </div>
                                ))}
                                <Button onClick={() => addSurgery(loc.id, room.id)}>+ Add Surgery</Button>
                                </div>
                            </div>
                        ))}
                         <Button onClick={() => addRoom(loc.id)}>+ Add Room</Button>
                    </div>
                ))}
                <Button onClick={addLocation} variant="primary">Add New Location</Button>
            </div>
        </Card>
    );
};
export default LocationSettings;