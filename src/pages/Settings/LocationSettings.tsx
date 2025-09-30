import React, { useState } from 'react';
import { useAppSettings } from '../../contexts/AppSettingsContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Location, Room, Surgery } from '../../types';
import { generateId } from '../../utils/helpers';
import { useTranslations } from '../../hooks/useTranslations';

const LocationSettings = () => {
    const { settings, updateSettings } = useAppSettings();
    const { t } = useTranslations();
    const [locations, setLocations] = useState<Location[]>(settings.locations);

    const handleUpdate = <T,>(path: (string|number)[], value: T) => {
      setLocations(prevLocations => {
        const newLocations = JSON.parse(JSON.stringify(prevLocations));
        let current: any = newLocations;
        for (let i = 0; i < path.length - 1; i++) {
          current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        return newLocations;
      });
    };

    const handleApply = () => {
        updateSettings(prev => ({...prev, locations}), "Updated Locations", "Locations");
        alert("Locations saved!");
    };

    const addLocation = () => setLocations(prev => [...prev, { id: generateId(), name: 'New Location', isDefault: false, rooms: [] }]);
    const addRoom = (locIndex: number) => handleUpdate([locIndex, 'rooms'], [...locations[locIndex].rooms, { id: generateId(), name: 'New Room', surgeries: [] }]);
    const addSurgery = (locIndex: number, roomIndex: number) => handleUpdate([locIndex, 'rooms', roomIndex, 'surgeries'], [...locations[locIndex].rooms[roomIndex].surgeries, { id: generateId(), name: 'New Surgery' }]);
    
    const removeLocation = (locIndex: number) => setLocations(prev => prev.filter((_, i) => i !== locIndex));
    const removeRoom = (locIndex: number, roomIndex: number) => handleUpdate([locIndex, 'rooms'], locations[locIndex].rooms.filter((_, i) => i !== roomIndex));
    const removeSurgery = (locIndex: number, roomIndex: number, surgIndex: number) => handleUpdate([locIndex, 'rooms', roomIndex, 'surgeries'], locations[locIndex].rooms[roomIndex].surgeries.filter((_, i) => i !== surgIndex));

    return (
        <Card title={`${t('locations')} & ${t('surgeries')}`} footer={<div className="flex justify-end"><Button onClick={handleApply}>Apply Changes</Button></div>}>
            <div className="space-y-4">
                {locations.map((loc, locIndex) => (
                    <div key={loc.id} className="p-4 border rounded-md dark:border-gray-600 space-y-3">
                        <div className="flex justify-between items-center gap-4">
                            <Input value={loc.name} onChange={e => handleUpdate([locIndex, 'name'], e.target.value)} className="font-semibold text-lg" />
                            <Button variant="danger" onClick={() => removeLocation(locIndex)}>Remove</Button>
                        </div>

                        {loc.rooms.map((room, roomIndex) => (
                             <div key={room.id} className="p-3 border-l-4 dark:border-gray-500 ml-4 space-y-2">
                                <div className="flex justify-between items-center gap-4">
                                    <Input value={room.name} onChange={e => handleUpdate([locIndex, 'rooms', roomIndex, 'name'], e.target.value)} className="font-medium" />
                                    <Button variant="ghost" onClick={() => removeRoom(locIndex, roomIndex)}>Remove Room</Button>
                                </div>
                                <div className="ml-4 mt-2 space-y-2">
                                {room.surgeries.map((surgery, surgIndex) => (
                                    <div key={surgery.id} className="flex justify-between items-center gap-2">
                                        <Input value={surgery.name} onChange={e => handleUpdate([locIndex, 'rooms', roomIndex, 'surgeries', surgIndex, 'name'], e.target.value)} />
                                        <Button variant="ghost" className="text-red-500" onClick={() => removeSurgery(locIndex, roomIndex, surgIndex)}>X</Button>
                                    </div>
                                ))}
                                <Button onClick={() => addSurgery(locIndex, roomIndex)} size="sm" variant="ghost">+ Add {t('surgeries')}</Button>
                                </div>
                            </div>
                        ))}
                         <Button onClick={() => addRoom(locIndex)} size="sm" variant="secondary">+ Add Room</Button>
                    </div>
                ))}
                <Button onClick={addLocation} variant="primary">Add New Location</Button>
            </div>
        </Card>
    );
};
export default LocationSettings;
