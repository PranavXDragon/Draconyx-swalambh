'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import { useAppStore } from '@/store/app-store';

export function DevModePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const setUser = useAppStore((state) => state.setUser);

  const loginAsDev = (role: 'supplier' | 'business' | 'client' | 'delivery') => {
    // Create a dev user object with role-specific properties
    const devUser: any = {
      id: `dev-${role}-001`,
      name: `Dev ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      email: `dev@${role}.com`,
      role: role,
    };

    // Add role-specific properties
    if (role === 'supplier') {
      devUser.company = 'Dev Supplier Co.';
      devUser.mobile = '+91 98765 43210';
      devUser.category = 'electronics';
      devUser.location = 'Mumbai, Maharashtra';
    } else if (role === 'business') {
      devUser.company = 'Dev Business Ltd.';
      devUser.industryType = 'Manufacturing';
      devUser.numberOfPlants = '3';
      devUser.location = 'Pune, Maharashtra';
    } else if (role === 'client') {
      devUser.company = 'Dev Client Inc.';
      devUser.designation = 'Manager';
      devUser.workingType = 'factory';
      devUser.industryType = 'Automotive';
    } else if (role === 'delivery') {
      devUser.mobile = '+91 98765 43210';
      devUser.vehicleNumber = 'MH01AB1234';
      devUser.age = 28;
      devUser.govtId = { type: 'aadhar', number: '1234-5678-9012' };
    }

    // Set user in store
    setUser(devUser);
    
    // Set cookie for persistence
    document.cookie = `user=${JSON.stringify(devUser)}; path=/`;
    
    // Force page reload to dashboard
    window.location.href = `/${role}/dashboard`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="bg-slate-900 text-white border-2 border-amber-500 shadow-2xl">
        <div className="p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full text-amber-400 font-bold mb-2"
          >
            <div className="flex items-center">
              <span className="text-xs bg-amber-500 text-slate-900 px-2 py-1 rounded font-bold mr-2">
                DEV MODE
              </span>
              <span className="text-sm">Quick Access (Bypass Login)</span>
            </div>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>

          {isOpen && (
            <div className="space-y-2 mt-4">
              <Button
                onClick={() => loginAsDev('supplier')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white justify-start"
                size="sm"
              >
                <User className="h-4 w-4 mr-2" />
                Open Supplier Dashboard
              </Button>

              <Button
                onClick={() => loginAsDev('business')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start"
                size="sm"
              >
                <User className="h-4 w-4 mr-2" />
                Open Business Dashboard
              </Button>

              <Button
                onClick={() => loginAsDev('client')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start"
                size="sm"
              >
                <User className="h-4 w-4 mr-2" />
                Open Client Dashboard
              </Button>

              <Button
                onClick={() => loginAsDev('delivery')}
                className="w-full bg-green-600 hover:bg-green-700 text-white justify-start"
                size="sm"
              >
                <User className="h-4 w-4 mr-2" />
                Open Delivery Dashboard
              </Button>

              <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700">
                ⚠️ For development/testing only
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
